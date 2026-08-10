import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { getChapterBySlug, parseOfficers } from "@/lib/data/chapters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);
  if (!chapter) return {};
  return {
    title: chapter.name,
    description: chapter.summary,
  };
}

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Active",
  PENDING: "Pending Review",
  INACTIVE: "Inactive",
};

export default async function ChapterProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) notFound();

  const officers = parseOfficers(chapter.officers);

  return (
    <>
      <PageHero
        eyebrow={`${chapter.region} Region · ${STATUS_LABEL[chapter.status]}`}
        title={chapter.name}
        description={chapter.summary}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Chapter Leadership" title="Officers & Advisor" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">President</p>
                <p className="mt-1 font-medium text-navy-950">{chapter.president}</p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">Advisor</p>
                <p className="mt-1 font-medium text-navy-950">{chapter.advisor}</p>
              </div>
              {officers.map((officer) => (
                <div key={officer.name} className="rounded-xl border border-neutral-200 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">
                    {officer.role}
                  </p>
                  <p className="mt-1 font-medium text-navy-950">{officer.name}</p>
                </div>
              ))}
            </div>

            {chapter.events.length > 0 && (
              <div className="mt-12">
                <SectionHeading eyebrow="What's Happening" title="Chapter Events" />
                <div className="mt-6 space-y-4">
                  {chapter.events.map((event) => (
                    <div key={event.id} className="rounded-xl border border-neutral-200 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">
                        {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                          event.startsAt,
                        )}
                      </p>
                      <h3 className="mt-1 font-semibold text-navy-950">{event.title}</h3>
                      <p className="mt-1 text-sm text-neutral-600">{event.location}</p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-2xl bg-navy-50 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-600">
              Chapter Details
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">School / Organization</dt>
                <dd className="font-medium text-navy-900">{chapter.schoolOrOrg}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Location</dt>
                <dd className="font-medium text-navy-900">
                  {chapter.city}, {chapter.state}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Region</dt>
                <dd className="font-medium text-navy-900">{chapter.region}</dd>
              </div>
              {chapter.foundedYear && (
                <div>
                  <dt className="text-neutral-500">Founded</dt>
                  <dd className="font-medium text-navy-900">{chapter.foundedYear}</dd>
                </div>
              )}
              <div>
                <dt className="text-neutral-500">Status</dt>
                <dd className="font-medium text-navy-900">{STATUS_LABEL[chapter.status]}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
