import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "About AVENUE JAM",
  description:
    "AVENUE JAM is a national, youth-led nonprofit advancing civic education, legal rights literacy, human rights education, and youth leadership.",
};

const subpages = [
  { title: "Mission & Vision", href: "/about/mission-vision", description: "What we believe and where we're headed." },
  { title: "Leadership", href: "/about/leadership", description: "Meet our board, national staff, and regional leaders." },
  { title: "History", href: "/about/history", description: "How AVENUE JAM grew from one chapter to a national network." },
  { title: "Impact", href: "/about/impact", description: "The reach of our programs, by the numbers." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A national, youth-led nonprofit"
        description="AVENUE JAM advances civic education, legal rights literacy, human rights education, and youth leadership through accessible, nonpartisan educational programming."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who We Are" title="Built by students, for students" />
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              AVENUE JAM CORPORATION was founded on a simple idea: students learn civic engagement
              best by practicing it. Rather than treat civic education as a single class or unit,
              we built a national organization where students lead chapters, run programming, and
              take ownership of their own civic development — supported by national curriculum,
              training, and staff.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Today, AVENUE JAM chapters operate in schools and communities across the country,
              each adapting our national program areas — civic education, human rights education,
              legal rights literacy, and youth leadership — to serve their own community.
            </p>
          </div>
          <div className="rounded-2xl bg-navy-50 p-8">
            <h3 className="text-lg font-semibold text-navy-950">At a glance</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between border-b border-navy-100 pb-3">
                <dt className="text-neutral-600">Organization type</dt>
                <dd className="font-medium text-navy-900">National nonprofit</dd>
              </div>
              <div className="flex justify-between border-b border-navy-100 pb-3">
                <dt className="text-neutral-600">Model</dt>
                <dd className="font-medium text-navy-900">Chapter-based</dd>
              </div>
              <div className="flex justify-between border-b border-navy-100 pb-3">
                <dt className="text-neutral-600">Focus areas</dt>
                <dd className="font-medium text-navy-900">4 program areas</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-600">Approach</dt>
                <dd className="font-medium text-navy-900">Nonpartisan</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="neutral">
        <SectionHeading eyebrow="Learn More" title="Explore AVENUE JAM" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subpages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-md"
            >
              <h3 className="font-semibold text-navy-950">{page.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{page.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="text-2xl font-bold text-navy-950">Want to bring AVENUE JAM to your school?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/chapters/start">Start a Chapter</Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </Section>
    </>
  );
}
