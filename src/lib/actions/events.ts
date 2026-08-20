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
  scope: z.enum(["NATIONAL", "REGIONAL", "CHAPTER"]),
  startsAt: z.string().trim().min(1, "Please choose a start date/time."),
  endsAt: z.string().trim().optional(),
  location: z.string().trim().min(2, "Please enter a location."),
  description: z.string().trim().min(10, "Please enter a description (at least 10 characters)."),
  registerUrl: z.string().trim().optional(),
  chapterId: z.string().trim().optional(),
});

export type EventFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

function toEventData(parsed: z.infer<typeof schema>) {
  return {
    slug: parsed.slug,
    title: parsed.title,
    scope: parsed.scope,
    startsAt: new Date(parsed.startsAt),
    endsAt: parsed.endsAt ? new Date(parsed.endsAt) : null,
    location: parsed.location,
    description: parsed.description,
    registerUrl: parsed.registerUrl || null,
    chapterId: parsed.chapterId || null,
  };
}

export async function createEvent(
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  await requirePortalSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: EventFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const existing = await prisma.event.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return {
      status: "error",
      message: "An event with that slug already exists.",
      fieldErrors: { slug: "This slug is taken." },
    };
  }

  await prisma.event.create({ data: toEventData(parsed.data) });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  await requirePortalSession();

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: EventFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as keyof z.infer<typeof schema>] = issue.message;
    }
    return { status: "error", message: "Please correct the errors below.", fieldErrors };
  }

  const existing = await prisma.event.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) {
    return {
      status: "error",
      message: "An event with that slug already exists.",
      fieldErrors: { slug: "This slug is taken." },
    };
  }

  await prisma.event.update({ where: { id }, data: toEventData(parsed.data) });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await requirePortalSession();
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
}
