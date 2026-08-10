import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold tracking-tight ${
          inverted ? "bg-white text-navy-900" : "bg-navy-900 text-white"
        }`}
      >
        AJ
      </span>
      <span
        className={`text-[15px] font-bold uppercase tracking-wide leading-tight ${
          inverted ? "text-white" : "text-navy-900"
        }`}
      >
        Avenue Jam
      </span>
    </Link>
  );
}
