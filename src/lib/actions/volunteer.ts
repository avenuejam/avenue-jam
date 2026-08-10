"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  location: z.string().trim().min(2, "Please enter your city and state."),
  interests: z.string().trim().min(2, "Please tell us your areas of interest."),
  availability: z.string().trim().min(2, "Please describe your availability."),
  experience: z.string().trim().optional(),
});

export type VolunteerState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function submitVolunteerApplication(
  _prevState: VolunteerState,
  formData: FormData,
): Promise<VolunteerState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors: VolunteerState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  await prisma.volunteerApplication.create({ data: parsed.data });

  return {
    status: "success",
    message: "Thank you for your interest in volunteering! Our team will follow up soon.",
  };
}
