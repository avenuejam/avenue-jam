import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventById } from "@/lib/data/events";
import { getChapters } from "@/lib/data/chapters";
import { updateEvent } from "@/lib/actions/events";
import { EventForm } from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "Edit Event" };

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [event, chapters] = await Promise.all([getEventById(id), getChapters()]);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">Edit {event.title}</h1>
      <div className="mt-6">
        <EventForm event={event} chapters={chapters} action={updateEvent.bind(null, id)} />
      </div>
    </div>
  );
}
