"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  position: z.string().trim().min(2, "Please select a position."),
  location: z.string().trim().optional(),
  experience: z.string().trim().min(10, "Please share a bit about your interest and experience."),
});

export type InterviewRequestState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function submitInterviewRequest(
  _prevState: InterviewRequestState,
  formData: FormData,
): Promise<InterviewRequestState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors: InterviewRequestState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  await prisma.interviewRequest.create({ data: parsed.data });

  return {
    status: "success",
    message: "Thank you for your interest! Our team will follow up to schedule an interview.",
  };
}
