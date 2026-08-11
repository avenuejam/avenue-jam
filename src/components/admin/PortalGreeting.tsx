import { Fraunces } from "next/font/google";
import { ROLE_LABELS } from "@/lib/roleLabels";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
});

export function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function PortalGreeting({ greeting, name, role }: { greeting: string; name: string; role: string }) {
  return (
    <div>
      <p className={`${fraunces.className} text-3xl text-brand-950 sm:text-4xl`}>{greeting}</p>
      <p className="mt-1 text-lg font-semibold text-neutral-900">{name}</p>
      <p className="text-sm text-neutral-500">{ROLE_LABELS[role] ?? role}</p>
    </div>
  );
}
