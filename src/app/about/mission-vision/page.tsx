import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { ORG_MISSION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mission & Vision",
  description: "AVENUE JAM's mission and vision for civic education and youth leadership.",
};

const jamValues = [
  {
    title: "Justice",
    body: "AVENUE JAM believes civic education should help young people understand fairness, equality, human dignity, and the rights of others. Justice means taking rights seriously and recognizing the responsibilities individuals and institutions have toward one another. Justice is the foundation: understanding what is right, what is fair, and what people are entitled to.",
  },
  {
    title: "Action",
    body: "Knowledge has greater value when people can use it. AVENUE JAM encourages students to move from learning to responsible civic participation through education, leadership, community engagement, and constructive action. Action is the application: turning knowledge, discussion, and conviction into meaningful participation.",
  },
  {
    title: "Momentum",
    body: "Building meaningful civic education takes sustained effort. AVENUE JAM values consistency, growth, and forward movement — developing stronger chapters, expanding educational access, improving programs, and creating lasting opportunities for youth leadership. Momentum is the continuation: ensuring that learning and action do not stop after a single discussion or event.",
  },
];

const otherValues = [
  {
    title: "Nonpartisanship",
    body: "AVENUE JAM provides civic and rights-based education without endorsing political parties, candidates, or partisan political positions. Students are encouraged to understand different perspectives, examine issues critically, and form their own informed views.",
  },
  {
    title: "Accessibility",
    body: "Civic knowledge and rights literacy should not be limited by geography, socioeconomic status, school resources, or prior access to specialized education. AVENUE JAM works to make educational opportunities and resources accessible to young people and communities.",
  },
  {
    title: "Youth Ownership",
    body: "Young people are not simply the audience for AVENUE JAM's work. They are participants, organizers, educators, and leaders within the organization and its chapters. Youth leadership is central to how AVENUE JAM operates.",
  },
  {
    title: "Rights-Based Learning",
    body: "AVENUE JAM approaches education through an understanding of human rights, legal rights, civic responsibilities, institutions, and the systems that shape people's lives. Students should understand not only how systems work, but how those systems affect people.",
  },
];

export default function MissionVisionPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Mission & Vision" />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-brand-950">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">{ORG_MISSION}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-brand-950">Our Vision</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-600">
              <p>
                AVENUE JAM envisions a generation of young people equipped to understand their
                rights, participate meaningfully in civic life, and lead with knowledge,
                responsibility, and respect for human dignity.
              </p>
              <p>
                We envision communities where civic education, human rights education, and legal
                rights literacy are accessible to every young person, regardless of background or
                location, and where young people are encouraged not merely to receive information,
                but to question, discuss, challenge, and engage with it.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="neutral">
        <SectionHeading
          eyebrow="What Guides Us"
          title="Our core values"
          description={'The first three values — Justice, Action, and Momentum — are the values at the heart of AVENUE JAM’s name and identity. Together, they represent what “JAM” stands for.'}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {jamValues.map((value) => (
            <div key={value.title} className="rounded-xl border-2 border-brand-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-800">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{value.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {otherValues.map((value) => (
            <div key={value.title} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-brand-950">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{value.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
