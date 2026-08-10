import { prisma } from "@/lib/prisma";

export function getChapters() {
  return prisma.chapter.findMany({ orderBy: { name: "asc" } });
}

export function getActiveChapters() {
  return prisma.chapter.findMany({
    where: { status: "ACTIVE" },
    orderBy: { name: "asc" },
  });
}

export function getChapterBySlug(slug: string) {
  return prisma.chapter.findUnique({
    where: { slug },
    include: { events: { orderBy: { startsAt: "asc" } } },
  });
}

export function parseOfficers(officers: string): { name: string; role: string }[] {
  try {
    return JSON.parse(officers);
  } catch {
    return [];
  }
}
