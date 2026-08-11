"use client";

import { useActionState } from "react";
import type { Chapter, Event } from "@prisma/client";
import { createEvent, type EventFormState } from "@/lib/actions/events";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/Button";

const initialState: EventFormState = { status: "idle" };

function toDateTimeInputValue(date?: Date | null) {
  if (!date) return undefined;
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}

export function EventForm({
  event,
  chapters,
  action = createEvent,
}: {
  event?: Event;
  chapters: Chapter[];
  action?: (prevState: EventFormState, formData: FormData) => Promise<EventFormState>;
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
        <FormField label="Title" name="title" defaultValue={event?.title} error={state.fieldErrors?.title} />
        <div>
          <label htmlFor="slug" className="text-sm font-medium text-neutral-800">
            Slug <span className="text-brand-600">*</span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={event?.slug}
            required
            placeholder="e.g. spring-summit-2026"
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {state.fieldErrors?.slug && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.slug}</p>}
        </div>
        <FormField
          label="Scope"
          name="scope"
          options={["NATIONAL", "REGIONAL", "CHAPTER"]}
          defaultValue={event?.scope}
          error={state.fieldErrors?.scope}
        />
        <div>
          <label htmlFor="chapterId" className="text-sm font-medium text-neutral-800">
            Chapter
          </label>
          <select
            id="chapterId"
            name="chapterId"
            defaultValue={event?.chapterId ?? ""}
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">None (national/regional event)</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <FormField
          label="Starts At"
          name="startsAt"
          type="datetime-local"
          defaultValue={toDateTimeInputValue(event?.startsAt)}
          error={state.fieldErrors?.startsAt}
        />
        <FormField
          label="Ends At"
          name="endsAt"
          type="datetime-local"
          required={false}
          defaultValue={toDateTimeInputValue(event?.endsAt)}
          error={state.fieldErrors?.endsAt}
        />
        <FormField label="Location" name="location" defaultValue={event?.location} error={state.fieldErrors?.location} />
        <FormField
          label="Registration URL"
          name="registerUrl"
          required={false}
          defaultValue={event?.registerUrl ?? undefined}
          error={state.fieldErrors?.registerUrl}
        />
      </div>

      <FormField
        label="Description"
        name="description"
        textarea
        defaultValue={event?.description}
        error={state.fieldErrors?.description}
      />

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Saving..." : event ? "Save Changes" : "Create Event"}
      </Button>
    </form>
  );
}
