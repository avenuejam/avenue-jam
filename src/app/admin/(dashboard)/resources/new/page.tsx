import type { Metadata } from "next";
import { LessonForm } from "@/components/admin/LessonForm";

export const metadata: Metadata = { title: "New Lesson" };

export default function NewLessonPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">New Lesson</h1>
      <div className="mt-6">
        <LessonForm />
      </div>
    </div>
  );
}
