import Link from "next/link";
import type { Metadata } from "next";
import { getChapters } from "@/lib/data/chapters";
import { deleteChapter } from "@/lib/actions/chapters";
import { Table } from "@/components/admin/Table";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "Chapters" };

export const dynamic = "force-dynamic";

// Explicit region order (states first, then special regions) — not alphabetical.
// Any region not listed here sorts after these, alphabetically among themselves.
const REGION_ORDER = [
  "Florida State",
  "New York State",
  "Texas State",
  "New York City SR",
  "Long Island SR",
  "Nashville SR",
  "Houston SR",
];

function regionSortKey(region: string) {
  const index = REGION_ORDER.indexOf(region);
  return index === -1 ? [1, region] as const : [0, index] as const;
}

export default async function AdminChaptersPage() {
  const chapters = await getChapters();
  const sorted = [...chapters].sort((a, b) => {
    const [aTier, aKey] = regionSortKey(a.region);
    const [bTier, bKey] = regionSortKey(b.region);
    if (aTier !== bTier) return aTier - bTier;
    return aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Chapters</h1>
          <p className="mt-1 text-sm text-neutral-500">{chapters.length} total</p>
        </div>
        <Button href="/admin/chapters/new">New Chapter</Button>
      </div>

      <div className="mt-6">
        <Table
          columns={[
            { key: "region", label: "Region" },
            { key: "name", label: "Name" },
            { key: "location", label: "Location" },
            { key: "status", label: "Status" },
            { key: "president", label: "President" },
            { key: "actions", label: "" },
          ]}
          rows={sorted.map((c) => ({
            region: c.region,
            name: c.name,
            location: `${c.city}, ${c.state}`,
            status: c.status,
            president: c.president,
            actions: (
              <div className="flex gap-3">
                <Link href={`/admin/chapters/${c.id}/edit`} className="text-brand-700 hover:underline">
                  Edit
                </Link>
                <form action={deleteChapter.bind(null, c.id)}>
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
