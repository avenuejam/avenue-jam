import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getNewsBySlug } from "@/lib/data/news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) notFound();

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
          article.publishedAt,
        )}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="space-y-5 text-lg leading-relaxed text-neutral-700">
            {article.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <Link href="/news" className="mt-10 inline-block text-sm font-semibold text-navy-700 hover:underline">
            &larr; Back to News
          </Link>
        </div>
      </Section>
    </>
  );
}
