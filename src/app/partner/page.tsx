import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { PartnershipForm } from "@/components/forms/PartnershipForm";

export const metadata: Metadata = {
  title: "Become a Partner",
  description: "Partner with AVENUE JAM to expand civic education access nationwide.",
};

const partnerTypes = [
  { title: "School Districts", body: "Bring AVENUE JAM chapters and curriculum into your schools." },
  { title: "Universities", body: "Support chapter mentorship, research, or teacher-training partnerships." },
  { title: "Legal Aid Organizations", body: "Co-host Know Your Rights clinics and legal literacy programming." },
  { title: "Civic Foundations & Sponsors", body: "Fund chapter grants, national events, and program development." },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Become a Partner"
        description="AVENUE JAM partners with schools, universities, legal aid organizations, and civic foundations to expand access to civic education nationwide."
      />

      <Section tone="neutral">
        <SectionHeading eyebrow="Ways to Partner" title="How organizations work with us" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partnerTypes.map((p) => (
            <div key={p.title} className="rounded-xl bg-white p-6">
              <h3 className="font-semibold text-navy-950">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-navy-950">Partnership Inquiry</h2>
          <div className="mt-8">
            <PartnershipForm />
          </div>
        </div>
      </Section>
    </>
  );
}
