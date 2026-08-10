"use client";

import { useActionState } from "react";
import { submitSpeakerRequest, type SpeakerState } from "@/lib/actions/speaker";
import { FormField } from "./FormField";
import { Button } from "@/components/Button";

const initialState: SpeakerState = { status: "idle" };

const EVENT_FORMATS = ["In-Person", "Virtual", "Hybrid"];

export function SpeakerForm() {
  const [state, formAction, pending] = useActionState(submitSpeakerRequest, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-900">Request Received</h3>
        <p className="mt-2 text-green-800">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && state.message && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.message}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Your Name" name="requesterName" error={state.fieldErrors?.requesterName} />
        <FormField label="Email" name="email" type="email" error={state.fieldErrors?.email} />
        <FormField label="Organization" name="organization" error={state.fieldErrors?.organization} />
        <FormField label="Event Date" name="eventDate" type="date" error={state.fieldErrors?.eventDate} />
        <FormField label="Event Format" name="eventFormat" options={EVENT_FORMATS} error={state.fieldErrors?.eventFormat} />
        <FormField label="Expected Audience" name="audience" placeholder="e.g. 150 high school students" error={state.fieldErrors?.audience} />
      </div>
      <FormField label="Requested Topic" name="topic" error={state.fieldErrors?.topic} />
      <FormField label="Additional details" name="message" textarea required={false} error={state.fieldErrors?.message} />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting..." : "Submit Speaker Request"}
      </Button>
    </form>
  );
}
