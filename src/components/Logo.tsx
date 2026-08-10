import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={inverted ? "/brand/seal-white.svg" : "/brand/seal-green.png"}
        alt="AVENUE JAM seal"
        className="h-10 w-10"
      />
      <span
        className={`text-[15px] font-bold uppercase tracking-wide leading-tight ${
          inverted ? "text-white" : "text-brand-900"
        }`}
      >
        Avenue Jam
      </span>
    </Link>
  );
}
