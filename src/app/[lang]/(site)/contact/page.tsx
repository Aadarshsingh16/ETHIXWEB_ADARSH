import type { Metadata } from "next";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { ContactForm } from "@/components/sections/ContactForm";

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
  const t = getDictionary(lang);

  return {
    title: `${t.contactPage.title} | Ethixweb India`,
    description: t.contactPage.sub,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        en: "/en/contact",
        hi: "/hi/contact",
      },
    },
  };
}

export default async function ContactPage({
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
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <SectionLabel>{t.contactPage.label}</SectionLabel>
          <TwoToneHeading
            as="h1"
            main={t.contactPage.title}
            fade=""
            className="mt-4"
          />
          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
            {t.contactPage.sub}
          </p>
        </div>

        {/* Content Grid: Form + Side Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm content={t.contactPage.form} />
          </div>

          {/* Direct Support Side Card (5 cols) */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                </div>
                <h2 className="font-heading text-lg font-bold text-[var(--color-text)]">
                  {t.contactPage.sideCard.title}
                </h2>
              </div>

              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t.contactPage.sideCard.desc}
              </p>

              <a
                href="https://wa.me/919999999999?text=Hello%20Ethixweb%2C%20I%20have%20an%20enquiry%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] text-white py-3.5 px-4 text-sm font-semibold hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                {t.contactPage.sideCard.whatsappBtn}
              </a>

              <hr className="border-[var(--color-border)]" />

              <div className="space-y-4 text-xs">
                <div>
                  <span className="block font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t.contactPage.sideCard.emailLabel}
                  </span>
                  <a
                    href={`mailto:${t.contactPage.sideCard.email}`}
                    className="mt-1 block font-medium text-[var(--color-text)] hover:text-[var(--color-red)] transition-colors"
                  >
                    {t.contactPage.sideCard.email}
                  </a>
                </div>

                <div>
                  <span className="block font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t.contactPage.sideCard.hoursLabel}
                  </span>
                  <p className="mt-1 font-medium text-[var(--color-text)]">
                    {t.contactPage.sideCard.hours}
                  </p>
                </div>

                <div className="rounded-lg bg-[var(--color-surface-hover)] p-3">
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    ⏱️ <strong className="text-[var(--color-text)]">SLA:</strong>{" "}
                    {t.contactPage.sideCard.sla}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Reassurance Box */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
                Our Guarantee
              </h3>
              <ul className="text-xs text-[var(--color-text-muted)] space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-red)]">✓</span> 100% No spam
                  promise — your details stay strictly confidential.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-red)]">✓</span> Clear indicative
                  Rupee (₹) pricing with GST invoices.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-red)]">✓</span> Fast response
                  from dedicated Indian technical leads.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
