import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import {
  DONATIONS_LIVE,
  FOOTER_ORG_LINKS,
  FOOTER_PROGRAM_LINKS,
  ORG_CONTACT,
  ORG_LEGAL_BLURB,
  ORG_LEGAL_NAME,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-950 text-brand-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-100/80">
            A youth-led, nonpartisan nonprofit advancing civic education, human rights education,
            and legal rights literacy through a national chapter-based model.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-100/80">
            <li>
              <a href={`mailto:${ORG_CONTACT.email}`} className="hover:text-white">
                {ORG_CONTACT.email}
              </a>
            </li>
            <li>
              <a href={ORG_CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Programs</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_PROGRAM_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Organization</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_ORG_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Get Involved</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/chapters/start" className="hover:text-white">
                Start a Chapter
              </Link>
            </li>
            <li>
              <Link href="/volunteer" className="hover:text-white">
                Volunteer
              </Link>
            </li>
            <li>
              <Link href="/partner" className="hover:text-white">
                Become a Partner
              </Link>
            </li>
            {DONATIONS_LIVE && (
              <li>
                <Link href="/donate" className="hover:text-white">
                  Donate
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-8">
        <Container>
          <p className="max-w-4xl text-xs leading-relaxed text-brand-100/60">{ORG_LEGAL_BLURB}</p>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-brand-100/70 sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {ORG_LEGAL_NAME}. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white">
                Terms of Use
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
