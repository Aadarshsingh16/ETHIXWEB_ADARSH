import type { Metadata } from "next";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import Link from "next/link";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "hi" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  return {
    title: "Privacy Policy | Ethixweb India",
    description: "Clear, transparent privacy policy and data protection commitments for Indian businesses.",
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: {
        en: "/en/privacy",
        hi: "/hi/privacy",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const t = getDictionary(lang);

  return (
    <div className="pt-28 sm:pt-36 pb-16 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div>
          <SectionLabel>Data Transparency</SectionLabel>
          <TwoToneHeading
            as="h1"
            main="Privacy Policy"
            fade="& Commitments"
            className="mt-4"
          />
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Last updated: October 2026 • Compliant with Indian DPDP principles
          </p>
        </div>

        {/* Core Principles */}
        <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 space-y-4">
          <h2 className="font-heading text-lg font-bold text-[var(--color-text)]">
            Our Core Privacy Pledge
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            We believe enterprise business relationships begin with respect. We do not sell your data, we do not deploy invasive third-party ad pixels on our site, and we will never spam your phone number or email address.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-sm text-[var(--color-text-muted)] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[var(--color-text)]">
              1. Information We Collect
            </h2>
            <p>
              When you submit an enquiry through our contact form, we collect the details you provide: your name, business email, 10-digit mobile number, optional company name, city, service interest, indicative budget, and project notes.
            </p>
            <p>
              To protect our services from malicious automated bots and distributed denial-of-service attempts, we compute a one-way cryptographic SHA-256 hash of your IP address combined with an internal salt. We never store raw IP addresses in our database.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[var(--color-text)]">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used exclusively to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Respond to your technical and commercial enquiries regarding our services.</li>
              <li>Schedule discovery consultations via WhatsApp, phone, or email based on your preference.</li>
              <li>Issue GST-compliant invoices and project agreements upon onboarding.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[var(--color-text)]">
              3. Data Storage & Security
            </h2>
            <p>
              All customer records are stored securely in dedicated cloud infrastructure hosted in Mumbai, India (AWS ap-south-1). We implement strict Row Level Security (RLS) policies and require encrypted multi-factor authentication for administrative access.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[var(--color-text)]">
              4. Third-Party Sharing
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to data brokers, ad networks, or external lead generation companies. We only interact with trusted infrastructure providers (Cloudflare for Turnstile bot prevention and Supabase for database hosting) bound by strict confidentiality and data protection obligations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[var(--color-text)]">
              5. Your Rights
            </h2>
            <p>
              You have the right to request a copy of the personal data we hold about you, request corrections, or request deletion of your enquiry history at any time. To exercise these rights, email us at <strong className="text-[var(--color-text)]">india@ethixweb.com</strong>.
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-[var(--color-border)]">
          <Link
            href={`/${lang}`}
            className="text-xs font-semibold text-[var(--color-text)] hover:text-[var(--color-red)] transition-colors"
          >
            ← Return to {t.footer.quickLinks}
          </Link>
        </div>
      </div>
    </div>
  );
}
