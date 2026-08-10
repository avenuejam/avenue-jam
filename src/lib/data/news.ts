import { prisma } from "@/lib/prisma";

export function getLatestNews(limit = 3) {
  return prisma.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export function getAllNews() {
  return prisma.newsArticle.findMany({ orderBy: { publishedAt: "desc" } });
}

export function getNewsBySlug(slug: string) {
  return prisma.newsArticle.findUnique({ where: { slug } });
}
