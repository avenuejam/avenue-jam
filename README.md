# AVENUE JAM — Public Website

Public-facing marketing site for AVENUE JAM CORPORATION, built with Next.js (App
Router), TypeScript, Tailwind CSS, and Prisma. This is phase one of the full
platform spec — the **public website only**. Authentication, role-based
permissions, the internal resource library, the employee/leadership admin
directory, the admin dashboard, and the chapter-approval workflow UI are
intentionally **not built yet** (see "What's deferred" below).

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
npm run db:push    # create the local SQLite database from prisma/schema.prisma
npm run db:seed     # load sample chapters, news, and events
npm run dev
```

Visit http://localhost:3000.

## Database

Local development uses **SQLite** (a single file at `prisma/dev.db`) so the
app runs with zero external services. The schema in `prisma/schema.prisma` is
Postgres-compatible as written — to move to Postgres for staging/production:

1. Change `provider = "sqlite"` to `provider = "postgresql"` in
   `prisma/schema.prisma`.
2. Set `DATABASE_URL` in `.env` to a `postgres://` connection string.
3. Run `npx prisma db push` (or set up migrations with `prisma migrate`).

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

## Donations

`/donate` renders a placeholder in place of the Zeffy embed
(`src/components/DonateEmbed.tsx`). Once AVENUE JAM's Zeffy account and
donation form exist, set `ZEFFY_FORM_URL` in `src/lib/constants.ts` to the
real embed URL and the live form will render automatically — no other code
changes needed.

## What's deferred to the next phase

Per the original spec, this build intentionally covers the **public website
only**. Not yet built:

- Authentication and role-based permissions (National Administrator,
  Executive Director, National Staff, Regional Directors, Chapter
  Presidents/Officers, Members, Educators/Advisors)
- Admin dashboard (user/chapter/resource/event management, application
  review queue, website content management, reports)
- National Resource Library (permissioned document library with
  categories/tags/search)
- Internal employee & leadership directory (the public `/about/directory`
  page is a simplified, public-safe version of this)
- Chapter application **approval workflow UI** (applications already save to
  the database with a `SUBMITTED` status — an admin view to review/approve/
  decline them is the next piece to build)
- Event registration and calendar management
- News CMS (an editable admin UI for publishing articles)

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
random ID, but not access-controlled). This is fine for local development but
**should move to private cloud storage (e.g. S3) with access control** once
the admin authentication system exists.

## Project structure

```
src/
  app/            Route segments (App Router)
  components/     Shared UI (Header, Footer, Button, forms, etc.)
  lib/
    actions/      Server Actions for form submissions
    data/         Prisma query helpers used by pages
    constants.ts  Org copy, nav structure, Zeffy URL
    prisma.ts     Prisma Client singleton
prisma/
  schema.prisma   Data model (SQLite locally, Postgres-ready)
  seed.ts         Sample chapters, news, events
```
