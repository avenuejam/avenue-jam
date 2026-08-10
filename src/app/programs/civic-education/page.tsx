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
          Civic Education is the foundation of AVENUE JAM&apos;s programming. Chapters run
          workshops, simulations, and discussions that help students understand how local, state,
          and federal government actually work — and how ordinary people engage with it, from
          voting to public comment to running for office.
        </p>
      }
      topics={[
        { title: "How Government Works", body: "The structure and function of local, state, and federal government." },
        { title: "Elections & Voting", body: "How elections work and why civic participation matters at every level." },
        { title: "Civic Participation", body: "Public comment, town halls, petitions, and other tools for civic engagement." },
        { title: "Media & Information Literacy", body: "Evaluating sources and understanding the role of a free press." },
        { title: "Local Government in Action", body: "How city councils, school boards, and local agencies make decisions." },
        { title: "Constitutional Foundations", body: "Core principles of the U.S. constitutional system, taught nonpartisanly." },
      ]}
      activities={[
        "Student-run mock legislature and committee simulations",
        "Visits from local elected officials and civic leaders",
        "Voter registration and civic participation drives (for eligible students)",
        "Town-hall style discussions on local community issues",
      ]}
    />
  );
}
