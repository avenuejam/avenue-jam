import type { Metadata } from "next";
import { getChapters } from "@/lib/data/chapters";
import { EventForm } from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "New Event" };

export default async function NewEventPage() {
  const chapters = await getChapters();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">New Event</h1>
      <div className="mt-6">
        <EventForm chapters={chapters} />
      </div>
    </div>
  );
}
