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
  title: z.string().trim().min(2, "Please enter a title."),
  category: z.enum(["News", "Announcement", "Press Release", "Success Story"]),
  excerpt: z.string().trim().min(10, "Please enter an excerpt (at least 10 characters)."),
  body: z.string().trim().min(20, "Please enter body copy (at least 20 characters)."),
  coverImage: z.string().trim().optional(),
  publishedAt: z.string().trim().min(1, "Please choose a publish date."),
});

export type NewsFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

function toNewsData(parsed: z.infer<typeof schema>) {
  return {
    slug: parsed.slug,
    title: parsed.title,
    category: parsed.category,
    excerpt: parsed.excerpt,
    body: parsed.body,
    coverImage: parsed.coverImage || null,
    publishedAt: new Date(parsed.publishedAt),
  };
}

export async function createNewsArticle(
  _prevState: NewsFormState,
  formData: FormData,
): Promise<NewsFormState> {
  await requirePortalSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: NewsFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const existing = await prisma.newsArticle.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return {
      status: "error",
      message: "An article with that slug already exists.",
      fieldErrors: { slug: "This slug is taken." },
    };
  }

  await prisma.newsArticle.create({ data: toNewsData(parsed.data) });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function updateNewsArticle(
  id: string,
  _prevState: NewsFormState,
  formData: FormData,
): Promise<NewsFormState> {
  await requirePortalSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: NewsFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const existing = await prisma.newsArticle.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) {
    return {
      status: "error",
      message: "An article with that slug already exists.",
      fieldErrors: { slug: "This slug is taken." },
    };
  }

  await prisma.newsArticle.update({ where: { id }, data: toNewsData(parsed.data) });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${parsed.data.slug}`);
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNewsArticle(id: string) {
  await requirePortalSession();
  await prisma.newsArticle.delete({ where: { id } });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}
