import type { Metadata } from "next";
import { ProgramTemplate } from "@/components/ProgramTemplate";

export const metadata: Metadata = {
  title: "Youth Leadership",
  description: "Programs focused on developing student leaders.",
};

export default function YouthLeadershipPage() {
  return (
    <ProgramTemplate
      eyebrow="Program Area"
      title="Youth Leadership"
      description="Developing the next generation of student leaders through mentorship, training, and hands-on practice."
      overview={
        <p>
          Youth Leadership ties AVENUE JAM&apos;s programming together. Every chapter is run by
          elected student officers who plan events, manage budgets, recruit members, and represent
          their chapter nationally — developing real leadership experience alongside their civic,
          human rights, and legal literacy education.
        </p>
      }
      topics={[
        { title: "Chapter Governance", body: "Running effective meetings, elections, and officer transitions." },
        { title: "Public Speaking & Facilitation", body: "Leading workshops, presentations, and community events." },
        { title: "Project & Event Management", body: "Planning and executing chapter events from concept to completion." },
        { title: "Team Building", body: "Recruiting, motivating, and supporting fellow chapter members." },
        { title: "Mentorship", body: "Peer mentorship between graduating and incoming chapter leaders." },
        { title: "National Representation", body: "Representing your chapter at regional and national AVENUE JAM events." },
      ]}
      activities={[
        "Annual National Youth Leadership Summit",
        "Regional officer training sessions",
        "Chapter leadership transition planning and mentorship programs",
        "Student-led fundraising and community outreach campaigns",
      ]}
    />
  );
}
