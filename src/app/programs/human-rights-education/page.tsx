import type { Metadata } from "next";
import { ProgramTemplate } from "@/components/ProgramTemplate";

export const metadata: Metadata = {
  title: "Human Rights Education",
  description: "Information about human rights principles, international standards, and rights literacy.",
};

export default function HumanRightsEducationPage() {
  return (
    <ProgramTemplate
      eyebrow="Program Area"
      title="Human Rights Education"
      description="Grounding students in human rights principles and helping them engage with real human rights issues."
      overview={
        <p>
          Human Rights Education is part of AVENUE JAM&apos;s national educational framework.
          Chapters create space for students to explore human dignity, equality, and international
          human rights standards through discussion rather than one-directional instruction. The
          topics and activities below describe what the program is built to deliver as chapters
          launch, not a record of activity already happening everywhere.
        </p>
      }
      topics={[
        { title: "Universal Human Rights Principles", body: "The foundational principles that define human rights." },
        { title: "Human Dignity and Equality", body: "Why human dignity and equality sit at the center of rights-based education." },
        { title: "Civil and Political Rights", body: "Rights related to civic and political participation." },
        { title: "Economic, Social, and Cultural Rights", body: "Rights related to work, education, health, and cultural life." },
        { title: "International Human Rights Institutions", body: "The bodies and mechanisms that define and protect human rights globally." },
        { title: "Understanding and Responding to Human Rights Issues", body: "How to think through and engage with real human rights issues." },
      ]}
      activities={[
        "Peer-based human rights discussions",
        "Occasional guest speakers",
        "Human rights educational events",
        "Case-study and issue-based discussions",
      ]}
    />
  );
}
