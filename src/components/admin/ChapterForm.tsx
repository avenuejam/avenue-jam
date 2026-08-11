"use client";

import { useActionState } from "react";
import type { Chapter } from "@prisma/client";
import { createChapter, type ChapterFormState } from "@/lib/actions/chapters";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/Button";

const initialState: ChapterFormState = { status: "idle" };

export function ChapterForm({
  chapter,
  action = createChapter,
}: {
  chapter?: Chapter;
  action?: (prevState: ChapterFormState, formData: FormData) => Promise<ChapterFormState>;
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
          <label htmlFor="name" className="text-sm font-medium text-neutral-800">
            Chapter Name <span className="text-brand-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            defaultValue={chapter?.name}
            required
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {state.fieldErrors?.name && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="slug" className="text-sm font-medium text-neutral-800">
            Slug <span className="text-brand-600">*</span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={chapter?.slug}
            required
            placeholder="e.g. gulliver-prep"
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {state.fieldErrors?.slug && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.slug}</p>}
        </div>
        <FormField
          label="School / Organization"
          name="schoolOrOrg"
          defaultValue={chapter?.schoolOrOrg}
          error={state.fieldErrors?.schoolOrOrg}
        />
        <div>
          <label htmlFor="status" className="text-sm font-medium text-neutral-800">
            Status <span className="text-brand-600">*</span>
          </label>
          <select
            id="status"
            name="status"
            defaultValue={chapter?.status ?? "PENDING"}
            required
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="PENDING">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <FormField label="City" name="city" defaultValue={chapter?.city} error={state.fieldErrors?.city} />
        <FormField
          label="State"
          name="state"
          defaultValue={chapter?.state}
          error={state.fieldErrors?.state}
          placeholder="e.g. CA"
        />
        <FormField label="Region" name="region" defaultValue={chapter?.region} error={state.fieldErrors?.region} />
        <FormField
          label="Founded Year"
          name="foundedYear"
          type="number"
          required={false}
          defaultValue={chapter?.foundedYear ? String(chapter.foundedYear) : undefined}
          error={state.fieldErrors?.foundedYear}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="President"
          name="president"
          defaultValue={chapter?.president}
          error={state.fieldErrors?.president}
        />
        <FormField label="Advisor" name="advisor" defaultValue={chapter?.advisor} error={state.fieldErrors?.advisor} />
        <FormField
          label="Advisor Email"
          name="advisorEmail"
          type="email"
          defaultValue={chapter?.advisorEmail}
          error={state.fieldErrors?.advisorEmail}
        />
      </div>

      <div>
        <label htmlFor="officers" className="text-sm font-medium text-neutral-800">
          Officers (JSON)
        </label>
        <p className="mt-1 text-xs text-neutral-500">
          Array of {"{name, role}"} objects, e.g. [{"{"}&quot;name&quot;: &quot;Jane Doe&quot;, &quot;role&quot;:
          &quot;Vice President&quot;{"}"}]
        </p>
        <textarea
          id="officers"
          name="officers"
          rows={3}
          defaultValue={chapter?.officers ?? "[]"}
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 font-mono text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {state.fieldErrors?.officers && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.officers}</p>}
      </div>

      <FormField
        label="Summary"
        name="summary"
        textarea
        defaultValue={chapter?.summary}
        error={state.fieldErrors?.summary}
      />

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Saving..." : chapter ? "Save Changes" : "Create Chapter"}
      </Button>
    </form>
  );
}
