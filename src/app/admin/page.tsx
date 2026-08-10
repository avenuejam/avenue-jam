import type { Metadata } from "next";
import type { ReactNode } from "react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function Table({
  columns,
  rows,
}: {
  columns: { key: string; label: string }[];
  rows: Record<string, string>[];
}) {
  if (rows.length === 0) {
    return <p className="py-6 text-sm text-neutral-500">No submissions yet.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2.5 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {columns.map((col) => (
                <td key={col.key} className="max-w-xs px-4 py-3 text-neutral-700">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-neutral-200 py-10">
      <h2 className="text-xl font-bold text-neutral-900">
        {title} <span className="font-normal text-neutral-400">({count})</span>
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function AdminPage() {
  const [
    chapterApplications,
    contactSubmissions,
    volunteerApplications,
    partnershipRequests,
    speakerRequests,
    interviewRequests,
  ] = await Promise.all([
    prisma.chapterApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.volunteerApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.partnershipRequest.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.speakerRequest.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.interviewRequest.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const sections = [
    { id: "chapter-applications", label: "Chapter Applications", count: chapterApplications.length },
    { id: "contact", label: "Contact", count: contactSubmissions.length },
    { id: "volunteer", label: "Volunteer", count: volunteerApplications.length },
    { id: "partnership", label: "Partnership", count: partnershipRequests.length },
    { id: "speaker", label: "Speaker", count: speakerRequests.length },
    { id: "interview", label: "Interview", count: interviewRequests.length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">Form Submissions</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Internal only — not linked from the public site. Bookmark this page.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-6">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            {s.label} ({s.count})
          </a>
        ))}
      </nav>

      <Section id="chapter-applications" title="Chapter Applications" count={chapterApplications.length}>
        <Table
          columns={[
            { key: "createdAt", label: "Submitted" },
            { key: "applicantName", label: "Applicant" },
            { key: "email", label: "Email" },
            { key: "proposedChapterName", label: "Proposed Chapter" },
            { key: "schoolOrOrganization", label: "School" },
            { key: "location", label: "Location" },
            { key: "status", label: "Status" },
            { key: "advisor", label: "Advisor" },
          ]}
          rows={chapterApplications.map((a) => ({
            createdAt: formatDate(a.createdAt),
            applicantName: a.applicantName,
            email: a.email,
            proposedChapterName: a.proposedChapterName,
            schoolOrOrganization: a.schoolOrOrganization,
            location: `${a.city}, ${a.state}`,
            status: a.status,
            advisor: `${a.advisorName} (${a.advisorEmail})`,
          }))}
        />
      </Section>

      <Section id="contact" title="Contact" count={contactSubmissions.length}>
        <Table
          columns={[
            { key: "createdAt", label: "Submitted" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "subject", label: "Subject" },
            { key: "message", label: "Message" },
          ]}
          rows={contactSubmissions.map((c) => ({
            createdAt: formatDate(c.createdAt),
            name: c.name,
            email: c.email,
            subject: c.subject,
            message: c.message,
          }))}
        />
      </Section>

      <Section id="volunteer" title="Volunteer Applications" count={volunteerApplications.length}>
        <Table
          columns={[
            { key: "createdAt", label: "Submitted" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "location", label: "Location" },
            { key: "interests", label: "Interests" },
            { key: "availability", label: "Availability" },
          ]}
          rows={volunteerApplications.map((v) => ({
            createdAt: formatDate(v.createdAt),
            name: v.name,
            email: v.email,
            location: v.location,
            interests: v.interests,
            availability: v.availability,
          }))}
        />
      </Section>

      <Section id="partnership" title="Partnership Requests" count={partnershipRequests.length}>
        <Table
          columns={[
            { key: "createdAt", label: "Submitted" },
            { key: "organizationName", label: "Organization" },
            { key: "contactName", label: "Contact" },
            { key: "email", label: "Email" },
            { key: "partnershipType", label: "Type" },
            { key: "message", label: "Message" },
          ]}
          rows={partnershipRequests.map((p) => ({
            createdAt: formatDate(p.createdAt),
            organizationName: p.organizationName,
            contactName: p.contactName,
            email: p.email,
            partnershipType: p.partnershipType,
            message: p.message,
          }))}
        />
      </Section>

      <Section id="speaker" title="Speaker Requests" count={speakerRequests.length}>
        <Table
          columns={[
            { key: "createdAt", label: "Submitted" },
            { key: "requesterName", label: "Requester" },
            { key: "email", label: "Email" },
            { key: "organization", label: "Organization" },
            { key: "eventDate", label: "Event Date" },
            { key: "topic", label: "Topic" },
          ]}
          rows={speakerRequests.map((s) => ({
            createdAt: formatDate(s.createdAt),
            requesterName: s.requesterName,
            email: s.email,
            organization: s.organization,
            eventDate: formatDate(s.eventDate),
            topic: s.topic,
          }))}
        />
      </Section>

      <Section id="interview" title="Interview Requests" count={interviewRequests.length}>
        <Table
          columns={[
            { key: "createdAt", label: "Submitted" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "position", label: "Position" },
            { key: "location", label: "Location" },
            { key: "experience", label: "Experience" },
          ]}
          rows={interviewRequests.map((i) => ({
            createdAt: formatDate(i.createdAt),
            name: i.name,
            email: i.email,
            position: i.position,
            location: i.location ?? "—",
            experience: i.experience,
          }))}
        />
      </Section>
    </div>
  );
}
