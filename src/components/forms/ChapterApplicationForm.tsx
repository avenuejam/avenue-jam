"use client";

import { useActionState } from "react";
import { submitChapterApplication, type ChapterApplicationState } from "@/lib/actions/chapterApplication";
import { Button } from "@/components/Button";

const initialState: ChapterApplicationState = { status: "idle" };

function Field({
  label,
  name,
  error,
  type = "text",
  textarea = false,
  required = true,
  placeholder,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
}) {
  const inputClasses =
    "mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100";
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-neutral-800">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function ChapterApplicationForm() {
  const [state, formAction, pending] = useActionState(submitChapterApplication, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-900">Application Submitted</h3>
        <p className="mt-2 text-green-800">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && state.message && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Applicant Name" name="applicantName" error={state.fieldErrors?.applicantName} />
        <Field label="Email" name="email" type="email" error={state.fieldErrors?.email} />
        <Field
          label="School / Organization"
          name="schoolOrOrganization"
          error={state.fieldErrors?.schoolOrOrganization}
        />
        <Field label="Proposed Chapter Name" name="proposedChapterName" error={state.fieldErrors?.proposedChapterName} />
        <Field label="City" name="city" error={state.fieldErrors?.city} />
        <Field label="State" name="state" error={state.fieldErrors?.state} placeholder="e.g. CA" />
      </div>

      <Field
        label="Why do you want to start an AVENUE JAM chapter?"
        name="motivation"
        textarea
        error={state.fieldErrors?.motivation}
        placeholder="Tell us about your community and why civic education matters there."
      />

      <Field
        label="Leadership experience"
        name="leadershipExperience"
        textarea
        error={state.fieldErrors?.leadershipExperience}
        placeholder="Describe any clubs, teams, or leadership roles you've held."
      />

      <div className="rounded-lg border border-neutral-200 p-5">
        <h3 className="font-semibold text-navy-950">Advisor Information</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Every AVENUE JAM chapter must have a faculty or community advisor.
        </p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <Field label="Advisor Name" name="advisorName" error={state.fieldErrors?.advisorName} />
          <Field label="Advisor Email" name="advisorEmail" type="email" error={state.fieldErrors?.advisorEmail} />
          <Field label="Advisor Phone" name="advisorPhone" required={false} error={state.fieldErrors?.advisorPhone} />
        </div>
      </div>

      <div>
        <label htmlFor="fileUploads" className="text-sm font-medium text-neutral-800">
          Supporting documents (optional)
        </label>
        <p className="mt-1 text-xs text-neutral-500">
          Letters of support, advisor confirmation, or other relevant files. PDF, DOC, or image
          files up to 10MB each.
        </p>
        <input
          id="fileUploads"
          name="fileUploads"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          className="mt-2 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-md file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-navy-800 hover:file:bg-navy-100"
        />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
