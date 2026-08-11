import type { Metadata } from "next";
import type { ReactNode } from "react";
import { requirePortalSession, ADMIN_ROLES, USER_MANAGEMENT_ROLES } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Portal",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requirePortalSession();

  return (
    <div>
      <AdminNav
        userName={session.user.name ?? session.user.email ?? "Staff"}
        canManageOperations={ADMIN_ROLES.includes(session.user.role)}
        canManageUsers={USER_MANAGEMENT_ROLES.includes(session.user.role)}
      />
      {children}
    </div>
  );
}
