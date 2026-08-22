"use client";

import { useActionState, useState } from "react";
import { createStaffUser, type UserFormState } from "@/lib/actions/users";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/Button";

const initialState: UserFormState = { status: "idle" };

const NATIONAL_ROLE_OPTIONS = [
  { value: "EXECUTIVE_DIRECTOR", label: "Executive Director" },
  { value: "NATIONAL_ADMINISTRATOR", label: "National Administrator" },
  { value: "EXECUTIVE_BOARD_MEMBER", label: "Executive Board Member" },
  { value: "COMMUNICATIONS_OFFICER", label: "Communications Officer (Chapters/News/Events Only)" },
  { value: "DIRECTOR_OF_NATIONAL_CENTRAL_OPERATIONS", label: "Director of National Central Operations" },
];

const CHAPTER_ROLE_OPTIONS = [
  { value: "CHAPTER_PRESIDENT", label: "Chapter President" },
  { value: "VICE_PRESIDENT", label: "Vice President" },
  { value: "SECRETARY", label: "Secretary" },
  { value: "TREASURER", label: "Treasurer" },
  { value: "PROGRAMS_CURRICULUM_OFFICER", label: "Programs & Curriculum Officer" },
  { value: "RECRUITMENT_OUTREACH_OFFICER", label: "Recruitment & Outreach Officer" },
];

const CHAPTER_ROLE_VALUES = new Set(CHAPTER_ROLE_OPTIONS.map((r) => r.value));

export function UserForm({ chapters }: { chapters: { id: string; name: string }[] }) {
  const [state, formAction, pending] = useActionState(createStaffUser, initialState);
  const [role, setRole] = useState("");
  const isChapterRole = CHAPTER_ROLE_VALUES.has(role);

  if (state.status === "success") {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      {state.status === "error" && state.message && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">
          {state.message}
        </div>
      )}

      <FormField label="Name" name="name" error={state.fieldErrors?.name} />
      <FormField label="Email" name="email" type="email" error={state.fieldErrors?.email} />
      <FormField label="Temporary Password" name="password" type="password" error={state.fieldErrors?.password} />
      <div>
        <label htmlFor="role" className="text-sm font-medium text-neutral-800">
          Role <span className="text-brand-600">*</span>
        </label>
        <select
          id="role"
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        >
          <option value="" disabled>
            Select a role
          </option>
          <optgroup label="National">
            {NATIONAL_ROLE_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Chapter Leadership (resource library only)">
            {CHAPTER_ROLE_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </optgroup>
        </select>
        {state.fieldErrors?.role && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.role}</p>}
      </div>

      {isChapterRole && (
        <div>
          <label htmlFor="chapterId" className="text-sm font-medium text-neutral-800">
            Chapter <span className="text-brand-600">*</span>
          </label>
          <select
            id="chapterId"
            name="chapterId"
            required
            defaultValue=""
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="" disabled>
              Select a chapter
            </option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {state.fieldErrors?.chapterId && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.chapterId}</p>
          )}
        </div>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}
