import Link from "next/link";
import type { Metadata } from "next";
import { getAllEvents } from "@/lib/data/events";
import { deleteEvent } from "@/lib/actions/events";
import { Table } from "@/components/admin/Table";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "Events" };

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Events</h1>
          <p className="mt-1 text-sm text-neutral-500">{events.length} total</p>
        </div>
        <Button href="/admin/events/new">New Event</Button>
      </div>

      <div className="mt-6">
        <Table
          columns={[
            { key: "title", label: "Title" },
            { key: "scope", label: "Scope" },
            { key: "startsAt", label: "Starts" },
            { key: "chapter", label: "Chapter" },
            { key: "actions", label: "" },
          ]}
          rows={events.map((e) => ({
            title: e.title,
            scope: e.scope,
            startsAt: formatDate(e.startsAt),
            chapter: e.chapter?.name ?? "—",
            actions: (
              <div className="flex gap-3">
                <Link href={`/admin/events/${e.id}/edit`} className="text-brand-700 hover:underline">
                  Edit
                </Link>
                <form action={deleteEvent.bind(null, e.id)}>
                  <button type="submit" className="text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}
