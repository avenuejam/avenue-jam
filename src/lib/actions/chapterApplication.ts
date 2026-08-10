"use server";

import { z } from "zod";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  applicantName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  schoolOrOrganization: z.string().trim().min(2, "Please enter your school or organization."),
  city: z.string().trim().min(1, "Please enter a city."),
  state: z.string().trim().min(2, "Please enter a state."),
  proposedChapterName: z.string().trim().min(2, "Please enter a proposed chapter name."),
  motivation: z.string().trim().min(20, "Please share a bit more (at least 20 characters)."),
  leadershipExperience: z.string().trim().min(10, "Please describe relevant experience."),
  advisorName: z.string().trim().min(2, "Please enter your advisor's name."),
  advisorEmail: z.string().trim().email("Please enter a valid advisor email address."),
  advisorPhone: z.string().trim().optional(),
});

export type ChapterApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB per file, placeholder local storage limit

export async function submitChapterApplication(
  _prevState: ChapterApplicationState,
  formData: FormData,
): Promise<ChapterApplicationState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ChapterApplicationState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const files = formData
    .getAll("fileUploads")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const storedPaths: string[] = [];

  if (files.length > 0) {
    const applicationId = crypto.randomUUID();
    const uploadDir = path.join(process.cwd(), "public", "uploads", "chapter-applications", applicationId);
    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) {
        return {
          status: "error",
          message: `"${file.name}" exceeds the 10MB upload limit.`,
        };
      }
      const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(uploadDir, safeName), buffer);
      storedPaths.push(`/uploads/chapter-applications/${applicationId}/${safeName}`);
    }
  }

  await prisma.chapterApplication.create({
    data: {
      ...parsed.data,
      fileUploads: storedPaths.length > 0 ? JSON.stringify(storedPaths) : null,
    },
  });

  return {
    status: "success",
    message:
      "Thank you! Your chapter application has been submitted for national review. You'll hear from our Chapter Development team within 2-3 weeks.",
  };
}
