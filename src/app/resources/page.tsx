import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { requireResourceLibrarySession, CONTENT_ROLES } from "@/lib/auth";
import { getAllLessons } from "@/lib/data/lessons";
import { ResourceLibraryHeader } from "@/components/ResourceLibraryHeader";

export const metadata: Metadata = { title: "Resource Library" };

export const dynamic = "force-dynamic";

const UNITS: { key: string; label: string }[] = [
  { key: "CIVIC_EDUCATION", label: "Civic Education" },
  { key: "HUMAN_RIGHTS_EDUCATION", label: "Human Rights Education" },
  { key: "LEGAL_RIGHTS_LITERACY", label: "Legal Rights Literacy" },
];

export default async function ResourceLibraryPage() {
  const session = await requireResourceLibrarySession();

  const [user, lessons] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id }, include: { chapter: true } }),
    getAllLessons(),
  ]);

  return (
    <div>
      <ResourceLibraryHeader
        userName={user?.name ?? session.user.name ?? "there"}
        role={session.user.role}
        chapterName={user?.chapter?.name}
        showAdminLink={CONTENT_ROLES.includes(session.user.role)}
      />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-neutral-900">Resource Library</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Curriculum lessons organized by unit. View in your browser or download to print.
        </p>

        <div className="mt-8 space-y-4">
          {UNITS.map((unit) => {
            const unitLessons = lessons.filter((l) => l.unit === unit.key);
            return (
              <details key={unit.key} className="rounded-xl border border-neutral-200 bg-white" open>
                <summary className="cursor-pointer list-none px-6 py-4 font-semibold text-brand-950 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between">
                    <span>{unit.label}</span>
                    <span className="text-sm font-normal text-neutral-500">
                      {unitLessons.length} lesson{unitLessons.length === 1 ? "" : "s"}
                    </span>
                  </span>
                </summary>
                <div className="border-t border-neutral-100 px-6 py-2">
                  {unitLessons.length === 0 ? (
                    <p className="py-4 text-sm text-neutral-500">No lessons published yet.</p>
                  ) : (
                    <ul className="divide-y divide-neutral-100">
                      {unitLessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-4"
                        >
                          <div>
                            <p className="font-medium text-neutral-900">{lesson.title}</p>
                            <p className="mt-1 text-sm text-neutral-600">{lesson.description}</p>
                          </div>
                          <div className="flex shrink-0 gap-4 text-sm font-semibold">
                            <a
                              href={`/api/resources/${lesson.id}?mode=view`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-700 hover:underline"
                            >
                              View
                            </a>
                            <a href={`/api/resources/${lesson.id}`} className="text-brand-700 hover:underline">
                              Download
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}
