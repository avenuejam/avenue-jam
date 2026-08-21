import type { ReactNode } from "react";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-neutral-200 bg-brand-500">
      <Container className="py-16 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white">{description}</p>
        )}
        {children}
      </Container>
    </div>
  );
}
