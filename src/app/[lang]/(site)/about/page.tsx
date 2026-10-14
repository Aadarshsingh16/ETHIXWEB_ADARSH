import type { Metadata } from "next";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { Button } from "@/components/ui/Button";

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
    title: `${t.aboutPage.title} | Ethixweb India`,
    description: t.aboutPage.sub,
    alternates: {
      canonical: `/${lang}/about`,
      languages: {
        en: "/en/about",
        hi: "/hi/about",
      },
    },
  };
}

export default async function AboutPage({
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionLabel>{t.aboutPage.label}</SectionLabel>
          <TwoToneHeading
            as="h1"
            main={t.aboutPage.title}
            fade=""
            className="mt-4"
          />
          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
            {t.aboutPage.sub}
          </p>
        </div>

        {/* Narrative Chapters (Editorial Storytelling) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 space-y-4">
            <span className="font-mono text-xs font-semibold text-[var(--color-red)] tracking-wider">
              PART 01
            </span>
            <h2 className="font-heading text-xl font-bold text-[var(--color-text)]">
              {t.aboutPage.story1Title}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t.aboutPage.story1Text}
            </p>
          </div>

          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 space-y-4">
            <span className="font-mono text-xs font-semibold text-[var(--color-red)] tracking-wider">
              PART 02
            </span>
            <h2 className="font-heading text-xl font-bold text-[var(--color-text)]">
              {t.aboutPage.story2Title}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t.aboutPage.story2Text}
            </p>
          </div>

          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 space-y-4">
            <span className="font-mono text-xs font-semibold text-[var(--color-red)] tracking-wider">
              PART 03
            </span>
            <h2 className="font-heading text-xl font-bold text-[var(--color-text)]">
              {t.aboutPage.story3Title}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t.aboutPage.story3Text}
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12 space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-red)]">
              How We Operate
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mt-2">
              {t.aboutPage.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.aboutPage.values.map((v, idx) => (
              <div key={idx} className="space-y-2">
                <div className="font-mono text-xs font-bold text-[var(--color-red)]">
                  {`// 0${idx + 1}`}
                </div>
                <h3 className="font-heading text-base font-bold text-[var(--color-text)]">
                  {v.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* True Numbers Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--color-text)]">
              4.0★
            </div>
            <div className="mt-2 text-xs font-medium text-[var(--color-text-muted)]">
              Verified Trustpilot Rating
            </div>
          </div>
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--color-text)]">
              22
            </div>
            <div className="mt-2 text-xs font-medium text-[var(--color-text-muted)]">
              Capabilities across 6 domains
            </div>
          </div>
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--color-text)]">
              100% IST
            </div>
            <div className="mt-2 text-xs font-medium text-[var(--color-text-muted)]">
              Dedicated Indian technical hours
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="font-heading text-2xl font-bold text-[var(--color-text)]">
            Ready to partner with an accountable technical team?
          </h2>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`/${lang}/contact`} variant="primary" arrow>
              Start an enquiry
            </Button>
            <Button
              href="https://wa.me/919999999999?text=Hello%20Ethixweb%2C%20I%20would%20like%20to%20speak%20with%20your%20team"
              variant="whatsapp"
              external
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
