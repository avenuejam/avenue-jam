import Link from "next/link";
import { logout } from "@/lib/actions/logout";

const CONTENT_LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/chapters", label: "Chapters" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/resources", label: "Resources" },
];

const OPERATIONS_LINKS = [
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/submissions", label: "Form Submissions" },
];

export function AdminNav({
  userName,
  canManageOperations,
  canManageUsers,
}: {
  userName: string;
  canManageOperations: boolean;
  canManageUsers: boolean;
}) {
  const links = canManageOperations ? [...CONTENT_LINKS, ...OPERATIONS_LINKS] : CONTENT_LINKS;

  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              {link.label}
            </Link>
          ))}
          {canManageUsers && (
            <Link
              href="/admin/users"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Users
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3 text-sm text-neutral-600">
          <Link href="/admin/account" className="font-medium hover:underline">
            {userName}
          </Link>
          <form action={logout}>
            <button type="submit" className="font-medium text-brand-700 hover:underline">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
