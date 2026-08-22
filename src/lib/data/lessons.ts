import { prisma } from "@/lib/prisma";

export function getAllLessons() {
  return prisma.lesson.findMany({ orderBy: [{ unit: "asc" }, { sortOrder: "asc" }, { title: "asc" }] });
}

export function getLessonById(id: string) {
  return prisma.lesson.findUnique({ where: { id } });
}
