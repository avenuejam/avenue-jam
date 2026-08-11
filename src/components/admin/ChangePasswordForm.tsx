"use client";

import { useActionState } from "react";
import { changePassword, type ChangePasswordState } from "@/lib/actions/account";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/Button";

const initialState: ChangePasswordState = { status: "idle" };

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, initialState);

  return (
    <form action={formAction} className="max-w-sm space-y-5">
      {state.status === "error" && state.message && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.message}
        </div>
      )}
      {state.status === "success" && state.message && (
        <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          {state.message}
        </div>
      )}

      <FormField
        label="Current Password"
        name="currentPassword"
        type="password"
        error={state.fieldErrors?.currentPassword}
      />
      <FormField label="New Password" name="newPassword" type="password" error={state.fieldErrors?.newPassword} />
      <FormField
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        error={state.fieldErrors?.confirmPassword}
      />

      <Button type="submit" disabled={pending}>
        {pending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
