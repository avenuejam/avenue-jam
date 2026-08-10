import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Join AVENUE JAM",
  description: "Ways to get involved with AVENUE JAM as a student, volunteer, or partner.",
};

const paths = [
  {
    title: "Join an Existing Chapter",
    body: "Find an AVENUE JAM chapter at your school or nearby and connect with its officers.",
    cta: "Browse Chapters",
    href: "/chapters",
  },
  {
    title: "Start a New Chapter",
    body: "No chapter at your school yet? Apply to start one and bring our programs to your community.",
    cta: "Start a Chapter",
    href: "/chapters/start",
  },
  {
    title: "Volunteer",
    body: "Mentor a chapter, support national events, or help develop curriculum as a volunteer.",
    cta: "Volunteer With Us",
    href: "/volunteer",
  },
  {
    title: "Partner With Us",
    body: "Represent a school, university, legal aid organization, or foundation? Let's talk partnership.",
    cta: "Become a Partner",
    href: "/partner",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Join AVENUE JAM"
        description="There are many ways to get involved with AVENUE JAM — as a student, an educator, a volunteer, or a partner organization."
      />

      <Section>
        <SectionHeading title="Find your path" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {paths.map((path) => (
            <div key={path.title} className="flex flex-col rounded-xl border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-navy-950">{path.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{path.body}</p>
              <div className="mt-5">
                <Button href={path.href} variant="outline">
                  {path.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
