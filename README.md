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
`openssl rand -base64 33`) — Auth.js uses it to sign session tokens. Set
`BLOB_READ_WRITE_TOKEN` (Vercel dashboard → Storage → Blob) for the
resource library's file uploads/downloads to work — see "Resource Library"
below.

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

`UserRole` (`prisma/schema.prisma`) holds two groups: five national portal
roles, and six chapter-leadership roles (resource-library access only — see
"Resource Library" below). A third group, regional leadership, is
documented but not yet in the enum — see "Planned dashboards" below. The
five national roles split into three access tiers in `src/lib/auth.ts`:

- **`ADMIN_ROLES`** — National Administrator, Executive Director, Executive
  Board Member, Director of National Central Operations. Can use
  Applications, Submissions, and all content sections.
- **`CONTENT_ROLES`** (`ADMIN_ROLES` plus Communications Officer) — can
  create/edit Chapters, News, Events, and Resources (the public-facing
  content), but can't reach Applications, Submissions, or Users. This is
  the broadest tier that can reach `/admin` at all — it's the layout-level
  gate.
- **`USER_MANAGEMENT_ROLES`** — National Administrator and Executive
  Director only, for creating/deactivating staff accounts at `/admin/users`.

What's in the portal:

- **Applications** (`/admin/applications`, `ADMIN_ROLES`) — review chapter
  applications; approving creates a `Chapter` record (status `PENDING`) from
  the application's details and records who reviewed it.
- **Chapters** / **News** / **Events** / **Resources** (`/admin/chapters`,
  `/admin/news`, `/admin/events`, `/admin/resources`, `CONTENT_ROLES`) —
  full CRUD, backing the public chapter directory, news list, events
  calendar, and the resource library (see below). A chapter's status change
  (e.g. to `ACTIVE`) revalidates the chapter directory and homepage
  immediately. The Chapters list is sorted by a fixed region order (states,
  then special regions — see `REGION_ORDER` in
  `src/app/admin/(dashboard)/chapters/page.tsx`), not alphabetically.
- **Submissions** (`/admin/submissions`, `ADMIN_ROLES`) — the original
  read-only dump of contact/volunteer/partnership/speaker/interview form
  submissions.
- **Users** (`/admin/users`, `USER_MANAGEMENT_ROLES`) — create staff
  accounts (national or chapter-leadership — the latter also require
  picking a `Chapter`), deactivate/reactivate existing ones.

Server Actions re-check the session (`requirePortalSession()` /
`requireAdminSession()` / `requireUserManagementSession()` /
`requireResourceLibrarySession()` in `src/lib/auth.ts`) independently of
the layout guard, since actions can be invoked directly.

## Resource Library

Curriculum lessons (PDFs), organized into the three program units (Civic
Education, Human Rights Education, Legal Rights Literacy —
`CurriculumUnit` in `prisma/schema.prisma`), viewable/downloadable by
national staff and chapter leadership alike.

- **Managing lessons** — `/admin/resources`, `CONTENT_ROLES`. Uploads go to
  Vercel Blob (`@vercel/blob`, private access) via `src/lib/actions/lessons.ts`.
- **Reading the library** — `/resources`, gated by
  `requireResourceLibrarySession()` (`RESOURCE_LIBRARY_ROLES` =
  `CONTENT_ROLES` + the six chapter-leadership roles). Renders the three
  units as a `<details>` accordion, each listing its lessons with **View**
  (opens inline) and **Download** actions.
- **The actual access-control boundary** is
  `src/app/api/resources/[id]/route.ts`: `Lesson.fileUrl` (the private Blob
  URL) never reaches the client. This route checks the session, fetches
  the blob server-side via `@vercel/blob`'s `get()` (authenticated with
  `BLOB_READ_WRITE_TOKEN`), and streams it back — a copied link still
  requires a valid resource-library session, and the blob itself can't be
  read without the token even if the URL leaked.
- Requires `BLOB_READ_WRITE_TOKEN` (Vercel dashboard → Storage → create a
  **Private** Blob store, check "Add a read-write token env var") in `.env`
  locally and in Vercel's Environment Variables for production.

**Chapter leadership accounts**: created the same way as national staff, at
`/admin/users` (National Administrator/Executive Director only) — picking
one of the six chapter-leadership roles reveals a required **Chapter**
picker, setting `User.chapterId`. These accounts sign in at **`/chapter-login`**
(a separate page from the national `/admin/login`, though both use the same
underlying Credentials auth) and land on `/resources` directly — they never
see the national `/admin` dashboard shell.
`requirePortalSession()`'s denied-redirect sends them to `/resources`
instead of looping back into `/admin`'s own guard.

### Planned dashboards (not built yet)

**Regional leadership** — no `UserRole` values, no portal yet. Per the
user, these sign in through the same **Staff Login** (`/admin/login`) as
national roles — not a separate page like chapter leadership — but should
land on a different, region-scoped interface rather than the national
Overview once built. Real regions (not yet modeled anywhere — `Chapter.region`
is free text, no separate `Region` entity):
- **State Lead** — Florida State, New York State, Texas State
- **Special Regional Coordinator** — New York City SR, Long Island SR,
  Nashville SR, Houston SR, Dallas-Fort Worth SR, Austin SR, Miami-Dade SR,
  Broward SR

What that region-scoped interface should actually contain (which chapters/
applications/data a regional leader sees or manages) hasn't been specified
yet — needs a scoping conversation before building, same as this phase did
for the resource library.

**Chapter leadership** — done, see "Resource Library" above. The six
roles (Chapter President, Vice President, Secretary, Treasurer, Programs &
Curriculum Officer, Recruitment & Outreach Officer) only get resource-library
access for now — no per-chapter management dashboard (their own chapter's
events, officers, etc.) yet.

## Donations

Live. `ZEFFY_FORM_URL` in `src/lib/constants.ts` points at AVENUE JAM's real
Zeffy form, which flips `DONATIONS_LIVE` on automatically — every "Donate"
button/link sitewide, and the real embedded form on `/donate`
(`src/components/DonateEmbed.tsx`), render for real. The embed uses Zeffy's
auto-resizing JS widget, with a plain-iframe fallback if that script fails
to load. To point at a different form, just change `ZEFFY_FORM_URL` —
nothing else needs to change.

## What's deferred to the next phase

Phase one (public website), phase two (auth/RBAC + admin dashboard), and
the resource library + chapter-leadership access are done. Still not built:

- Regional leadership portal (see "Planned dashboards" above — no
  `UserRole` values yet, and what the interface should actually show is
  still unspecified)
- Chapter leadership's own management dashboard (their chapter's events,
  officers, etc.) — they currently only get resource-library access
- National Resource Library search/tags (currently just grouped by unit,
  no search)
- Internal employee & leadership directory (the public `/about/directory`
  page is a simplified, public-safe version of this)
- Public event registration (events have an optional external
  `registerUrl`; no built-in RSVP/ticketing)
- Reports/analytics in the admin dashboard
- Chapter application file uploads still on public disk — see "Known
  limitation" below; same fix (private storage + authenticated route) as
  the resource library now uses would apply here too

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

Leadership headshots are real photos, stored in `public/team/` and wired via
the optional `photo` field on each entry in `PEOPLE` (`src/lib/constants.ts`).
Anyone without a `photo` set falls back to an initials avatar automatically
(both `LeaderCard` on the Leadership page and `EmployeeDirectory` handle
this) — add a photo the same way for any future leader.

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
