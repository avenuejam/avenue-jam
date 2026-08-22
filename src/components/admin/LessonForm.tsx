"use client";

import { useActionState } from "react";
import type { Lesson } from "@prisma/client";
import { createLesson, type LessonFormState } from "@/lib/actions/lessons";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/Button";

const initialState: LessonFormState = { status: "idle" };

const UNIT_OPTIONS = [
  { value: "CIVIC_EDUCATION", label: "Civic Education" },
  { value: "HUMAN_RIGHTS_EDUCATION", label: "Human Rights Education" },
  { value: "LEGAL_RIGHTS_LITERACY", label: "Legal Rights Literacy" },
];

export function LessonForm({
  lesson,
  action = createLesson,
}: {
  lesson?: Lesson;
  action?: (prevState: LessonFormState, formData: FormData) => Promise<LessonFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && state.message && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="unit" className="text-sm font-medium text-neutral-800">
            Unit <span className="text-brand-600">*</span>
          </label>
          <select
            id="unit"
            name="unit"
            defaultValue={lesson?.unit ?? ""}
            required
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="" disabled>
              Select a unit
            </option>
            {UNIT_OPTIONS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <FormField
          label="Sort Order"
          name="sortOrder"
          type="number"
          required={false}
          defaultValue={lesson ? String(lesson.sortOrder) : "0"}
          error={state.fieldErrors?.sortOrder}
        />
        <FormField label="Title" name="title" defaultValue={lesson?.title} error={state.fieldErrors?.title} />
        <div>
          <label htmlFor="slug" className="text-sm font-medium text-neutral-800">
            Slug <span className="text-brand-600">*</span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={lesson?.slug}
            required
            placeholder="e.g. what-is-democracy"
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {state.fieldErrors?.slug && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.slug}</p>}
        </div>
      </div>

      <FormField
        label="Description"
        name="description"
        textarea
        defaultValue={lesson?.description}
        error={state.fieldErrors?.description}
      />

      <div>
        <label htmlFor="file" className="text-sm font-medium text-neutral-800">
          Lesson File (PDF) {!lesson && <span className="text-brand-600">*</span>}
        </label>
        {lesson && (
          <p className="mt-1 text-xs text-neutral-500">
            Current file: {lesson.fileName}. Choose a new file only to replace it.
          </p>
        )}
        <input
          id="file"
          name="file"
          type="file"
          accept=".pdf,.doc,.docx"
          required={!lesson}
          className="mt-2 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-800 hover:file:bg-brand-100"
        />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Saving..." : lesson ? "Save Changes" : "Upload Lesson"}
      </Button>
    </form>
  );
}
