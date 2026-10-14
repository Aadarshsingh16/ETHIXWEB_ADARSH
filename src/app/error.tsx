"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled client error in ErrorBoundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-text)]">
            Something went wrong
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            An unexpected error occurred while loading this page. Our technical team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" onClick={() => reset()}>
            Try again
          </Button>
          <Button href="/en" variant="secondary">
            Return to Home
          </Button>
        </div>

        <div className="pt-4 text-xs text-[var(--color-text-muted)]">
          Need immediate support?{" "}
          <Link
            href="https://wa.me/919999999999?text=Hello%20Ethixweb%2C%20I%20encountered%20an%20error%20on%20your%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--color-text)]"
          >
            Contact us directly on WhatsApp →
          </Link>
        </div>
      </div>
    </div>
  );
}
