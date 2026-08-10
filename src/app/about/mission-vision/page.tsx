import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Mission & Vision",
  description: "AVENUE JAM's mission and vision for civic education and youth leadership.",
};

export default function MissionVisionPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Mission & Vision" />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-navy-950">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              AVENUE JAM advances civic education, legal rights literacy, human rights education,
              and youth leadership through accessible, nonpartisan educational programming.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-navy-950">Our Vision</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              A generation of young people equipped with the civic knowledge, legal literacy, and
              leadership skills to participate confidently in democratic life and advocate for
              human rights in their communities — regardless of their background or zip code.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="neutral">
        <SectionHeading eyebrow="What Guides Us" title="Our core values" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Nonpartisanship",
              body: "We teach the mechanics and principles of civic life without promoting any political party or ideology.",
            },
            {
              title: "Accessibility",
              body: "Our programming is designed to be free or low-cost and adaptable to any school or community.",
            },
            {
              title: "Youth Ownership",
              body: "Students lead their chapters — we provide the structure, training, and resources.",
            },
            {
              title: "Rights-Based Learning",
              body: "We root our curriculum in established legal and human rights frameworks, not opinion.",
            },
          ].map((value) => (
            <div key={value.title} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-navy-950">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{value.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
