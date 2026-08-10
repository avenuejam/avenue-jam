import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { PEOPLE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet AVENUE JAM's Executive Director and Executive Board.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

function LeaderCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-lg font-semibold text-white">
        {initials(name)}
      </div>
      <h3 className="mt-4 font-semibold text-brand-950">{name}</h3>
      <p className="text-sm font-medium text-brand-600">{role}</p>
    </div>
  );
}

const executiveDirector = PEOPLE.find((p) => p.department === "Office of the Executive Director")!;
const executiveBoard = PEOPLE.filter((p) => p.department === "Office of the National Executive Board");

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Leadership"
        description="AVENUE JAM is led by an Executive Director and a National Executive Board."
      />

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Office of the Executive Director" title="Executive Director" />
          <Link href="/about/directory" className="text-sm font-semibold text-brand-700 hover:underline">
            View full directory &rarr;
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LeaderCard name={executiveDirector.name} role={executiveDirector.role} />
        </div>
      </Section>

      <Section tone="neutral">
        <SectionHeading eyebrow="Governance" title="Office of the National Executive Board" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {executiveBoard.map((m) => (
            <LeaderCard key={m.name} name={m.name} role={m.role} />
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-500">
          For the full organizational structure — the Department of National Central Operations,
          geographic leadership, and how it all connects to chapters — see the{" "}
          <Link href="/about/directory" className="font-semibold text-brand-700 hover:underline">
            Directory
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
