import Link from "next/link";
import type { Metadata } from "next";
import { getAllNews } from "@/lib/data/news";
import { deleteNewsArticle } from "@/lib/actions/news";
import { Table } from "@/components/admin/Table";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "News" };

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
}

export default async function AdminNewsPage() {
  const articles = await getAllNews();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">News</h1>
          <p className="mt-1 text-sm text-neutral-500">{articles.length} total</p>
        </div>
        <Button href="/admin/news/new">New Article</Button>
      </div>

      <div className="mt-6">
        <Table
          columns={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "publishedAt", label: "Published" },
            { key: "actions", label: "" },
          ]}
          rows={articles.map((a) => ({
            title: a.title,
            category: a.category,
            publishedAt: formatDate(a.publishedAt),
            actions: (
              <div className="flex gap-3">
                <Link href={`/admin/news/${a.id}/edit`} className="text-brand-700 hover:underline">
                  Edit
                </Link>
                <form action={deleteNewsArticle.bind(null, a.id)}>
                  <button type="submit" className="text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}
