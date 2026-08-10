import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { StatCard } from "@/components/StatCard";

export const metadata: Metadata = {
  title: "Impact",
  description: "AVENUE JAM's educational framework and how chapters bring it to life.",
};

const deliverables = [
  {
    label: "Civic Education",
    body: "Students explore government, civic institutions, public participation, policy, and their role in civic life.",
  },
  {
    label: "Legal Rights Literacy",
    body: "Students develop a foundational understanding of legal rights, responsibilities, laws, and where reliable legal information can be found.",
  },
  {
    label: "Human Rights Education",
    body: "Students explore human rights principles, human dignity, equality, and contemporary human rights issues.",
  },
];

const chapterMethods = [
  {
    title: "Peer-Based Discussion",
    body: "Students learn through structured conversations, guided discussions, issue-based dialogues, healthy disagreement, and collaborative exploration of civic and rights-related topics.",
  },
  {
    title: "Guest Speakers",
    body: "Chapters may periodically invite qualified outside speakers to share expertise, experiences, and perspectives relevant to AVENUE JAM's educational mission.",
  },
  {
    title: "Educational Events",
    body: "Chapters may organize occasional events, presentations, forums, or other educational activities that bring students together around civic education, human rights, legal rights literacy, or youth leadership.",
  },
  {
    title: "Youth Leadership",
    body: "Students take responsibility for organizing discussions, coordinating speakers and events, facilitating conversations, and helping shape their chapter's educational experience.",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Impact"
        description="AVENUE JAM was founded in 2026. This page describes the organization's educational framework — what it's built to deliver as chapters launch — not a record of activity that has already happened everywhere."
      />

      <Section tone="dark">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard value="2026" label="Founded" />
          <StatCard value="3" label="Curriculum Units" />
          <StatCard value="NYC" label="National HQ" />
          <StatCard value="3" label="States" />
          <StatCard value="8" label="Special Regions" />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Program Reach"
          title="What every chapter is built to deliver"
          description="These represent AVENUE JAM's core educational framework and should not be read as evidence that every chapter already conducts every possible activity."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {deliverables.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-neutral-200 p-6">
              <h3 className="font-semibold text-brand-950">{stat.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{stat.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="neutral">
        <SectionHeading
          eyebrow="How It Works"
          title="How chapters bring AVENUE JAM to life"
          description="AVENUE JAM chapters bring the organization's mission and curriculum to life primarily through peer-based discussion, education, and youth-led engagement. Chapters create spaces where students can learn from one another, discuss civic and human rights issues, explore legal rights and responsibilities, challenge ideas, and develop their understanding through conversation and collaborative learning."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {chapterMethods.map((method) => (
            <div key={method.title} className="rounded-xl bg-white p-6">
              <h3 className="font-semibold text-brand-950">{method.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{method.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-neutral-600">
          The chapter model is intentionally flexible. Chapters are not expected to function as
          formal classrooms or professional service providers. Their role is to create accessible,
          youth-led environments where civic knowledge, rights literacy, human rights education,
          and leadership development happen through discussion, engagement, and shared learning.
        </p>
      </Section>
    </>
  );
}
