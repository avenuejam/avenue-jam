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
      description="Helping students understand their legal rights and responsibilities, and where to go for reliable information."
      overview={
        <>
          <p>
            Legal Rights Literacy is part of AVENUE JAM&apos;s national educational framework.
            Chapters create space for students to explore legal rights and responsibilities through
            peer-based discussion, in plain, nonpartisan language. The topics and activities below
            describe what the program is built to deliver as chapters launch, not a record of
            activity already happening everywhere.
          </p>
          <p className="text-base text-neutral-500">
            These activities are educational in nature and should not be represented as the
            provision of legal services or legal representation.
          </p>
        </>
      }
      topics={[
        { title: "Basic Constitutional Rights", body: "The foundational rights established by the Constitution." },
        { title: "Rights During Interactions with Government Institutions", body: "What to know when interacting with government institutions." },
        { title: "Understanding Laws and Legal Systems", body: "How laws and legal systems function." },
        { title: "Legal Responsibilities and Civic Obligations", body: "Legal responsibilities that come alongside legal rights." },
        { title: "Accessing Reliable Legal Information and Assistance", body: "Where to find legitimate legal information and assistance." },
        { title: "Recognizing When Professional Legal Help Is Needed", body: "How to recognize when a situation calls for a qualified professional." },
      ]}
      activities={[
        "Peer-based legal rights discussions",
        "Occasional qualified guest speakers",
        "Educational rights-literacy events",
        "Discussions of real-world legal and civic scenarios",
      ]}
    />
  );
}
