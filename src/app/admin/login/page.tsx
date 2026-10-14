"use client";

import { useState, useId, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin";
  const formId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError(json.error?.message || "Invalid credentials or unauthorized account");
        return;
      }

      router.push(nextUrl);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-10 shadow-sm">
      <div className="flex flex-col items-center text-center space-y-3">
        <Logo theme="dark" />
        <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-text)]">
          Admin Portal
        </h1>
        <p className="text-xs text-[var(--color-text-muted)]">
          Authorized Ethixweb operations personnel only
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 text-center"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            Email address
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@ethixweb.com"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor={`${formId}-password`}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
          >
            Password
          </label>
          <input
            id={`${formId}-password`}
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] transition-colors"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Signing in..." : "Sign in to portal"}
          </Button>
        </div>
      </form>

      <div className="pt-4 text-center">
        <Link
          href="/en"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          ← Return to main site
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4 py-12">
      <Suspense fallback={<div className="text-xs text-[var(--color-text-muted)]">Loading login portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
