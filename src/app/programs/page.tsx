import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { ProgramCard } from "@/components/ProgramCard";
import { CivicIcon, HumanRightsIcon, LegalIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore AVENUE JAM's three national curriculum units: Civic Education, Human Rights Education, and Legal Rights Literacy.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Our Programs"
        description="Every AVENUE JAM chapter builds its work around three national curriculum units — each grounded in accessible, nonpartisan education."
      />
      <Section>
        <SectionHeading title="Explore our curriculum" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
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
        </div>
      </Section>
    </>
  );
}
