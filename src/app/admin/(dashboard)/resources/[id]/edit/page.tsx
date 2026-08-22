import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLessonById } from "@/lib/data/lessons";
import { updateLesson } from "@/lib/actions/lessons";
import { LessonForm } from "@/components/admin/LessonForm";

export const metadata: Metadata = { title: "Edit Lesson" };

export default async function EditLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = await getLessonById(id);
  if (!lesson) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">Edit {lesson.title}</h1>
      <div className="mt-6">
        <LessonForm lesson={lesson} action={updateLesson.bind(null, id)} />
      </div>
    </div>
  );
}
