import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SpeakerForm } from "@/components/forms/SpeakerForm";

export const metadata: Metadata = {
  title: "Request a Speaker",
  description: "Request an AVENUE JAM speaker for your school, campus, or community event.",
};

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Request a Speaker"
        description="AVENUE JAM staff and student leaders are available to speak at schools, conferences, and community events on civic education, human rights, legal literacy, and youth leadership."
      />
      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 p-6 sm:p-10">
          <SpeakerForm />
        </div>
      </Section>
    </>
  );
}
