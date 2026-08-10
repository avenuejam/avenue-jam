import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "History",
  description: "The history and growth of AVENUE JAM's national chapter network.",
};

const milestones = [
  { year: "2021", title: "Founding chapter established", body: "AVENUE JAM began as a single student-led civic education initiative at Lincoln High School." },
  { year: "2022", title: "National curriculum launched", body: "Our first standardized curriculum across all four program areas was published for chapter use." },
  { year: "2023", title: "Expansion to 20 chapters", body: "AVENUE JAM formalized its chapter application and approval process to support responsible national growth." },
  { year: "2024", title: "First National Youth Leadership Summit", body: "Chapter leaders from across the country gathered for the organization's first national convening." },
  { year: "2026", title: "50+ active chapters", body: "AVENUE JAM surpassed 50 chartered chapters across four regions of the country." },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Our History" description="From one chapter to a national network." />

      <Section>
        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-10 border-l border-neutral-200 pl-8">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-navy-700" />
                <p className="text-sm font-semibold uppercase tracking-wide text-navy-600">{m.year}</p>
                <h3 className="mt-1 text-lg font-semibold text-navy-950">{m.title}</h3>
                <p className="mt-1.5 text-neutral-600">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
