import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Table } from "@/components/admin/Table";
import { AdminSection } from "@/components/admin/AdminSection";

export const metadata: Metadata = { title: "Form Submissions" };

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function SubmissionsPage() {
  const [contactSubmissions, volunteerApplications, partnershipRequests, speakerRequests, interviewRequests] =
    await Promise.all([
      prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.volunteerApplication.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.partnershipRequest.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.speakerRequest.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.interviewRequest.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

  const sections = [
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
        Read-only. Chapter applications have their own review workflow under{" "}
        <a href="/admin/applications" className="text-brand-700 hover:underline">
          Applications
        </a>
        .
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

      <AdminSection id="contact" title="Contact" count={contactSubmissions.length}>
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
      </AdminSection>

      <AdminSection id="volunteer" title="Volunteer Applications" count={volunteerApplications.length}>
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
      </AdminSection>

      <AdminSection id="partnership" title="Partnership Requests" count={partnershipRequests.length}>
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
      </AdminSection>

      <AdminSection id="speaker" title="Speaker Requests" count={speakerRequests.length}>
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
      </AdminSection>

      <AdminSection id="interview" title="Interview Requests" count={interviewRequests.length}>
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
      </AdminSection>
    </div>
  );
}
