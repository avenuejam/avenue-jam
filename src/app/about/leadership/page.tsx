import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet AVENUE JAM's board of directors and national leadership team.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

function LeaderCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-lg font-semibold text-white">
        {initials(name)}
      </div>
      <h3 className="mt-4 font-semibold text-navy-950">{name}</h3>
      <p className="text-sm font-medium text-gold-600">{role}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{bio}</p>
    </div>
  );
}

const boardMembers = [
  { name: "Renee Ashford", role: "Board Chair", bio: "Attorney and longtime civic education advocate with two decades in nonprofit governance." },
  { name: "Marcus Webb", role: "Vice Chair", bio: "Former high school social studies teacher and curriculum consultant." },
  { name: "Priya Subramaniam", role: "Treasurer", bio: "Nonprofit finance leader supporting national education organizations." },
  { name: "Devon Lattimore", role: "Secretary", bio: "Youth development specialist and former chapter advisor." },
];

const staff = [
  { name: "Alexandra Ford", role: "Executive Director", bio: "Leads national strategy, partnerships, and organizational growth." },
  { name: "Isaiah Cole", role: "Director of Programs", bio: "Oversees national curriculum for all four program areas." },
  { name: "Naomi Hart", role: "Director of Chapter Development", bio: "Supports chapter applications, onboarding, and officer training." },
  { name: "Ben Okonkwo", role: "Director of Development", bio: "Leads fundraising, donor relations, and grant management." },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Leadership"
        description="AVENUE JAM is guided by a volunteer board of directors and a national staff team dedicated to supporting chapters across the country."
      />

      <Section>
        <SectionHeading eyebrow="Governance" title="Board of Directors" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {boardMembers.map((m) => (
            <LeaderCard key={m.name} {...m} />
          ))}
        </div>
      </Section>

      <Section tone="neutral">
        <SectionHeading eyebrow="Our Team" title="National Staff" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((m) => (
            <LeaderCard key={m.name} {...m} />
          ))}
        </div>
      </Section>
    </>
  );
}
