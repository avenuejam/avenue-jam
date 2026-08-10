import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { PARTNERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Become a Partner",
  description: "Partner with AVENUE JAM to expand civic education access nationwide.",
};

const partnerTypes = [
  { title: "School Districts", body: "Work with schools and school systems to expand access to civic, human rights, and legal rights education and create opportunities for student leadership." },
  { title: "Universities", body: "Collaborate on educational programming, research, mentorship, student leadership, and opportunities that connect younger students with higher education communities." },
  { title: "Legal Aid Organizations", body: "Partner with qualified legal organizations and professionals to strengthen legal rights literacy education and help students understand where legitimate legal information and assistance can be found." },
  { title: "Civic Foundations & Sponsors", body: "Support the development and expansion of youth civic education through funding, resources, expertise, and organizational partnerships consistent with AVENUE JAM's nonpartisan mission." },
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
              <h3 className="font-semibold text-brand-950">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our Valued Partnerships" title="Organizations we work with" center />
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex h-24 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section tone="neutral">
        <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-brand-950">Partnership Inquiry</h2>
          <div className="mt-8">
            <PartnershipForm />
          </div>
        </div>
      </Section>
    </>
  );
}
