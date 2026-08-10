"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="bg-navy-900 py-1.5 text-center text-xs text-navy-100">
        Nonpartisan civic education for every student, in every community.
      </div>
      <Container className="flex h-18 items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-navy-50 hover:text-navy-900"
              >
                {link.label}
                {link.children && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </Link>
              {link.children && openMenu === link.label && (
                <div className="absolute left-0 top-full w-64 rounded-lg border border-neutral-200 bg-white p-2 shadow-lg">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-navy-50 hover:text-navy-900"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/chapters/start" variant="outline" size="md">
            Start a Chapter
          </Button>
          <Button href="/donate" variant="secondary" size="md">
            Donate
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-neutral-100 py-1">
                <Link
                  href={link.href}
                  className="block px-2 py-2 text-sm font-semibold text-navy-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-2 flex flex-col gap-0.5 pb-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-md px-2 py-1.5 text-sm text-neutral-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button href="/chapters/start" variant="outline">
                Start a Chapter
              </Button>
              <Button href="/donate" variant="secondary">
                Donate
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
