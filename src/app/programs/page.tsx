import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { ProgramCard } from "@/components/ProgramCard";
import { CivicIcon, HumanRightsIcon, LegalIcon, LeadershipIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore AVENUE JAM's four national program areas: Civic Education, Human Rights Education, Legal Rights Literacy, and Youth Leadership.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Our Programs"
        description="Every AVENUE JAM chapter builds local programming around four national focus areas — each grounded in accessible, nonpartisan curriculum."
      />
      <Section>
        <SectionHeading title="Explore our program areas" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProgramCard
            icon={<CivicIcon />}
            title="Civic Education"
            description="Understanding government, democracy, citizenship, and civic participation."
            href="/programs/civic-education"
          />
          <ProgramCard
            icon={<HumanRightsIcon />}
            title="Human Rights Education"
            description="Human rights principles, international standards, and rights literacy."
            href="/programs/human-rights-education"
          />
          <ProgramCard
            icon={<LegalIcon />}
            title="Legal Rights Literacy"
            description="Understanding legal systems, rights, responsibilities, and access to justice."
            href="/programs/legal-rights-literacy"
          />
          <ProgramCard
            icon={<LeadershipIcon />}
            title="Youth Leadership"
            description="Developing student leaders through mentorship and hands-on practice."
            href="/programs/youth-leadership"
          />
        </div>
      </Section>
    </>
  );
}
