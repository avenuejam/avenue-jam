"use client";

import { useActionState } from "react";
import { createStaffUser, type UserFormState } from "@/lib/actions/users";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/Button";

const initialState: UserFormState = { status: "idle" };

const ROLE_OPTIONS = [
  { value: "NATIONAL_ADMINISTRATOR", label: "National Administrator" },
  { value: "EXECUTIVE_DIRECTOR", label: "Executive Director" },
  { value: "NATIONAL_STAFF", label: "National Staff" },
  { value: "REGIONAL_DIRECTOR", label: "Regional Director" },
  { value: "EXECUTIVE_BOARD_MEMBER", label: "Executive Board Member" },
  { value: "COMMUNICATIONS_OFFICER", label: "Communications Officer (Chapters/News/Events only)" },
];

export function UserForm() {
  const [state, formAction, pending] = useActionState(createStaffUser, initialState);

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
          defaultValue=""
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        >
          <option value="" disabled>
            Select a role
          </option>
          {ROLE_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.role && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.role}</p>}
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}
