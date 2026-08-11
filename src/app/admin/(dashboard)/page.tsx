import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ADMIN_ROLES, requirePortalSession } from "@/lib/auth";
import { PortalGreeting, greetingForHour } from "@/components/admin/PortalGreeting";

export const metadata: Metadata = { title: "Overview" };

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const session = await requirePortalSession();
  const canManageOperations = ADMIN_ROLES.includes(session.user.role);

  const [pendingApplications, chapterCount, newsCount, upcomingEventCount] = await Promise.all([
    prisma.chapterApplication.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
    prisma.chapter.count(),
    prisma.newsArticle.count(),
    prisma.event.count({ where: { startsAt: { gte: new Date() } } }),
  ]);

  const cards = [
    canManageOperations && {
      label: "Applications awaiting review",
      value: pendingApplications,
      href: "/admin/applications",
    },
    { label: "Chapters", value: chapterCount, href: "/admin/chapters" },
    { label: "News articles", value: newsCount, href: "/admin/news" },
    { label: "Upcoming events", value: upcomingEventCount, href: "/admin/events" },
  ].filter(Boolean) as { label: string; value: number; href: string }[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PortalGreeting
        greeting={greetingForHour(new Date().getHours())}
        name={session.user.name ?? session.user.email ?? "there"}
        role={session.user.role}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-neutral-200 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
          >
            <p className="text-3xl font-bold text-brand-950">{card.value}</p>
            <p className="mt-1 text-sm text-neutral-600">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
