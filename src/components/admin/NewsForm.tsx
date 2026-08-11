"use client";

import { useActionState } from "react";
import type { NewsArticle } from "@prisma/client";
import { createNewsArticle, type NewsFormState } from "@/lib/actions/news";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/Button";

const initialState: NewsFormState = { status: "idle" };

function toDateInputValue(date?: Date) {
  if (!date) return undefined;
  return date.toISOString().slice(0, 10);
}

export function NewsForm({
  article,
  action = createNewsArticle,
}: {
  article?: NewsArticle;
  action?: (prevState: NewsFormState, formData: FormData) => Promise<NewsFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && state.message && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Title" name="title" defaultValue={article?.title} error={state.fieldErrors?.title} />
        <div>
          <label htmlFor="slug" className="text-sm font-medium text-neutral-800">
            Slug <span className="text-brand-600">*</span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={article?.slug}
            required
            placeholder="e.g. spring-2026-launch"
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {state.fieldErrors?.slug && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.slug}</p>}
        </div>
        <FormField
          label="Category"
          name="category"
          options={["News", "Announcement", "Press Release", "Success Story"]}
          defaultValue={article?.category}
          error={state.fieldErrors?.category}
        />
        <FormField
          label="Publish Date"
          name="publishedAt"
          type="date"
          defaultValue={toDateInputValue(article?.publishedAt)}
          error={state.fieldErrors?.publishedAt}
        />
      </div>

      <FormField
        label="Excerpt"
        name="excerpt"
        textarea
        defaultValue={article?.excerpt}
        error={state.fieldErrors?.excerpt}
      />
      <FormField label="Body" name="body" textarea defaultValue={article?.body} error={state.fieldErrors?.body} />
      <FormField
        label="Cover Image URL"
        name="coverImage"
        required={false}
        placeholder="/news/cover.jpg"
        defaultValue={article?.coverImage ?? undefined}
        error={state.fieldErrors?.coverImage}
      />

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Saving..." : article ? "Save Changes" : "Publish Article"}
      </Button>
    </form>
  );
}
