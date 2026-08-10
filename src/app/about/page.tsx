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
  { title: "Our Story", href: "/about/our-story", description: "How AVENUE JAM started, how it was built, and why it exists." },
  { title: "Mission & Vision", href: "/about/mission-vision", description: "Our mission, vision, and the values behind the name \"JAM.\"" },
  { title: "Leadership", href: "/about/leadership", description: "Our Executive Director and National Executive Board." },
  { title: "Directory", href: "/about/directory", description: "Search the directory, plus AVENUE JAM's full organizational structure." },
  { title: "History", href: "/about/history", description: "AVENUE JAM's founding timeline, from idea to chapter network." },
  { title: "Impact", href: "/about/impact", description: "What our model is built to deliver as chapters launch." },
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
              Today, AVENUE JAM chapters operate school by school across the country, each
              adapting our three-unit curriculum — civic education, human rights education, and
              legal rights literacy — to serve their own school&apos;s community.
            </p>
          </div>
          <div className="rounded-2xl bg-brand-50 p-8">
            <h3 className="text-lg font-semibold text-brand-950">At a glance</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between border-b border-brand-100 pb-3">
                <dt className="text-neutral-600">Legal structure</dt>
                <dd className="font-medium text-brand-900">Delaware nonprofit corporation</dd>
              </div>
              <div className="flex justify-between border-b border-brand-100 pb-3">
                <dt className="text-neutral-600">Tax status</dt>
                <dd className="font-medium text-brand-900">501(c)(3) pending</dd>
              </div>
              <div className="flex justify-between border-b border-brand-100 pb-3">
                <dt className="text-neutral-600">Model</dt>
                <dd className="font-medium text-brand-900">Chapter-based</dd>
              </div>
              <div className="flex justify-between border-b border-brand-100 pb-3">
                <dt className="text-neutral-600">Focus areas</dt>
                <dd className="font-medium text-brand-900">4 program areas</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-600">Approach</dt>
                <dd className="font-medium text-brand-900">Nonpartisan</dd>
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
              <h3 className="font-semibold text-brand-950">{page.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{page.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="text-2xl font-bold text-brand-950">Want to bring AVENUE JAM to your school?</h2>
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
