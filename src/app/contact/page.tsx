import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { ORG_CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the AVENUE JAM national team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in Touch"
        description="Questions about chapters, programs, or partnerships? We'd love to hear from you."
      />
      <Section>
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 p-6 sm:p-10 lg:col-span-2">
            <ContactForm />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-brand-50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                Direct Contact
              </h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-neutral-500">Email</dt>
                  <dd>
                    <a href={`mailto:${ORG_CONTACT.email}`} className="font-medium text-brand-900 hover:underline">
                      {ORG_CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Instagram</dt>
                  <dd>
                    <a
                      href={ORG_CONTACT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-900 hover:underline"
                    >
                      @avenuejam
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
