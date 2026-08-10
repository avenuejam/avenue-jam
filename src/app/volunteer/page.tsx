import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { VolunteerForm } from "@/components/forms/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Apply to volunteer with AVENUE JAM.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Volunteer With Us"
        description="AVENUE JAM relies on volunteers to mentor chapters, support events, and help develop curriculum. Tell us how you'd like to help."
      />
      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 p-6 sm:p-10">
          <VolunteerForm />
        </div>
      </Section>
    </>
  );
}
