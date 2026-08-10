import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "neutral" | "navy";
}) {
  const toneClasses = {
    white: "bg-white",
    neutral: "bg-neutral-50",
    navy: "bg-navy-900 text-white",
  }[tone];

  return (
    <section className={`${toneClasses} py-16 sm:py-20`}>
      <Container className={className}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-navy-600">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-neutral-600">{description}</p>}
    </div>
  );
}
