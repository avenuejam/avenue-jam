import type { Metadata } from "next";
import { ChapterForm } from "@/components/admin/ChapterForm";

export const metadata: Metadata = { title: "New Chapter" };

export default function NewChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">New Chapter</h1>
      <div className="mt-6">
        <ChapterForm />
      </div>
    </div>
  );
}
