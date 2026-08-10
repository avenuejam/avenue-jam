"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  requesterName: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  organization: z.string().trim().min(2, "Please enter your organization."),
  eventDate: z.coerce.date({ error: "Please enter a valid event date." }),
  eventFormat: z.string().trim().min(2, "Please select an event format."),
  topic: z.string().trim().min(2, "Please enter a topic."),
  audience: z.string().trim().min(2, "Please describe your audience."),
  message: z.string().trim().optional(),
});

export type SpeakerState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function submitSpeakerRequest(
  _prevState: SpeakerState,
  formData: FormData,
): Promise<SpeakerState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors: SpeakerState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  await prisma.speakerRequest.create({ data: parsed.data });

  return {
    status: "success",
    message: "Thank you for your speaker request! Our team will confirm availability soon.",
  };
}
