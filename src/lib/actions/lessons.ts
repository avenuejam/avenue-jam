"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requirePortalSession } from "@/lib/auth";

const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25MB per lesson file

const schema = z.object({
  unit: z.enum(["CIVIC_EDUCATION", "HUMAN_RIGHTS_EDUCATION", "LEGAL_RIGHTS_LITERACY"]),
  title: z.string().trim().min(2, "Please enter a title."),
  slug: z
    .string()
    .trim()
    .min(2, "Please enter a slug.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  description: z.string().trim().min(10, "Please enter a description (at least 10 characters)."),
  sortOrder: z.string().trim().optional(),
});

export type LessonFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function createLesson(
  _prevState: LessonFormState,
  formData: FormData,
): Promise<LessonFormState> {
  await requirePortalSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: LessonFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Please choose a file to upload." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { status: "error", message: `"${file.name}" exceeds the 25MB upload limit.` };
  }

  const existing = await prisma.lesson.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return {
      status: "error",
      message: "A lesson with that slug already exists.",
      fieldErrors: { slug: "This slug is taken." },
    };
  }

  const blob = await put(`resources/${parsed.data.slug}-${file.name}`, file, { access: "private" });

  await prisma.lesson.create({
    data: {
      unit: parsed.data.unit,
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      sortOrder: parsed.data.sortOrder ? Number(parsed.data.sortOrder) : 0,
      fileUrl: blob.url,
      fileName: file.name,
    },
  });

  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  redirect("/admin/resources");
}

export async function updateLesson(
  id: string,
  _prevState: LessonFormState,
  formData: FormData,
): Promise<LessonFormState> {
  await requirePortalSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: LessonFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const lesson = await prisma.lesson.findUnique({ where: { id } });
  if (!lesson) {
    return { status: "error", message: "Lesson not found." };
  }

  const existingSlug = await prisma.lesson.findUnique({ where: { slug: parsed.data.slug } });
  if (existingSlug && existingSlug.id !== id) {
    return {
      status: "error",
      message: "A lesson with that slug already exists.",
      fieldErrors: { slug: "This slug is taken." },
    };
  }

  const file = formData.get("file");
  let fileUrl = lesson.fileUrl;
  let fileName = lesson.fileName;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return { status: "error", message: `"${file.name}" exceeds the 25MB upload limit.` };
    }
    const blob = await put(`resources/${parsed.data.slug}-${file.name}`, file, { access: "private" });
    await del(lesson.fileUrl).catch(() => {});
    fileUrl = blob.url;
    fileName = file.name;
  }

  await prisma.lesson.update({
    where: { id },
    data: {
      unit: parsed.data.unit,
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      sortOrder: parsed.data.sortOrder ? Number(parsed.data.sortOrder) : 0,
      fileUrl,
      fileName,
    },
  });

  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  redirect("/admin/resources");
}

export async function deleteLesson(id: string) {
  await requirePortalSession();
  const lesson = await prisma.lesson.findUnique({ where: { id } });
  if (lesson) {
    await del(lesson.fileUrl).catch(() => {});
    await prisma.lesson.delete({ where: { id } });
  }
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
}
