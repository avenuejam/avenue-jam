import type { ReactNode } from "react";

export function AdminSection({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-neutral-200 py-10 last:border-b-0">
      <h2 className="text-xl font-bold text-neutral-900">
        {title} <span className="font-normal text-neutral-400">({count})</span>
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
