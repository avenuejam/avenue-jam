import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChapterById } from "@/lib/data/chapters";
import { updateChapter } from "@/lib/actions/chapters";
import { ChapterForm } from "@/components/admin/ChapterForm";

export const metadata: Metadata = { title: "Edit Chapter" };

export default async function EditChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = await getChapterById(id);
  if (!chapter) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">Edit {chapter.name}</h1>
      <div className="mt-6">
        <ChapterForm chapter={chapter} action={updateChapter.bind(null, id)} />
      </div>
    </div>
  );
}
