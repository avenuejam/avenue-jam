import { prisma } from "@/lib/prisma";

export function getUpcomingEvents(limit?: number) {
  return prisma.event.findMany({
    where: { startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
    take: limit,
    include: { chapter: true },
  });
}

export function getAllEvents() {
  return prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: { chapter: true },
  });
}
