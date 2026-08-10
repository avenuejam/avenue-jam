import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Section, SectionHeading } from "./Section";
import { Button } from "./Button";

export function ProgramTemplate({
  eyebrow,
  title,
  description,
  overview,
  topics,
  activities,
}: {
  eyebrow: string;
  title: string;
  description: string;
  overview: ReactNode;
  topics: { title: string; body: string }[];
  activities: string[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <Section>
        <div className="prose-page max-w-3xl text-lg leading-relaxed text-neutral-600">
          {overview}
        </div>
      </Section>

      <Section tone="neutral">
        <SectionHeading eyebrow="Curriculum Focus" title="What students learn" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div key={topic.title} className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold text-brand-950">{topic.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{topic.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="In Practice" title="How chapters bring this to life" />
            <ul className="mt-6 space-y-3 text-neutral-700">
              {activities.map((activity) => (
                <li key={activity} className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-brand-50 p-8">
            <h3 className="text-lg font-semibold text-brand-950">Program resources</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Chapter officers and educators can access lesson plans, facilitation guides, and
              activity templates for this program area in the National Resource Library after
              signing in.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/chapters/start" size="md">
                Start a Chapter
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
