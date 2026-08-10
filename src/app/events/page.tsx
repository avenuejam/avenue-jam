import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getAllEvents } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "National, regional, and chapter events across the AVENUE JAM network.",
};

const SCOPE_LABEL: Record<string, string> = {
  NATIONAL: "National",
  REGIONAL: "Regional",
  CHAPTER: "Chapter",
};

const SCOPE_CLASS: Record<string, string> = {
  NATIONAL: "bg-brand-900 text-white",
  REGIONAL: "bg-brand-100 text-brand-800",
  CHAPTER: "bg-brand-100 text-brand-600",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <>
      <PageHero
        eyebrow="Calendar"
        title="Events"
        description="From national summits to local chapter clinics, here's what's happening across the AVENUE JAM network."
      />

      <Section>
        <div className="space-y-5">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${SCOPE_CLASS[event.scope]}`}>
                    {SCOPE_LABEL[event.scope]}
                  </span>
                  {event.chapter && (
                    <Link
                      href={`/chapters/${event.chapter.slug}`}
                      className="text-xs font-medium text-brand-600 hover:underline"
                    >
                      {event.chapter.name}
                    </Link>
                  )}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-brand-950">{event.title}</h2>
                <p className="mt-1 text-sm text-neutral-600">{event.location}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  {event.description}
                </p>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <p className="text-sm font-semibold text-brand-900">
                  {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(event.startsAt)}
                </p>
                {event.registerUrl && (
                  <a
                    href={event.registerUrl}
                    className="mt-2 inline-block rounded-md bg-brand-800 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
                  >
                    Register
                  </a>
                )}
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <p className="py-10 text-center text-neutral-500">No events are currently scheduled.</p>
          )}
        </div>
      </Section>
    </>
  );
}
