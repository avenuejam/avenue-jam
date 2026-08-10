import type { Metadata } from "next";
import { ProgramTemplate } from "@/components/ProgramTemplate";

export const metadata: Metadata = {
  title: "Civic Education",
  description: "Information about government, democracy, citizenship, and civic participation.",
};

export default function CivicEducationPage() {
  return (
    <ProgramTemplate
      eyebrow="Program Area"
      title="Civic Education"
      description="Building a working understanding of how government functions and how to participate in civic life."
      overview={
        <p>
          Civic Education is part of AVENUE JAM&apos;s national educational framework. Chapters
          create space for students to explore how government functions and how ordinary people
          engage with it — not through lectures, but through peer-based discussion, questions, and
          debate. The topics and activities below describe what the program is built to deliver as
          chapters launch, not a record of activity already happening everywhere.
        </p>
      }
      topics={[
        { title: "How Government Institutions Work", body: "The structure and function of government institutions at every level." },
        { title: "Federal, State, and Local Government", body: "How responsibilities and authority are divided across levels of government." },
        { title: "Civic Participation and Public Engagement", body: "The tools ordinary people use to engage with public life and institutions." },
        { title: "Elections and Democratic Processes", body: "How elections and democratic processes work." },
        { title: "Public Policy and Community Decision-Making", body: "How public policy gets made and how communities weigh in." },
        { title: "Rights and Responsibilities", body: "The rights and responsibilities of citizens and residents." },
      ]}
      activities={[
        "Peer-based civic discussions",
        "Occasional guest speakers",
        "Educational events and forums",
        "Student-led exploration of civic and public-policy topics",
      ]}
    />
  );
}
