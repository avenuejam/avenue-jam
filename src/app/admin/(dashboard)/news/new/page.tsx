import type { Metadata } from "next";
import { NewsForm } from "@/components/admin/NewsForm";

export const metadata: Metadata = { title: "New Article" };

export default function NewNewsArticlePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">New Article</h1>
      <div className="mt-6">
        <NewsForm />
      </div>
    </div>
  );
}
