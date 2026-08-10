import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { DonateEmbed } from "@/components/DonateEmbed";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support AVENUE JAM's civic education, human rights, legal literacy, and youth leadership programs.",
};

const impactTiers = [
  { amount: "$25", body: "Provides a Know Your Rights guide to a full classroom." },
  { amount: "$100", body: "Funds officer training materials for one new chapter." },
  { amount: "$500", body: "Sponsors a chapter's annual programming budget for a semester." },
  { amount: "$2,500", body: "Sends a chapter delegation to the National Youth Leadership Summit." },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Support Our Mission"
        title="Donate to AVENUE JAM"
        description="Your gift — one-time or monthly — funds free civic education, legal rights literacy, human rights education, and youth leadership programming for students nationwide."
      />

      <Section tone="neutral">
        <SectionHeading eyebrow="Your Impact" title="What your gift supports" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactTiers.map((tier) => (
            <div key={tier.amount} className="rounded-xl bg-white p-6 text-center">
              <p className="text-2xl font-bold text-navy-900">{tier.amount}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{tier.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl">
          <SectionHeading title="Make a gift" description="One-time and monthly giving options are available below." center />
          <div className="mt-8">
            <DonateEmbed title="Donate to AVENUE JAM" />
          </div>
          <p className="mt-4 text-center text-xs text-neutral-500">
            AVENUE JAM CORPORATION processes donations securely through Zeffy, a donor-covered
            platform, so 100% of your gift goes directly to our programs.
          </p>
        </div>
      </Section>
    </>
  );
}
