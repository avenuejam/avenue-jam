import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { requireUserManagementSession } from "@/lib/auth";
import { setStaffUserActive } from "@/lib/actions/users";
import { getChapters } from "@/lib/data/chapters";
import { Table } from "@/components/admin/Table";
import { UserForm } from "@/components/admin/UserForm";
import { ROLE_LABELS } from "@/lib/roleLabels";

export const metadata: Metadata = { title: "Staff Users" };

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  await requireUserManagementSession();
  const [users, chapters] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, include: { chapter: true } }),
    getChapters(),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">Staff Users</h1>
      <p className="mt-1 text-sm text-neutral-500">
        National Administrator and Executive Director only. Deactivating a user blocks new sign-ins; an existing
        session expires on its own.
      </p>

      <div className="mt-6">
        <Table
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "chapter", label: "Chapter" },
            { key: "active", label: "Status" },
            { key: "actions", label: "" },
          ]}
          rows={users.map((u) => ({
            name: u.name,
            email: u.email,
            role: ROLE_LABELS[u.role] ?? u.role,
            chapter: u.chapter?.name ?? "—",
            active: u.active ? "Active" : "Deactivated",
            actions: (
              <form action={setStaffUserActive.bind(null, u.id, !u.active)}>
                <button type="submit" className="text-brand-700 hover:underline">
                  {u.active ? "Deactivate" : "Reactivate"}
                </button>
              </form>
            ),
          }))}
        />
      </div>

      <h2 className="mt-12 text-lg font-semibold text-neutral-900">Create Staff Account</h2>
      <div className="mt-4">
        <UserForm chapters={chapters} />
      </div>
    </div>
  );
}
