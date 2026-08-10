import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "History",
  description: "AVENUE JAM's founding timeline.",
};

const milestones = [
  {
    date: "November 11, 2025",
    title: "AVENUE JAM is conceived",
    body: "Conceived by Haïm Marrache, AVENUE JAM's current Executive Director, during a late night in Brooklyn, New York.",
  },
  {
    date: "November 2025 – February 2026",
    title: "Building the organization",
    body: "Haïm gathers an Executive Board, develops the preliminary organizational structure and website, begins building institutional relationships, and starts raising funds to formally establish the organization.",
  },
  {
    date: "February 20, 2026",
    title: "Incorporated in Delaware",
    body: "AVENUE JAM is filed in the State of Delaware as an exempt, educational, and charitable entity, with assistance from Maurits Acosta.",
  },
  {
    date: "2026",
    title: "Building the framework",
    body: "The Executive Board develops organizational handbooks, matrices, chapter structures, and internal systems, including more than 100 pages of organizational material personally drafted by Haïm.",
  },
  {
    date: "2026",
    title: "Amnesty International AGM",
    body: "AVENUE JAM attends Amnesty International's Annual General Meeting in Washington, D.C., as its only high-school corporate partner delegation.",
  },
  {
    date: "August 7, 2026",
    title: "501(c)(3) application submitted",
    body: "AVENUE JAM submits its federal 501(c)(3) application.",
  },
  {
    date: "August 9, 2026",
    title: "Chapter network begins",
    body: "AVENUE JAM begins establishing its initial chapter structures across three states and eight major regions.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our History"
        description="From a late-night idea in Brooklyn to a national chapter network."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-10 border-l border-neutral-200 pl-8">
            {milestones.map((m, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-brand-700" />
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{m.date}</p>
                <h3 className="mt-1 text-lg font-semibold text-brand-950">{m.title}</h3>
                <p className="mt-1.5 text-neutral-600">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
