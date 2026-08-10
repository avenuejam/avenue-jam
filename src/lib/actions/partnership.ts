"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  organizationName: z.string().trim().min(2, "Please enter your organization's name."),
  contactName: z.string().trim().min(2, "Please enter a contact name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  partnershipType: z.string().trim().min(2, "Please select a partnership type."),
  message: z.string().trim().min(10, "Please tell us more about the partnership you have in mind."),
});

export type PartnershipState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function submitPartnershipRequest(
  _prevState: PartnershipState,
  formData: FormData,
): Promise<PartnershipState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors: PartnershipState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  await prisma.partnershipRequest.create({ data: parsed.data });

  return {
    status: "success",
    message: "Thank you for your interest in partnering with AVENUE JAM! Our Development team will be in touch.",
  };
}
