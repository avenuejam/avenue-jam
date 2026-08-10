import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ChapterApplicationForm } from "@/components/forms/ChapterApplicationForm";

export const metadata: Metadata = {
  title: "Start a Chapter",
  description: "Apply to start an AVENUE JAM chapter at your school or in your community.",
};

const steps = [
  { title: "Submit your application", body: "Tell us about your community, your motivation, and your advisor." },
  { title: "National review", body: "Our Chapter Development team reviews every application, typically within 2-3 weeks." },
  { title: "Onboarding & training", body: "Approved chapters receive access to curriculum, branding, and officer training." },
  { title: "Launch your chapter", body: "Start running programming under the AVENUE JAM name and national standards." },
];

export default function StartChapterPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Network"
        title="Start a Chapter"
        description="Ready to bring civic education, human rights education, and legal rights literacy to your school? Apply to start an AVENUE JAM chapter below."
      />

      <Section tone="neutral">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-xl bg-white p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-brand-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-brand-950">Chapter Application</h2>
          <p className="mt-2 text-neutral-600">
            Fields marked with <span className="text-brand-600">*</span> are required.
          </p>
          <div className="mt-8">
            <ChapterApplicationForm />
          </div>
        </div>
      </Section>
    </>
  );
}
