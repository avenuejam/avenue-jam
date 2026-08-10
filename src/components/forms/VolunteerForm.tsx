"use client";

import { useActionState } from "react";
import { submitVolunteerApplication, type VolunteerState } from "@/lib/actions/volunteer";
import { FormField } from "./FormField";
import { Button } from "@/components/Button";

const initialState: VolunteerState = { status: "idle" };

export function VolunteerForm() {
  const [state, formAction, pending] = useActionState(submitVolunteerApplication, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-900">Application Received</h3>
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
        <FormField label="Name" name="name" error={state.fieldErrors?.name} />
        <FormField label="Email" name="email" type="email" error={state.fieldErrors?.email} />
        <FormField label="Phone" name="phone" required={false} error={state.fieldErrors?.phone} />
        <FormField label="City / State" name="location" error={state.fieldErrors?.location} />
      </div>
      <FormField
        label="Areas of interest"
        name="interests"
        textarea
        placeholder="e.g. chapter mentoring, event support, curriculum review"
        error={state.fieldErrors?.interests}
      />
      <FormField
        label="Availability"
        name="availability"
        textarea
        placeholder="Days/times you're generally available"
        error={state.fieldErrors?.availability}
      />
      <FormField
        label="Relevant experience"
        name="experience"
        textarea
        required={false}
        error={state.fieldErrors?.experience}
      />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
