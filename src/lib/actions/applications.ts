"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";

async function uniqueChapterSlug(base: string) {
  const baseSlug = slugify(base) || "chapter";
  let candidate = baseSlug;
  let suffix = 2;
  while (await prisma.chapter.findUnique({ where: { slug: candidate } })) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export async function approveApplication(id: string, formData: FormData) {
  const session = await requireAdminSession();
  const reviewNote = (formData.get("reviewNote") as string | null)?.trim() || null;

  const application = await prisma.chapterApplication.findUnique({ where: { id } });
  if (!application) return;

  const slug = await uniqueChapterSlug(application.proposedChapterName);

  await prisma.$transaction([
    prisma.chapter.create({
      data: {
        slug,
        name: application.proposedChapterName,
        schoolOrOrg: application.schoolOrOrganization,
        city: application.city,
        state: application.state,
        region: application.state,
        status: "PENDING",
        president: application.applicantName,
        officers: "[]",
        advisor: application.advisorName,
        advisorEmail: application.advisorEmail,
        summary: application.motivation,
      },
    }),
    prisma.chapterApplication.update({
      where: { id },
      data: {
        status: "APPROVED",
        reviewNote,
        reviewedAt: new Date(),
        reviewedById: session.user.id,
      },
    }),
  ]);

  revalidatePath("/admin/applications");
  revalidatePath("/admin/chapters");
  revalidatePath("/chapters");
  revalidatePath("/");
}

export async function declineApplication(id: string, formData: FormData) {
  const session = await requireAdminSession();
  const reviewNote = (formData.get("reviewNote") as string | null)?.trim() || null;

  await prisma.chapterApplication.update({
    where: { id },
    data: {
      status: "DECLINED",
      reviewNote,
      reviewedAt: new Date(),
      reviewedById: session.user.id,
    },
  });

  revalidatePath("/admin/applications");
}
