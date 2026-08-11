import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { approveApplication, declineApplication } from "@/lib/actions/applications";

export const metadata: Metadata = { title: "Chapter Applications" };

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

const STATUS_STYLES: Record<string, string> = {
  SUBMITTED: "bg-amber-50 text-amber-800 border-amber-200",
  UNDER_REVIEW: "bg-blue-50 text-blue-800 border-blue-200",
  APPROVED: "bg-green-50 text-green-800 border-green-200",
  DECLINED: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

export default async function AdminApplicationsPage() {
  const applications = await prisma.chapterApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { reviewedBy: true },
  });

  const pending = applications.filter((a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW");
  const reviewed = applications.filter((a) => a.status === "APPROVED" || a.status === "DECLINED");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">Chapter Applications</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Approving creates a Chapter record (status: Pending) from the application&apos;s details.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-neutral-900">Awaiting Review ({pending.length})</h2>
      {pending.length === 0 && <p className="mt-4 text-sm text-neutral-500">Nothing to review.</p>}
      <div className="mt-4 space-y-6">
        {pending.map((a) => (
          <div key={a.id} className="rounded-xl border border-neutral-200 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-brand-950">{a.proposedChapterName}</h3>
                <p className="text-sm text-neutral-500">
                  {a.schoolOrOrganization} — {a.city}, {a.state}
                </p>
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[a.status]}`}
              >
                {a.status.replace("_", " ")}
              </span>
            </div>

            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-neutral-500">Applicant</dt>
                <dd className="text-neutral-800">
                  {a.applicantName} ({a.email})
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Advisor</dt>
                <dd className="text-neutral-800">
                  {a.advisorName} ({a.advisorEmail})
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-neutral-500">Motivation</dt>
                <dd className="text-neutral-800">{a.motivation}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-neutral-500">Leadership experience</dt>
                <dd className="text-neutral-800">{a.leadershipExperience}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Submitted</dt>
                <dd className="text-neutral-800">{formatDate(a.createdAt)}</dd>
              </div>
            </dl>

            <form
              action={approveApplication.bind(null, a.id)}
              className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]"
            >
              <input
                type="text"
                name="reviewNote"
                placeholder="Optional review note"
                className="rounded-md border border-neutral-300 px-3.5 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 sm:w-auto"
              >
                Approve
              </button>
              <button
                type="submit"
                formAction={declineApplication.bind(null, a.id)}
                className="w-full rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 sm:w-auto"
              >
                Decline
              </button>
            </form>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-lg font-semibold text-neutral-900">Reviewed ({reviewed.length})</h2>
      <div className="mt-4 space-y-3">
        {reviewed.map((a) => (
          <div key={a.id} className="rounded-lg border border-neutral-200 p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-neutral-800">{a.proposedChapterName}</span>
              <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[a.status]}`}>
                {a.status}
              </span>
            </div>
            <p className="mt-1 text-neutral-500">
              Reviewed {a.reviewedAt ? formatDate(a.reviewedAt) : "—"}
              {a.reviewedBy ? ` by ${a.reviewedBy.name}` : ""}
              {a.reviewNote ? ` — "${a.reviewNote}"` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
