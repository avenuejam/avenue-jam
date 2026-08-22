import Link from "next/link";
import { logout } from "@/lib/actions/logout";
import { ROLE_LABELS } from "@/lib/roleLabels";

export function ResourceLibraryHeader({
  userName,
  role,
  chapterName,
  showAdminLink,
}: {
  userName: string;
  role: string;
  chapterName?: string | null;
  showAdminLink: boolean;
}) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-sm text-neutral-600">
          <span className="font-medium text-neutral-900">{userName}</span>
          <span className="mx-1.5 text-neutral-400">&middot;</span>
          <span>{ROLE_LABELS[role] ?? role}</span>
          {chapterName && (
            <>
              <span className="mx-1.5 text-neutral-400">&middot;</span>
              <span>{chapterName}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm">
          {showAdminLink && (
            <Link href="/admin" className="font-medium text-brand-700 hover:underline">
              Portal
            </Link>
          )}
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
