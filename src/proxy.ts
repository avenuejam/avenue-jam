import NextAuth from "next-auth";
import authConfig from "@/auth.config";

/**
 * Thin, edge-safe gate on /admin/*: redirects to /admin/login when there's
 * no session at all. Built from auth.config.ts only (no Prisma/bcrypt in
 * this bundle). The real role check (which roles can actually use /admin)
 * happens in src/lib/auth.ts's requireAdminSession(), called from the admin
 * layout and from every mutating Server Action.
 */
const { auth } = NextAuth(authConfig);

export const proxy = auth;

export const config = {
  matcher: ["/admin/((?!login).*)"],
};
