import Link from "next/link";
import type { ReactNode } from "react";

export function ProgramCard({
  icon,
  title,
  description,
  href,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-navy-950">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 transition-all group-hover:gap-2">
        Learn more
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </Link>
  );
}
