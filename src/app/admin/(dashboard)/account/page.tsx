import type { Metadata } from "next";
import { requirePortalSession } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/roleLabels";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export const metadata: Metadata = { title: "My Account" };

export default async function AccountPage() {
  const session = await requirePortalSession();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">My Account</h1>

      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-neutral-500">Name</dt>
          <dd className="text-neutral-800">{session.user.name}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Email</dt>
          <dd className="text-neutral-800">{session.user.email}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Role</dt>
          <dd className="text-neutral-800">{ROLE_LABELS[session.user.role] ?? session.user.role}</dd>
        </div>
      </dl>

      <h2 className="mt-10 text-lg font-semibold text-neutral-900">Change Password</h2>
      <div className="mt-4">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
