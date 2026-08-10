import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getAllNews } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "News",
  description: "News, announcements, press releases, and success stories from AVENUE JAM.",
};

export default async function NewsPage() {
  const articles = await getAllNews();

  return (
    <>
      <PageHero
        eyebrow="Stay Connected"
        title="News & Announcements"
        description="Updates, press releases, and success stories from across the AVENUE JAM national network."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                {article.category}
              </p>
              <h2 className="mt-2 font-semibold text-navy-950">{article.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                {article.excerpt}
              </p>
              <p className="mt-4 text-xs text-neutral-500">
                {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(article.publishedAt)}
              </p>
            </Link>
          ))}

          {articles.length === 0 && (
            <p className="col-span-full py-10 text-center text-neutral-500">
              No news articles have been published yet.
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
