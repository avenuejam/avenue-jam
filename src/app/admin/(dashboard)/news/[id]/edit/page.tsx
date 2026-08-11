import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsById } from "@/lib/data/news";
import { updateNewsArticle } from "@/lib/actions/news";
import { NewsForm } from "@/components/admin/NewsForm";

export const metadata: Metadata = { title: "Edit Article" };

export default async function EditNewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getNewsById(id);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">Edit {article.title}</h1>
      <div className="mt-6">
        <NewsForm article={article} action={updateNewsArticle.bind(null, id)} />
      </div>
    </div>
  );
}
