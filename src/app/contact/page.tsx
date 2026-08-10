import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the AVENUE JAM national team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Get in Touch" description="Questions about chapters, programs, or partnerships? We'd love to hear from you." />
      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 p-6 sm:p-10">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
