import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { auth } from "@/auth";

/**
 * Full operations tier: applications review, raw form submissions, plus
 * everything CONTENT_ROLES can do.
 */
export const ADMIN_ROLES: UserRole[] = [
  "NATIONAL_ADMINISTRATOR",
  "EXECUTIVE_DIRECTOR",
  "EXECUTIVE_BOARD_MEMBER",
  "DIRECTOR_OF_NATIONAL_CENTRAL_OPERATIONS",
];

/**
 * Everyone who can reach the portal at all. COMMUNICATIONS_OFFICER is
 * scoped to creating/editing public-facing content (Chapters, News, Events)
 * only — not applications, submissions, or user management.
 */
export const CONTENT_ROLES: UserRole[] = [...ADMIN_ROLES, "COMMUNICATIONS_OFFICER"];

/** Who can create/deactivate staff accounts. */
export const USER_MANAGEMENT_ROLES: UserRole[] = ["NATIONAL_ADMINISTRATOR", "EXECUTIVE_DIRECTOR"];

async function requireRole(allowed: UserRole[]) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  if (!allowed.includes(session.user.role)) redirect("/admin");
  return session;
}

/** Layout-level gate: can the user reach the portal at all? */
export function requirePortalSession() {
  return requireRole(CONTENT_ROLES);
}

/** Applications review, raw form submissions. */
export function requireAdminSession() {
  return requireRole(ADMIN_ROLES);
}

/** Staff account management. */
export function requireUserManagementSession() {
  return requireRole(USER_MANAGEMENT_ROLES);
}
