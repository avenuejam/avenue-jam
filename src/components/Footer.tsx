import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { FOOTER_ORG_LINKS, FOOTER_PROGRAM_LINKS, ORG_LEGAL_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy-950 text-navy-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/80">
            A national, youth-led nonprofit advancing civic education, legal rights literacy,
            human rights education, and youth leadership.
          </p>
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
            <li>
              <Link href="/donate" className="hover:text-white">
                Donate
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-navy-100/70 sm:flex-row">
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
        </Container>
      </div>
    </footer>
  );
}
