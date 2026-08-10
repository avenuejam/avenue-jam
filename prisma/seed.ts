import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.newsArticle.deleteMany();

  const chapters = await Promise.all(
    [
      {
        slug: "lincoln-high-il",
        name: "AVENUE JAM at Lincoln High School",
        schoolOrOrg: "Lincoln High School",
        city: "Springfield",
        state: "IL",
        region: "Midwest",
        status: "ACTIVE" as const,
        president: "Maya Chen",
        officers: JSON.stringify([
          { name: "Diego Ramirez", role: "Vice President" },
          { name: "Aisha Bello", role: "Secretary" },
          { name: "Owen Park", role: "Treasurer" },
        ]),
        advisor: "Mr. Thomas Reyes",
        advisorEmail: "treyes@lincolnhs.edu",
        foundedYear: 2022,
        summary:
          "One of our founding chapters, running civic education workshops and a student-led mock legislature each spring.",
      },
      {
        slug: "westbrook-community-college-wa",
        name: "AVENUE JAM at Westbrook Community College",
        schoolOrOrg: "Westbrook Community College",
        city: "Tacoma",
        state: "WA",
        region: "West",
        status: "ACTIVE" as const,
        president: "Jordan Ellis",
        officers: JSON.stringify([
          { name: "Priya Nair", role: "Vice President" },
          { name: "Sam Okafor", role: "Events Coordinator" },
        ]),
        advisor: "Dr. Lauren Whitfield",
        advisorEmail: "lwhitfield@westbrookcc.edu",
        foundedYear: 2023,
        summary:
          "Focused on legal rights literacy for first-generation college students, including a free \"Know Your Rights\" clinic.",
      },
      {
        slug: "east-river-charter-ny",
        name: "AVENUE JAM at East River Charter School",
        schoolOrOrg: "East River Charter School",
        city: "Queens",
        state: "NY",
        region: "Northeast",
        status: "PENDING" as const,
        president: "Fatima Siddiqui",
        officers: JSON.stringify([{ name: "Marcus Lee", role: "Vice President" }]),
        advisor: "Ms. Angela Cho",
        advisorEmail: "acho@eastrivercharter.org",
        foundedYear: 2026,
        summary: "A newly submitted chapter application awaiting national review.",
      },
      {
        slug: "riverside-magnet-tx",
        name: "AVENUE JAM at Riverside Magnet High School",
        schoolOrOrg: "Riverside Magnet High School",
        city: "Austin",
        state: "TX",
        region: "South",
        status: "ACTIVE" as const,
        president: "Elena Vasquez",
        officers: JSON.stringify([
          { name: "Noah Kim", role: "Vice President" },
          { name: "Grace Adeyemi", role: "Secretary" },
        ]),
        advisor: "Mr. Daniel Foster",
        advisorEmail: "dfoster@riversidemagnet.edu",
        foundedYear: 2021,
        summary:
          "Our largest chapter, hosting an annual Human Rights Youth Summit that draws students from across the region.",
      },
    ].map((c) => prisma.chapter.create({ data: c })),
  );

  await prisma.event.createMany({
    data: [
      {
        slug: "national-youth-leadership-summit-2026",
        title: "National Youth Leadership Summit",
        scope: "NATIONAL",
        startsAt: new Date("2026-10-16T09:00:00Z"),
        endsAt: new Date("2026-10-18T17:00:00Z"),
        location: "Washington, D.C.",
        description:
          "Three days of workshops, panels, and civic simulations bringing together chapter leaders from across the country.",
        registerUrl: "#",
      },
      {
        slug: "midwest-regional-training-2026",
        title: "Midwest Regional Officer Training",
        scope: "REGIONAL",
        startsAt: new Date("2026-09-12T14:00:00Z"),
        endsAt: new Date("2026-09-12T18:00:00Z"),
        location: "Chicago, IL (virtual option available)",
        description:
          "Training for newly elected chapter officers across the Midwest region on governance, event planning, and reporting tools.",
        registerUrl: "#",
      },
      {
        slug: "know-your-rights-clinic-westbrook",
        title: "Know Your Rights Clinic",
        scope: "CHAPTER",
        startsAt: new Date("2026-09-05T18:00:00Z"),
        endsAt: new Date("2026-09-05T20:00:00Z"),
        location: "Westbrook Community College, Tacoma, WA",
        description:
          "A free community clinic led by chapter members covering tenant rights, employment rights, and how to access legal aid.",
        registerUrl: "#",
        chapterId: chapters[1].id,
      },
      {
        slug: "human-rights-youth-summit-riverside",
        title: "Human Rights Youth Summit",
        scope: "CHAPTER",
        startsAt: new Date("2026-11-07T09:00:00Z"),
        endsAt: new Date("2026-11-07T16:00:00Z"),
        location: "Riverside Magnet High School, Austin, TX",
        description:
          "An annual student-organized summit featuring guest speakers, workshops, and a youth advocacy showcase.",
        registerUrl: "#",
        chapterId: chapters[3].id,
      },
    ],
  });

  await prisma.newsArticle.createMany({
    data: [
      {
        slug: "avenue-jam-surpasses-50-chapters",
        title: "AVENUE JAM Surpasses 50 Active Chapters Nationwide",
        category: "Announcement",
        excerpt:
          "This spring, AVENUE JAM welcomed its 50th chartered chapter, marking a major milestone in our national growth.",
        body: "This spring, AVENUE JAM welcomed its 50th chartered chapter, marking a major milestone in our national growth. From a single founding chapter in 2021, the organization has expanded to serve students across four regions, delivering civic education, human rights education, and legal rights literacy programming to thousands of young people.\n\n\"Every new chapter represents a group of students who decided their community needed a stronger civic voice,\" said AVENUE JAM's Executive Director. \"We're proud to support them with national curriculum, training, and mentorship as they build local programming that fits their community.\"",
        publishedAt: new Date("2026-05-14T00:00:00Z"),
      },
      {
        slug: "2026-national-summit-registration-open",
        title: "Registration Now Open for the 2026 National Youth Leadership Summit",
        category: "News",
        excerpt:
          "Chapter leaders from across the country are invited to Washington, D.C. this October for three days of training and civic engagement.",
        body: "Registration is now open for the 2026 National Youth Leadership Summit, taking place October 16-18 in Washington, D.C. The summit brings together chapter presidents, officers, and advisors for workshops on civic organizing, legal literacy, and human rights advocacy, alongside networking sessions with national staff and board members.",
        publishedAt: new Date("2026-07-01T00:00:00Z"),
      },
      {
        slug: "student-spotlight-maya-chen",
        title: "Student Spotlight: How Maya Chen Built a Mock Legislature Program",
        category: "Success Story",
        excerpt:
          "Lincoln High School chapter president Maya Chen shares how her chapter's mock legislature became a model for chapters nationwide.",
        body: "When Maya Chen became chapter president at Lincoln High School, she wanted civic education to feel less like a lecture and more like practice. Working with her chapter's advisor and AVENUE JAM's Civic Education curriculum, she built a student-run mock legislature that now runs every spring, drawing participation from across the school.\n\nThe program has since been adapted into a national resource guide available to chapter leaders in the resource library.",
        publishedAt: new Date("2026-04-02T00:00:00Z"),
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
