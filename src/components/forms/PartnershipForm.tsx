"use client";

import { useActionState } from "react";
import { submitPartnershipRequest, type PartnershipState } from "@/lib/actions/partnership";
import { FormField } from "./FormField";
import { Button } from "@/components/Button";

const initialState: PartnershipState = { status: "idle" };

const PARTNERSHIP_TYPES = [
  "School District",
  "University",
  "Legal Aid Organization",
  "Civic Foundation",
  "Corporate Sponsor",
  "Other",
];

export function PartnershipForm() {
  const [state, formAction, pending] = useActionState(submitPartnershipRequest, initialState);

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
        <FormField label="Organization Name" name="organizationName" error={state.fieldErrors?.organizationName} />
        <FormField label="Contact Name" name="contactName" error={state.fieldErrors?.contactName} />
        <FormField label="Email" name="email" type="email" error={state.fieldErrors?.email} />
        <FormField label="Phone" name="phone" required={false} error={state.fieldErrors?.phone} />
      </div>
      <FormField
        label="Partnership Type"
        name="partnershipType"
        options={PARTNERSHIP_TYPES}
        error={state.fieldErrors?.partnershipType}
      />
      <FormField
        label="Tell us about the partnership you have in mind"
        name="message"
        textarea
        error={state.fieldErrors?.message}
      />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
