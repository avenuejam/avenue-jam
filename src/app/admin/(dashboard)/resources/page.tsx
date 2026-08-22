import Link from "next/link";
import type { Metadata } from "next";
import { getAllLessons } from "@/lib/data/lessons";
import { deleteLesson } from "@/lib/actions/lessons";
import { Table } from "@/components/admin/Table";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "Resources" };

export const dynamic = "force-dynamic";

const UNIT_LABELS: Record<string, string> = {
  CIVIC_EDUCATION: "Civic Education",
  HUMAN_RIGHTS_EDUCATION: "Human Rights Education",
  LEGAL_RIGHTS_LITERACY: "Legal Rights Literacy",
};

export default async function AdminResourcesPage() {
  const lessons = await getAllLessons();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Resources</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {lessons.length} lesson{lessons.length === 1 ? "" : "s"} — visible to national staff and
            chapter leadership at <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">/resources</code>.
          </p>
        </div>
        <Button href="/admin/resources/new">New Lesson</Button>
      </div>

      <div className="mt-6">
        <Table
          columns={[
            { key: "unit", label: "Unit" },
            { key: "title", label: "Title" },
            { key: "file", label: "File" },
            { key: "actions", label: "" },
          ]}
          rows={lessons.map((l) => ({
            unit: UNIT_LABELS[l.unit] ?? l.unit,
            title: l.title,
            file: l.fileName,
            actions: (
              <div className="flex gap-3">
                <Link href={`/admin/resources/${l.id}/edit`} className="text-brand-700 hover:underline">
                  Edit
                </Link>
                <form action={deleteLesson.bind(null, l.id)}>
                  <button type="submit" className="text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}
