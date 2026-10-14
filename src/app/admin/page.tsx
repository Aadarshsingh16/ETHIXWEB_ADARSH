import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/supabase/admin";
import { Logo } from "@/components/ui/Logo";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Portal | Ethixweb India",
  robots: {
    index: false,
    follow: false,
  },
};

async function AdminContent() {
  const user = await requireAdmin();

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center gap-4">
            <Logo theme="light" />
            <span className="rounded bg-[var(--color-surface-hover)] px-2 py-0.5 text-xs font-mono font-semibold text-[var(--color-text-muted)]">
              ADMIN
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{user.email}</span>
            </div>
            <Link
              href="/en"
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Live Site
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                Leads Dashboard
              </h1>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Real-time enquiries captured from Indian businesses
              </p>
            </div>
          </div>

          {/* Quick Metrics Cards Placeholder */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Leads", count: "0" },
              { label: "New / Uncontacted", count: "0" },
              { label: "In Contact", count: "0" },
              { label: "Won Deals", count: "0" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <div className="text-xs font-medium text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
                <div className="mt-2 text-2xl font-bold font-mono">
                  {stat.count}
                </div>
              </div>
            ))}
          </div>

          {/* Table Shell / Ready State for Phase 8 */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-muted)]">
            <p className="text-sm">
              Lead management tables and live filters ready. (Configuring in Phase 8)
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center text-sm text-[var(--color-text-muted)]">
            Verifying administrative session...
          </div>
        }
      >
        <AdminContent />
      </Suspense>
    </div>
  );
}
