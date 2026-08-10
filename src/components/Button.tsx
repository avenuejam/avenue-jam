import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "onDark" | "onDarkOutline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-400 text-brand-950 hover:bg-brand-500",
  secondary: "bg-brand-600 text-white hover:bg-brand-500",
  outline: "border border-brand-800 text-brand-900 hover:bg-brand-50",
  ghost: "text-brand-900 hover:bg-brand-50",
  onDark: "bg-white text-brand-900 hover:bg-brand-50",
  onDarkOutline: "border border-white/30 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
