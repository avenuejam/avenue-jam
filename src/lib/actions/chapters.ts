"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requirePortalSession } from "@/lib/auth";

const schema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "Please enter a slug.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  name: z.string().trim().min(2, "Please enter a chapter name."),
  schoolOrOrg: z.string().trim().min(2, "Please enter a school or organization."),
  city: z.string().trim().min(1, "Please enter a city."),
  state: z.string().trim().min(2, "Please enter a state."),
  region: z.string().trim().min(2, "Please enter a region."),
  status: z.enum(["ACTIVE", "PENDING", "INACTIVE"]),
  president: z.string().trim().min(2, "Please enter a president."),
  officers: z.string().trim().refine((val) => {
    if (val === "") return true;
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, "Officers must be valid JSON, e.g. [{\"name\":\"Jane Doe\",\"role\":\"Vice President\"}]"),
  advisor: z.string().trim().min(2, "Please enter an advisor."),
  advisorEmail: z.string().trim().email("Please enter a valid advisor email address."),
  foundedYear: z.string().trim().optional(),
  summary: z.string().trim().min(10, "Please enter a summary (at least 10 characters)."),
});

export type ChapterFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

function toChapterData(parsed: z.infer<typeof schema>) {
  return {
    slug: parsed.slug,
    name: parsed.name,
    schoolOrOrg: parsed.schoolOrOrg,
    city: parsed.city,
    state: parsed.state,
    region: parsed.region,
    status: parsed.status,
    president: parsed.president,
    officers: parsed.officers || "[]",
    advisor: parsed.advisor,
    advisorEmail: parsed.advisorEmail,
    foundedYear: parsed.foundedYear ? Number(parsed.foundedYear) : null,
    summary: parsed.summary,
  };
}

export async function createChapter(
  _prevState: ChapterFormState,
  formData: FormData,
): Promise<ChapterFormState> {
  await requirePortalSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: ChapterFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const existing = await prisma.chapter.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return {
      status: "error",
      message: "A chapter with that slug already exists.",
      fieldErrors: { slug: "This slug is taken." },
    };
  }

  await prisma.chapter.create({ data: toChapterData(parsed.data) });
  revalidatePath("/admin/chapters");
  revalidatePath("/chapters");
  revalidatePath("/");
  redirect("/admin/chapters");
}

export async function updateChapter(
  id: string,
  _prevState: ChapterFormState,
  formData: FormData,
): Promise<ChapterFormState> {
  await requirePortalSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: ChapterFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const existing = await prisma.chapter.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) {
    return {
      status: "error",
      message: "A chapter with that slug already exists.",
      fieldErrors: { slug: "This slug is taken." },
    };
  }

  await prisma.chapter.update({ where: { id }, data: toChapterData(parsed.data) });
  revalidatePath("/admin/chapters");
  revalidatePath("/chapters");
  revalidatePath(`/chapters/${parsed.data.slug}`);
  revalidatePath("/");
  redirect("/admin/chapters");
}

export async function deleteChapter(id: string) {
  await requirePortalSession();
  await prisma.chapter.delete({ where: { id } });
  revalidatePath("/admin/chapters");
  revalidatePath("/chapters");
  revalidatePath("/");
}
