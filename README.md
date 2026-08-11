# AVENUE JAM — Public Website + Admin Dashboard

Public-facing marketing site and internal admin dashboard for AVENUE JAM
CORPORATION, built with Next.js (App Router), TypeScript, Tailwind CSS, and
Prisma. Phase one shipped the public website. Phase two (this build) adds
real per-user authentication with roles, and turns `/admin` from a read-only
form dump into a working dashboard: chapter application review
(approve/decline), Chapter/News/Event CRUD, and staff account management.
The full resource library, member/chapter-president self-service portals,
and public event registration are still **not built yet** (see "What's
deferred" below).

## Requirements

This environment had no Node.js or package manager installed, so a portable
Node 20 was downloaded to `~/.local/opt/node` (not a system-wide install). If
your shell doesn't already have Node on `PATH`, prefix commands with:

```bash
export PATH="$HOME/.local/opt/node/bin:$PATH"
```

Or install Node normally (e.g. via [nvm](https://github.com/nvm-sh/nvm) or
[Homebrew](https://brew.sh)) and use that instead — nothing in the project
depends on the specific Node install location.

## Getting started

```bash
npm install
npm run db:push          # sync prisma/schema.prisma to the database in DATABASE_URL
npm run db:seed          # load sample chapters, news, and events (optional)
npm run db:seed-admin    # create the first admin login (needs SEED_ADMIN_* in .env)
npm run dev
```

Visit http://localhost:3000 for the public site, http://localhost:3000/admin
for the dashboard (redirects to `/admin/login`).

## Database

Uses **Postgres** (Neon in this project) via `DATABASE_URL` in `.env`. Set
`AUTH_SECRET` too (generate with `npx auth secret` or
`openssl rand -base64 33`) — Auth.js uses it to sign session tokens.

Forms that persist to the database (via Next.js Server Actions in
`src/lib/actions/`):

- Chapter applications (`/chapters/start`)
- Contact form (`/contact`)
- Volunteer applications (`/volunteer`)
- Partnership requests (`/partner`)
- Speaker requests (`/speakers`)

Chapters, news articles, and events are also DB-backed (see `prisma/seed.ts`
for sample data) and power the public chapter directory, chapter profile
pages, news list/detail pages, and the events calendar.

## Portal

`/admin` (branded "Portal" in the UI) is gated by real per-user login
(Auth.js v5, Credentials provider, JWT sessions — see `src/auth.ts`,
`src/auth.config.ts`, `src/proxy.ts`). No public signup: accounts are
created by a National Administrator or Executive Director from
`/admin/users`, or bootstrapped via `npm run db:seed-admin` for the very
first account. The portal overview page greets whoever's signed in by name
and role, with a time-of-day "Good morning/afternoon/evening" header
(`src/components/admin/PortalGreeting.tsx`).

`UserRole` (`prisma/schema.prisma`) intentionally holds **only** the five
roles eligible for this national portal — every other role in the org's
structure (regional and chapter leadership, see "Planned dashboards" below)
has no portal of its own yet and isn't in the enum. The five split into
three access tiers in `src/lib/auth.ts`:

- **`ADMIN_ROLES`** — National Administrator, Executive Director, Executive
  Board Member, Director of National Central Operations. Can use
  Applications, Submissions, and all content sections.
- **`CONTENT_ROLES`** (`ADMIN_ROLES` plus Communications Officer) — can
  create/edit Chapters, News, and Events (the public-facing content), but
  can't reach Applications, Submissions, or Users. This is the broadest
  tier that can reach `/admin` at all — it's the layout-level gate.
- **`USER_MANAGEMENT_ROLES`** — National Administrator and Executive
  Director only, for creating/deactivating staff accounts at `/admin/users`.

What's in the portal:

- **Applications** (`/admin/applications`, `ADMIN_ROLES`) — review chapter
  applications; approving creates a `Chapter` record (status `PENDING`) from
  the application's details and records who reviewed it.
- **Chapters** / **News** / **Events** (`/admin/chapters`, `/admin/news`,
  `/admin/events`, `CONTENT_ROLES`) — full CRUD, backing the public chapter
  directory, news list, and events calendar. A chapter's status change
  (e.g. to `ACTIVE`) revalidates the chapter directory and homepage
  immediately.
- **Submissions** (`/admin/submissions`, `ADMIN_ROLES`) — the original
  read-only dump of contact/volunteer/partnership/speaker/interview form
  submissions.
- **Users** (`/admin/users`, `USER_MANAGEMENT_ROLES`) — create staff
  accounts, deactivate/reactivate existing ones.

Server Actions re-check the session (`requirePortalSession()` /
`requireAdminSession()` / `requireUserManagementSession()` in
`src/lib/auth.ts`) independently of the
layout guard, since actions can be invoked directly.

### Planned dashboards (not built yet)

Two more role groups exist in the org but don't have portal access or a
dashboard of their own yet. Building either is a separate `UserRole`
addition plus a new gated route tree (following the `/admin` pattern above)
— do this once the corresponding dashboard is actually being built, not
before.

**Regional leadership** — no dashboard scoped yet:
- Special Regional Coordinator
- State Lead

**Chapter leadership** — needs its own per-chapter-scoped dashboard (a
member of this group should only see/manage their own chapter, unlike the
national portal):
- **Chapter President** — Overall chapter leader; represents the chapter and
  oversees operations.
- **Vice President** — Supports the President and coordinates chapter
  operations/programming.
- **Secretary** — Records meetings, maintains chapter records, handles
  administrative documentation.
- **Treasurer** — Handles chapter finances, fundraising records, budgets,
  and financial reporting.
- **Programs & Curriculum Officer** — Leads educational programming,
  curriculum implementation, and events.
- **Recruitment & Outreach Officer** — Handles member recruitment,
  school/community outreach, partnerships, and chapter promotion.

## Donations

`/donate` renders a placeholder in place of the Zeffy embed
(`src/components/DonateEmbed.tsx`). Once AVENUE JAM's Zeffy account and
donation form exist, set `ZEFFY_FORM_URL` in `src/lib/constants.ts` to the
real embed URL and the live form will render automatically — no other code
changes needed.

## What's deferred to the next phase

Phase one (public website) and phase two (auth/RBAC + admin dashboard) are
done. Still not built:

- National Resource Library (permissioned document library with
  categories/tags/search)
- Internal employee & leadership directory (the public `/about/directory`
  page is a simplified, public-safe version of this)
- Chapter/member self-service portals (login for Chapter Presidents/Officers,
  Members, Educators/Advisors — these roles exist in `UserRole` but have no
  `/admin` access or portal of their own yet)
- Public event registration (events have an optional external
  `registerUrl`; no built-in RSVP/ticketing)
- Reports/analytics in the admin dashboard

## Real content vs. sample data

Mission copy, the legal footer disclaimer, contact info (email/phone/Instagram),
partner logos (Amnesty International, Virtutem Populo, City of Miami, Gulliver
Prep), the Executive Director/Executive Board names and org structure
(Geographic Leadership, Special Districts, NCOD), the brand color (`#4F8756`,
see `src/app/globals.css`), and the seal logo (`public/brand/`) are all pulled
from the real avenuejam.com and real assets — not placeholders.

**Chapters, news, and events are intentionally empty**, not sample data —
AVENUE JAM hasn't chartered a chapter or published either yet. Every page
that lists them (homepage, `/chapters`, `/news`, `/events`) has a real empty
state instead of placeholder content. `prisma/seed.ts` documents the exact
record shape for each; uncomment and fill one in (or insert directly into the
database) once real chapters, news, or events exist — no other code changes
needed.

Still placeholder/sample:
- Chapter directory entries, news articles, and events (`prisma/seed.ts`) —
  fictional examples showing the data model works, not real chapters.
- Leadership headshots — real photos exist on avenuejam.com's Google Site but
  are protected by Google's image server and couldn't be downloaded
  automatically. The Leadership page shows initials-avatar placeholders until
  real photos are supplied (drop them in `public/team/` and wire them into
  `src/app/about/leadership/page.tsx`'s `LeaderCard` calls).
- Zeffy donation embed — no real Zeffy form exists yet; see "Donations" above.

## Known limitation to address before going live

Chapter application file uploads are currently written to
`public/uploads/chapter-applications/<id>/` on local disk, which means
uploaded files are served from a public, unauthenticated path (obscured by a
random ID, but not access-controlled). Admin authentication now exists, but
the upload path itself hasn't been moved behind it yet — **should move to
private cloud storage (e.g. S3) with access control gated by
`requireAdminSession()`.**

## Project structure

```
src/
  app/
    admin/(dashboard)/  Guarded admin routes (layout.tsx calls requireAdminSession())
    admin/login/        Unguarded login route
    api/auth/[...nextauth]/  Auth.js route handler
    ...                 Public route segments (App Router)
  components/     Shared UI (Header, Footer, Button, forms, admin/, etc.)
  lib/
    actions/      Server Actions for form submissions and admin mutations
    data/         Prisma query helpers used by pages
    auth.ts       ADMIN_ROLES + requireAdminSession()/requireNationalAdminSession()
    constants.ts  Org copy, nav structure, Zeffy URL
    prisma.ts     Prisma Client singleton
  auth.ts         Auth.js config (Node runtime: Credentials provider, callbacks)
  auth.config.ts  Auth.js edge-safe config, used by proxy.ts
  proxy.ts        Thin session gate on /admin/*
prisma/
  schema.prisma     Data model (Postgres/Neon)
  seed.ts           Sample chapters, news, events
  seed-admin.ts     Bootstraps the first admin login
```
