import { ZEFFY_FORM_URL } from "@/lib/constants";

/**
 * Placeholder for the Zeffy donation embed. Swap `ZEFFY_FORM_URL` in
 * src/lib/constants.ts for the organization's real Zeffy form URL — the
 * iframe embed code is otherwise exactly what Zeffy provides.
 */
export function DonateEmbed({ title = "Support AVENUE JAM" }: { title?: string }) {
  const isConfigured = !ZEFFY_FORM_URL.includes("REPLACE-WITH-ZEFFY-FORM-ID");

  if (!isConfigured) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-brand-200 bg-brand-50 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Zeffy Donation Form
        </p>
        <p className="max-w-sm text-sm text-neutral-600">
          This is a placeholder for the embedded Zeffy donation form. Once AVENUE JAM&apos;s Zeffy
          account and form are created, add the form URL to{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">ZEFFY_FORM_URL</code> in{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">src/lib/constants.ts</code> and
          this block will render the live embed automatically.
        </p>
        <p className="text-xs text-neutral-500">Title: {title}</p>
      </div>
    );
  }

  return (
    <iframe
      title={title}
      src={ZEFFY_FORM_URL}
      className="min-h-[850px] w-full rounded-xl border border-neutral-200"
      allow="payment"
    />
  );
}
