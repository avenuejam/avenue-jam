import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "neutral" | "dark";
  id?: string;
}) {
  const toneClasses = {
    white: "bg-white",
    neutral: "bg-neutral-50",
    dark: "bg-brand-500 text-white",
  }[tone];

  return (
    <section id={id} className={`${toneClasses} scroll-mt-32 py-16 sm:py-20`}>
      <Container className={className}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-wider ${light ? "text-white/80" : "text-brand-600"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${light ? "text-white" : "text-brand-950"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/90" : "text-neutral-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
