import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * This seed intentionally creates no chapters, news, or events — AVENUE JAM
 * hasn't chartered a chapter or published either yet. The commented examples
 * below show the exact shape Prisma expects; uncomment and fill one in (or
 * add a real record through the database directly) once real data exists.
 * The UI on every page already handles an empty database gracefully.
 */
async function main() {
  await prisma.event.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.newsArticle.deleteMany();

  // await prisma.chapter.create({
  //   data: {
  //     slug: "example-school-st",               // unique, used in the chapter's URL
  //     name: "AVENUE JAM at Example School",
  //     schoolOrOrg: "Example School",
  //     city: "City",
  //     state: "ST",
  //     region: "Region",                         // e.g. "Northeast", "South", "Midwest", "West"
  //     status: "ACTIVE",                          // "ACTIVE" | "PENDING" | "INACTIVE"
  //     president: "Full Name",
  //     officers: JSON.stringify([
  //       { name: "Full Name", role: "Vice President" },
  //       { name: "Full Name", role: "Secretary" },
  //     ]),
  //     advisor: "Advisor Full Name",
  //     advisorEmail: "advisor@school.edu",
  //     foundedYear: 2026,
  //     summary: "One or two sentences describing the chapter.",
  //   },
  // });

  // await prisma.newsArticle.create({
  //   data: {
  //     slug: "headline-as-a-slug",
  //     title: "Headline",
  //     category: "News",                          // "News" | "Announcement" | "Press Release" | "Success Story"
  //     excerpt: "One-sentence summary shown in list views.",
  //     body: "Full article body. Separate paragraphs with a blank line.",
  //     publishedAt: new Date("2026-01-01"),
  //   },
  // });

  // await prisma.event.create({
  //   data: {
  //     slug: "event-title-as-a-slug",
  //     title: "Event Title",
  //     scope: "NATIONAL",                         // "NATIONAL" | "REGIONAL" | "CHAPTER"
  //     startsAt: new Date("2026-01-01T18:00:00Z"),
  //     endsAt: new Date("2026-01-01T20:00:00Z"),
  //     location: "City, ST",
  //     description: "What the event is and who it's for.",
  //     registerUrl: "#",                          // link to a registration form, or omit
  //     // chapterId: "...",                       // only if this is a CHAPTER-scope event
  //   },
  // });

  console.log("Database cleared. No chapters, news, or events exist yet — see prisma/seed.ts for the record format when you're ready to add real ones.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
