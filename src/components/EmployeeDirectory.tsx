"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PEOPLE } from "@/lib/constants";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function EmployeeDirectory() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All Departments");

  const departments = useMemo(
    () => ["All Departments", ...Array.from(new Set(PEOPLE.map((p) => p.department))).sort()],
    [],
  );

  const filtered = PEOPLE.filter((person) => {
    const matchesDept = department === "All Departments" || person.department === department;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q.length === 0 ||
      person.name.toLowerCase().includes(q) ||
      person.role.toLowerCase().includes(q) ||
      person.department.toLowerCase().includes(q);
    return matchesDept && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or role..."
          className="w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 sm:max-w-sm"
          aria-label="Search directory"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-md border border-neutral-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          aria-label="Filter by department"
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <p className="text-sm text-neutral-500 sm:ml-auto">
          {filtered.length} {filtered.length === 1 ? "person" : "people"}
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((person) => (
          <div key={person.name} className="rounded-xl border border-neutral-200 bg-white p-6">
            {person.photo ? (
              <Image
                src={person.photo}
                alt={person.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-lg font-semibold text-white">
                {initials(person.name)}
              </div>
            )}
            <h3 className="mt-4 font-semibold text-brand-950">{person.name}</h3>
            <p className="text-sm font-medium text-brand-600">{person.role}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
              {person.department}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{person.explanation}</p>
            {person.bio && (
              <p className="mt-3 border-t border-neutral-100 pt-3 text-sm leading-relaxed text-neutral-500">
                {person.bio}
              </p>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-neutral-500">
            No one matches your search.
          </p>
        )}
      </div>
    </div>
  );
}
