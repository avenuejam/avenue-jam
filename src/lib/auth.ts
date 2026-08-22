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
 * Everyone who can reach the national /admin portal. COMMUNICATIONS_OFFICER
 * is scoped to creating/editing public-facing content (Chapters, News,
 * Events, Resources) only — not applications, submissions, or user
 * management.
 */
export const CONTENT_ROLES: UserRole[] = [...ADMIN_ROLES, "COMMUNICATIONS_OFFICER"];

/** Who can create/deactivate staff accounts. */
export const USER_MANAGEMENT_ROLES: UserRole[] = ["NATIONAL_ADMINISTRATOR", "EXECUTIVE_DIRECTOR"];

/**
 * Chapter leadership: no /admin access at all, just the resource library,
 * scoped to their own chapter (via User.chapterId).
 */
export const CHAPTER_LEADERSHIP_ROLES: UserRole[] = [
  "CHAPTER_PRESIDENT",
  "VICE_PRESIDENT",
  "SECRETARY",
  "TREASURER",
  "PROGRAMS_CURRICULUM_OFFICER",
  "RECRUITMENT_OUTREACH_OFFICER",
];

/** Everyone who can view/download the resource library — national staff and chapter leadership alike. */
export const RESOURCE_LIBRARY_ROLES: UserRole[] = [...CONTENT_ROLES, ...CHAPTER_LEADERSHIP_ROLES];

async function requireRole(allowed: UserRole[], deniedRedirect = "/admin") {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  if (!allowed.includes(session.user.role)) redirect(deniedRedirect);
  return session;
}

/**
 * Layout-level gate for the national portal. Chapter-leadership roles are
 * never in CONTENT_ROLES, so they're bounced to /resources instead of
 * looping back into /admin's own guard.
 */
export function requirePortalSession() {
  return requireRole(CONTENT_ROLES, "/resources");
}

/** Applications review, raw form submissions. */
export function requireAdminSession() {
  return requireRole(ADMIN_ROLES);
}

/** Staff account management. */
export function requireUserManagementSession() {
  return requireRole(USER_MANAGEMENT_ROLES);
}

/** Resource library: national staff and chapter leadership. */
export function requireResourceLibrarySession() {
  return requireRole(RESOURCE_LIBRARY_ROLES, "/admin/login");
}
