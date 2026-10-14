import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo theme="light" />
        </div>

        <div className="space-y-2">
          <div className="font-mono text-5xl font-extrabold text-[var(--color-red)]">
            404
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-text)]">
            Page not found
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            The page you are looking for does not exist or has been moved to a new URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button href="/en" variant="primary">
            Return to Home
          </Button>
          <Button href="/en/services" variant="secondary">
            View Services
          </Button>
        </div>

        <div className="pt-6">
          <Link
            href="/en/contact"
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline transition-colors"
          >
            Need assistance? Contact our team →
          </Link>
        </div>
      </div>
    </div>
  );
}
