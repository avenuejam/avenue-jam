"use client";

import { useActionState } from "react";
import { submitInterviewRequest, type InterviewRequestState } from "@/lib/actions/interview";
import { FormField } from "./FormField";
import { Button } from "@/components/Button";
import { OPEN_POSITIONS } from "@/lib/constants";

const initialState: InterviewRequestState = { status: "idle" };

export function InterviewRequestForm() {
  const [state, formAction, pending] = useActionState(submitInterviewRequest, initialState);

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
        <FormField label="Name" name="name" error={state.fieldErrors?.name} />
        <FormField label="Email" name="email" type="email" error={state.fieldErrors?.email} />
        <FormField label="Position of Interest" name="position" options={OPEN_POSITIONS} error={state.fieldErrors?.position} />
        <FormField label="Location" name="location" required={false} placeholder="City, State" error={state.fieldErrors?.location} />
      </div>
      <FormField
        label="Tell us about your interest and relevant experience"
        name="experience"
        textarea
        error={state.fieldErrors?.experience}
      />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting..." : "Request an Interview"}
      </Button>
    </form>
  );
}
