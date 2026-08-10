import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How AVENUE JAM started, how it was built, and why it exists.",
};

function StoryBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-brand-950">{title}</h3>
      <div className="mt-3 space-y-4 text-lg leading-relaxed text-neutral-700">{children}</div>
    </div>
  );
}

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story"
        description="How AVENUE JAM started, how it was built, and why it exists."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-12">
          <StoryBlock title="Where It Started">
            <p>
              AVENUE JAM was conceived on November 11, 2025, during a late night in Brooklyn, New
              York, by Haïm Marrache, AVENUE JAM&apos;s current Executive Director.
            </p>
            <p>
              The idea began with a simple observation: civic, legal, and humanitarian education is
              scarce in many secondary-school environments, and where it does exist, it can too
              often rely on textbooks, lectures, and one-directional instruction.
            </p>
            <p>
              Haïm believed students needed something different — an environment built around
              discussion rather than lectures, questions rather than passive memorization, and
              healthy challenge rather than simply surrounding students with people who already
              think alike.
            </p>
            <p>
              From that idea came AVENUE JAM: a youth-led organization built around a three-unit
              curriculum — civic education, human rights education, and legal rights literacy —
              with youth leadership woven through how every chapter runs.
            </p>
          </StoryBlock>

          <StoryBlock title="Building the Organization">
            <p>
              From November 11, 2025 through February 20, 2026, Haïm began turning the concept into
              an organization.
            </p>
            <p>
              During those months, he gathered an Executive Board, developed a preliminary
              organizational structure, built an initial website, and began establishing
              relationships and partnerships intended to support AVENUE JAM&apos;s mission.
            </p>
            <p>
              During this period, AVENUE JAM established partnerships or organizational
              relationships with Amnesty International, the City of Miami, Gulliver Preparatory
              School, and Virtutem Populo, an organization founded by Haïm&apos;s political mentor,
              Maurits Acosta.
            </p>
            <p>
              Haïm also began raising the funds necessary to formally establish AVENUE JAM as a
              corporation.
            </p>
            <p>
              On February 20, 2026, with assistance from Maurits Acosta, AVENUE JAM was filed in
              the State of Delaware as an exempt, educational, and charitable entity.
            </p>
          </StoryBlock>

          <StoryBlock title="Building the Framework">
            <p>
              Following incorporation, Haïm and the Executive Board began developing the
              organizational infrastructure that would eventually support AVENUE JAM&apos;s
              national chapter model.
            </p>
            <p>
              The leadership team developed handbooks, organizational matrices, chapter structures,
              policies, and internal systems.
            </p>
            <p>
              More than 100 pages of these materials were personally drafted by Haïm during an
              intensive late-night writing period as the organization worked to establish a
              coherent national structure.
            </p>
            <p>
              The objective was not simply to create an organization, but to create a framework
              that could eventually be replicated by young people in communities beyond the
              organization&apos;s original home.
            </p>
          </StoryBlock>

          <StoryBlock title="Growing Beyond the Original Idea">
            <p>
              AVENUE JAM&apos;s relationship with Amnesty International also became an important
              part of its early development.
            </p>
            <p>
              The organization attended Amnesty International&apos;s Annual General Meeting in
              Washington, D.C., as its only high-school corporate partner delegation.
            </p>
            <p>
              The experience reinforced AVENUE JAM&apos;s belief that young people should not
              simply be spoken to about civic and human rights issues — they should be given
              opportunities to participate in the institutions, discussions, and communities
              surrounding those issues.
            </p>
          </StoryBlock>

          <StoryBlock title="Building Toward 501(c)(3) Status">
            <p>
              After establishing the corporation, AVENUE JAM&apos;s leadership internally raised
              the funds necessary to pursue federal tax-exempt recognition.
            </p>
            <p>The organization&apos;s 501(c)(3) application was submitted on August 7, 2026.</p>
            <p>
              This represented another step toward establishing AVENUE JAM as a nationally
              structured charitable educational organization.
            </p>
          </StoryBlock>

          <StoryBlock title="The Beginning of the Chapter Network">
            <p>
              On August 9, 2026, AVENUE JAM began developing its initial chapter structures across
              three states and eight major regions.
            </p>
            <p>
              These structures marked the beginning of the organization&apos;s transition from a
              centralized founding organization into a national youth-led chapter network.
            </p>
            <p>
              The chapter model allows AVENUE JAM to maintain a common national mission and
              educational framework while giving young people the ability to create discussions,
              invite speakers, organize educational events, and develop leadership within their own
              communities.
            </p>
          </StoryBlock>
        </div>
      </Section>

      <Section tone="neutral">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <SectionHeading eyebrow="Why We Exist" title="Why civics education is broken" />
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-700">
              <p>
                Civic education is often taught as a collection of facts rather than as a practical
                understanding of how institutions, rights, laws, and civic participation affect
                people&apos;s everyday lives.
              </p>
              <p>
                AVENUE JAM was created to help close that gap by connecting civic education with
                human rights education and basic legal rights literacy while giving young people
                opportunities to apply what they learn.
              </p>
              <p>
                The goal is not simply to teach students how government is structured. It is to
                create an environment where students can ask questions, challenge assumptions, hear
                competing perspectives, discuss difficult issues, and develop their own informed
                conclusions.
              </p>
              <p className="font-medium text-brand-900">
                AVENUE JAM believes that a discussion can teach what a lecture cannot.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-brand-950">Why we&apos;re nonpartisan</h3>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-700">
              <p>
                AVENUE JAM is intentionally nonpartisan because its purpose is education, not
                political campaigning.
              </p>
              <p>
                Students should be able to learn how government works, understand their rights,
                examine competing perspectives, and participate in civic life without an
                organization directing them toward a particular political party or candidate.
                Nonpartisanship allows AVENUE JAM to focus on education while giving students room
                to develop their own informed perspectives.
              </p>
              <p>
                Being nonpartisan does not mean avoiding difficult or controversial subjects. It
                means approaching them educationally, fairly, and without directing students toward
                a predetermined partisan conclusion.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-brand-950">Why the chapter model</h3>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-700">
              <p>
                AVENUE JAM uses a chapter model so that youth leadership and civic education can
                develop within local communities while remaining connected to a national
                organizational structure.
              </p>
              <p>
                Chapters can adapt their discussions, speakers, and events to their schools and
                communities while following common organizational standards, educational
                objectives, leadership structures, and program expectations.
              </p>
              <p>
                The model allows AVENUE JAM to maintain a consistent educational mission without
                requiring every chapter to operate in exactly the same way.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="At Our Founding" title="What we committed to from day one" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Discussions, Not Lessons",
              body: "AVENUE JAM was built around the belief that civic education should not simply consist of lessons, lectures, or students passively receiving information. Chapters create spaces for students to question, discuss, challenge, listen, and develop ideas together.",
            },
            {
              title: "Teach Rights, Not Politics",
              body: "Build civic and rights literacy without partisan political instruction, political endorsements, or campaigning.",
            },
            {
              title: "Put Young People in Leadership",
              body: "Give students meaningful responsibility for organizing, facilitating, discussing, and developing their chapter's educational experience.",
            },
            {
              title: "Build Locally, Connect Nationally",
              body: "Create chapters rooted in their own communities while connecting them through a common national organizational structure.",
            },
            {
              title: "Make Civic Knowledge Practical",
              body: "Move beyond memorizing government structures by helping students understand rights, institutions, civic responsibilities, and real-world participation.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-brand-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
