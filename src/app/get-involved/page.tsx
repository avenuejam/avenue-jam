import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { InterviewRequestForm } from "@/components/forms/InterviewRequestForm";
import { OPEN_POSITIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Join AVENUE JAM",
  description: "Ways to get involved with AVENUE JAM as a student, volunteer, corporate team member, or partner.",
};

const positionRegions: Record<string, string[]> = {
  "Special Regional Coordinator": [
    "Houston",
    "Austin",
    "Dallas–Fort Worth",
    "Miami-Dade County",
    "Broward County",
    "New York City",
    "Long Island",
    "Nashville",
  ],
  "State Lead": [
    "Texas State (ex. Houston, Austin, Dallas–Fort Worth)",
    "New York State (ex. New York, Brooklyn, Queens, Richmond, Bronx)",
    "Florida State (ex. Miami-Dade, Broward)",
  ],
};

const paths = [
  {
    title: "Join an Existing Chapter",
    body: "Find an AVENUE JAM chapter at your school and connect with its officers.",
    cta: "Browse Chapters",
    href: "/chapters",
  },
  {
    title: "Start a New Chapter",
    body: "No chapter at your school yet? Apply to start one and bring our curriculum to your school.",
    cta: "Start a Chapter",
    href: "/chapters/start",
  },
  {
    title: "Join the Corporate Team",
    body: "AVENUE JAM is entirely youth-led, including at the national level. See open positions on our Executive Board, National Central Operations, and geographic leadership below.",
    cta: "View Open Positions",
    href: "#open-positions",
  },
  {
    title: "Volunteer",
    body: "Mentor a chapter, support national events, or help develop curriculum as a volunteer.",
    cta: "Volunteer With Us",
    href: "/volunteer",
  },
  {
    title: "Partner With Us",
    body: "Represent a school, university, legal aid organization, or foundation? Let's talk partnership.",
    cta: "Become a Partner",
    href: "/partner",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Join AVENUE JAM"
        description="There are many ways to get involved with AVENUE JAM — as a student, an educator, a volunteer, a member of our national corporate team, or a partner organization."
      />

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading eyebrow="Youth-Led, Top to Bottom" title="Entirely youth-led" center />
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            AVENUE JAM isn&apos;t just youth-led at the chapter level. Our Executive Director,
            Executive Board, and National Central Operations team are made up of young people
            too — the same students and recent students the organization exists to serve are the
            ones running it nationally.
          </p>
        </div>
      </Section>

      <Section tone="neutral">
        <SectionHeading title="Find your path" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {paths.map((path) => (
            <div key={path.title} className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-brand-950">{path.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{path.body}</p>
              <div className="mt-5">
                <Button href={path.href} variant="outline">
                  {path.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="open-positions">
        <SectionHeading
          eyebrow="Corporate Team"
          title="Open positions"
          description="These national positions are currently unfilled. If you're interested in one — or think you'd be a fit somewhere not listed — request an interview below."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OPEN_POSITIONS.filter((p) => p !== "Other / Not Listed").map((position) => {
            const regions = positionRegions[position];
            if (regions) {
              return (
                <details
                  key={position}
                  className="group rounded-lg border border-neutral-200 px-4 py-3 open:bg-brand-50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-brand-950">
                    {position}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-open:rotate-180"
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </summary>
                  <ul className="mt-3 space-y-1.5 text-sm text-neutral-600">
                    {regions.map((region) => (
                      <li key={region} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                        <span>{region}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            }
            return (
              <div
                key={position}
                className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-950"
              >
                {position}
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-neutral-200 p-6 sm:p-10">
          <h3 className="text-xl font-bold text-brand-950">Request an Interview</h3>
          <div className="mt-6">
            <InterviewRequestForm />
          </div>
        </div>
      </Section>
    </>
  );
}
