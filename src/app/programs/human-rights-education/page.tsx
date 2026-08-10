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
      description="Grounding students in human rights principles and international standards — and connecting them to real-world issues."
      overview={
        <p>
          Human Rights Education introduces students to the frameworks that define human dignity
          and protection worldwide, including the Universal Declaration of Human Rights. Chapters
          explore how these principles apply globally and within their own communities, developing
          the awareness to recognize rights violations and advocate for change.
        </p>
      }
      topics={[
        { title: "Universal Declaration of Human Rights", body: "The foundational international framework for human rights." },
        { title: "International Standards", body: "Key treaties, bodies, and mechanisms that protect human rights globally." },
        { title: "Rights in Everyday Life", body: "Recognizing how human rights principles apply to daily situations." },
        { title: "Global Case Studies", body: "Examining human rights issues and movements from around the world." },
        { title: "Advocacy & Awareness", body: "Building skills to research, discuss, and raise awareness on rights issues." },
        { title: "Ethics & Dignity", body: "Exploring the values that underpin human rights frameworks." },
      ]}
      activities={[
        "Human rights film screenings and facilitated discussions",
        "Chapter-hosted Human Rights Youth Summits",
        "Research and awareness campaigns on global human rights issues",
        "Partnerships with local human rights and civil society organizations",
      ]}
    />
  );
}
