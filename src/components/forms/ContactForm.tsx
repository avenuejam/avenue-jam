"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactState } from "@/lib/actions/contact";
import { FormField } from "./FormField";
import { Button } from "@/components/Button";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-900">Message Sent</h3>
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
      </div>
      <FormField label="Subject" name="subject" error={state.fieldErrors?.subject} />
      <FormField label="Message" name="message" textarea error={state.fieldErrors?.message} />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
