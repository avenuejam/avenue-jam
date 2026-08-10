"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Chapter } from "@prisma/client";

const STATUS_LABEL: Record<Chapter["status"], string> = {
  ACTIVE: "Active",
  PENDING: "Pending Review",
  INACTIVE: "Inactive",
};

const STATUS_CLASS: Record<Chapter["status"], string> = {
  ACTIVE: "bg-green-100 text-green-800",
  PENDING: "bg-amber-100 text-amber-800",
  INACTIVE: "bg-neutral-200 text-neutral-600",
};

export function ChapterDirectory({ chapters }: { chapters: Chapter[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All Regions");

  const regions = useMemo(
    () => ["All Regions", ...Array.from(new Set(chapters.map((c) => c.region))).sort()],
    [chapters],
  );

  const filtered = chapters.filter((chapter) => {
    const matchesRegion = region === "All Regions" || chapter.region === region;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q.length === 0 ||
      chapter.name.toLowerCase().includes(q) ||
      chapter.city.toLowerCase().includes(q) ||
      chapter.state.toLowerCase().includes(q) ||
      chapter.schoolOrOrg.toLowerCase().includes(q);
    return matchesRegion && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by chapter, school, or city..."
          className="w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100 sm:max-w-sm"
          aria-label="Search chapters"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-md border border-neutral-300 px-4 py-2.5 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
          aria-label="Filter by region"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <p className="text-sm text-neutral-500 sm:ml-auto">
          {filtered.length} chapter{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/chapters/${chapter.slug}`}
            className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-navy-950">{chapter.name}</h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS[chapter.status]}`}
              >
                {STATUS_LABEL[chapter.status]}
              </span>
            </div>
            <p className="mt-1 text-sm text-neutral-500">{chapter.schoolOrOrg}</p>
            <p className="mt-3 text-sm text-neutral-600">
              {chapter.city}, {chapter.state} &middot; {chapter.region}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">
              {chapter.summary}
            </p>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-neutral-500">
            No chapters match your search.
          </p>
        )}
      </div>
    </div>
  );
}
