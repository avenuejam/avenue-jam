"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserManagementSession, CHAPTER_LEADERSHIP_ROLES } from "@/lib/auth";

const ASSIGNABLE_ROLES = [
  "NATIONAL_ADMINISTRATOR",
  "EXECUTIVE_DIRECTOR",
  "EXECUTIVE_BOARD_MEMBER",
  "COMMUNICATIONS_OFFICER",
  "DIRECTOR_OF_NATIONAL_CENTRAL_OPERATIONS",
  "CHAPTER_PRESIDENT",
  "VICE_PRESIDENT",
  "SECRETARY",
  "TREASURER",
  "PROGRAMS_CURRICULUM_OFFICER",
  "RECRUITMENT_OUTREACH_OFFICER",
] as const;

const schema = z
  .object({
    name: z.string().trim().min(2, "Please enter a name."),
    email: z.string().trim().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    role: z.enum(ASSIGNABLE_ROLES),
    chapterId: z.string().trim().optional(),
  })
  .refine(
    (data) => !CHAPTER_LEADERSHIP_ROLES.includes(data.role) || !!data.chapterId,
    { message: "Please select a chapter for this role.", path: ["chapterId"] },
  );

export type UserFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "password" | "role" | "chapterId", string>>;
};

export async function createStaffUser(
  _prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  await requireUserManagementSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: UserFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as "name" | "email" | "password" | "role" | "chapterId"] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return {
      status: "error",
      message: "A user with that email already exists.",
      fieldErrors: { email: "This email is already registered." },
    };
  }

  const isChapterRole = CHAPTER_LEADERSHIP_ROLES.includes(parsed.data.role);
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      role: parsed.data.role,
      passwordHash,
      chapterId: isChapterRole ? parsed.data.chapterId : null,
    },
  });

  revalidatePath("/admin/users");
  return { status: "success", message: `${parsed.data.name} can now log in at /admin/login.` };
}

export async function setStaffUserActive(id: string, active: boolean) {
  await requireUserManagementSession();
  await prisma.user.update({ where: { id }, data: { active } });
  revalidatePath("/admin/users");
}
