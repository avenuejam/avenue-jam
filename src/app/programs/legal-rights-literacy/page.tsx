import type { Metadata } from "next";
import { ProgramTemplate } from "@/components/ProgramTemplate";

export const metadata: Metadata = {
  title: "Legal Rights Literacy",
  description: "Information about understanding legal systems, rights, responsibilities, and access to justice.",
};

export default function LegalRightsLiteracyPage() {
  return (
    <ProgramTemplate
      eyebrow="Program Area"
      title="Legal Rights Literacy"
      description="Helping students understand the legal system, their rights and responsibilities, and how to access justice."
      overview={
        <p>
          Legal Rights Literacy demystifies the legal system for students, many of whom will
          encounter it directly — as tenants, employees, or simply as members of the public.
          Chapters teach students their basic rights, how the justice system works, and where to
          turn for help, in plain, nonpartisan language.
        </p>
      }
      topics={[
        { title: "How the Legal System Works", body: "Courts, legal processes, and the basics of civil and criminal law." },
        { title: "Know Your Rights", body: "Rights related to school, employment, housing, and interactions with law enforcement." },
        { title: "Responsibilities Under the Law", body: "Understanding legal responsibilities alongside legal rights." },
        { title: "Access to Justice", body: "Legal aid resources and how to find help when rights are violated." },
        { title: "Contracts & Consumer Basics", body: "Practical legal literacy for everyday agreements and consumer protections." },
        { title: "Youth & the Law", body: "Legal rights and protections specific to minors and young adults." },
      ]}
      activities={[
        "Free community \"Know Your Rights\" clinics",
        "Mock trial and moot court exercises",
        "Guest sessions with legal aid attorneys and public defenders",
        "Plain-language rights guides created by chapter members",
      ]}
    />
  );
}
