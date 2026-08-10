import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { StatCard } from "@/components/StatCard";
import { getActiveChapters } from "@/lib/data/chapters";

export const metadata: Metadata = {
  title: "Impact",
  description: "The reach and impact of AVENUE JAM's national programming.",
};

export default async function ImpactPage() {
  const chapters = await getActiveChapters();
  const regions = Array.from(new Set(chapters.map((c) => c.region)));

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Impact"
        description="A snapshot of AVENUE JAM's reach across the country."
      />

      <Section tone="navy">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatCard value={`${chapters.length}+`} label="Active Chapters" />
          <StatCard value="12,000+" label="Students Reached" />
          <StatCard value={`${regions.length}`} label="Regions Served" />
          <StatCard value="30" label="States Represented" />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Program Reach"
          title="Impact across all four program areas"
          description="Each AVENUE JAM chapter delivers programming across civic education, human rights education, legal rights literacy, and youth leadership, adapted to their community's needs."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Civic Education Workshops", value: "300+" },
            { label: "Legal Rights Clinics Hosted", value: "80+" },
            { label: "Human Rights Events", value: "150+" },
            { label: "Trained Student Leaders", value: "600+" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-neutral-200 p-6 text-center">
              <p className="text-3xl font-bold text-navy-900">{stat.value}</p>
              <p className="mt-2 text-sm text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
