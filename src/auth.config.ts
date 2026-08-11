import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe config used by src/proxy.ts. No Prisma, no bcrypt, no providers
 * with a real `authorize()` — those live in src/auth.ts (Node runtime only).
 * This file only decides "is there a session at all," never role logic.
 */
export default {
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
