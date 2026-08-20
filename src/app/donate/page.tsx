import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { DonateEmbed } from "@/components/DonateEmbed";
import { DONATIONS_LIVE, ORG_501C3_RECOGNIZED_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support AVENUE JAM's civic education, human rights, and legal rights literacy programs.",
};

const impactTiers = [
  { amount: "$25", title: "Help Provide Educational Resources", body: "Supports the development and distribution of civic and rights-literacy educational materials." },
  { amount: "$100", title: "Support Student Programming", body: "Helps support educational programming and resources for students and chapters." },
  { amount: "$500", title: "Support Chapter Development", body: "Helps provide resources, training, and program support for youth-led chapter activities." },
  { amount: "$2,500", title: "Expand National Youth Leadership", body: "Helps support larger-scale organizational initiatives, leadership development, curriculum work, and national programming." },
];

const donationBenefits = [
  {
    title: "Tax-Deductible",
    body: `AVENUE JAM CORPORATION is a recognized 501(c)(3) public charity (IRS determination ${ORG_501C3_RECOGNIZED_DATE}). Your gift is tax-deductible to the extent allowed by law.`,
  },
  {
    title: "100% to Programs",
    body: "We process donations through Zeffy, a donor-covered platform, so no platform fees are taken out — every dollar you give reaches our programs.",
  },
  {
    title: "Direct Impact",
    body: "Your gift funds free civic education, legal rights literacy, and human rights education for students nationwide, not overhead.",
  },
  {
    title: "Flexible Giving",
    body: "Give once or set up a monthly gift — recurring donations can be adjusted or canceled at any time.",
  },
];

function DonationBenefits() {
  return (
    <Section tone="neutral">
      <SectionHeading eyebrow="Why Give" title="Benefits of donating" center />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {donationBenefits.map((benefit) => (
          <div key={benefit.title} className="rounded-xl bg-white p-6">
            <h3 className="font-semibold text-brand-950">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{benefit.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function DonateComingSoon() {
  return (
    <>
      <PageHero
        eyebrow="Support Our Mission"
        title="Donate to AVENUE JAM"
        description="Online giving isn't open yet — we're finalizing our bank account and Zeffy donation platform setup."
      />
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-brand-950">Coming Soon</h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            AVENUE JAM is a recognized 501(c)(3) public charity, and gifts will be tax-deductible
            once online giving opens. We&apos;re finishing setup on our organizational bank account
            and Zeffy donation platform in the meantime. If you&apos;d like to support AVENUE JAM
            now, please{" "}
            <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
              get in touch
            </Link>
            .
          </p>
        </div>
      </Section>
      <DonationBenefits />
    </>
  );
}

export default function DonatePage() {
  if (!DONATIONS_LIVE) {
    return <DonateComingSoon />;
  }

  return (
    <>
      <PageHero
        eyebrow="Support Our Mission"
        title="Donate to AVENUE JAM"
        description="Your gift — one-time or monthly — funds free civic education, legal rights literacy, and human rights education for students nationwide."
      />

      <DonationBenefits />

      <Section>
        <SectionHeading eyebrow="Your Impact" title="What your gift supports" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactTiers.map((tier) => (
            <div key={tier.amount} className="rounded-xl bg-white p-6 text-center">
              <p className="text-2xl font-bold text-brand-900">{tier.amount}</p>
              <p className="mt-1 text-sm font-semibold text-brand-800">{tier.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{tier.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-neutral-500">
          These are illustrative examples of how gifts at each level may be used, not audited
          statements that a specific dollar amount purchases a specific item or service.
        </p>
      </Section>

      <Section tone="neutral">
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
