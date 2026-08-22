"use client";

import { useState } from "react";
import Script from "next/script";
import { ZEFFY_FORM_URL } from "@/lib/constants";

const ZEFFY_ORIGIN = "https://www.zeffy.com";
const ZEFFY_FORM_PATH = ZEFFY_FORM_URL.replace(ZEFFY_ORIGIN, "");

/**
 * Zeffy's official embed: a target div loaded by Zeffy's own script (which
 * auto-sizes the iframe to the form's content), with a plain-iframe fallback
 * if that script fails to load. Swap `ZEFFY_FORM_URL` in
 * src/lib/constants.ts for a different form — nothing else needs to change.
 */
export function DonateEmbed({ title = "Support AVENUE JAM" }: { title?: string }) {
  const isConfigured = !ZEFFY_FORM_URL.includes("REPLACE-WITH-ZEFFY-FORM-ID");
  const [showFallback, setShowFallback] = useState(false);

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
    <div className="w-full">
      <div data-zeffy-embed="" data-form-url={ZEFFY_FORM_PATH} className="min-h-[450px] w-full" />
      {showFallback && (
        <div className="relative h-[450px] w-full overflow-hidden rounded-xl border border-neutral-200">
          <iframe
            title={title}
            src={ZEFFY_FORM_URL}
            className="absolute inset-0 h-full w-full border-0"
            allow="payment"
            allowTransparency
          />
        </div>
      )}
      <Script
        src="https://www.zeffy.com/embed/v2/zeffy-embed.js"
        strategy="afterInteractive"
        onError={() => setShowFallback(true)}
      />
    </div>
  );
}
