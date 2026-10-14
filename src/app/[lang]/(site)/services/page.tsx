import type { Metadata } from "next";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
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
  const t = getDictionary(lang);

  return {
    title: `${t.services.label} (22 Services across 6 Domains) | Ethixweb India`,
    description: `${t.services.headingMain} ${t.services.headingFade} Web design, AI receptionists, local growth, data analytics, accessibility, and IST support.`,
    alternates: {
      canonical: `/${lang}/services`,
      languages: {
        en: "/en/services",
        hi: "/hi/services",
      },
    },
  };
}

export default async function ServicesPage({
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel>{t.services.label}</SectionLabel>
          <TwoToneHeading
            as="h1"
            main={t.services.headingMain}
            fade={t.services.headingFade}
            className="mt-4"
          />
          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
            {t.services.sub}
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.services.items.map((cat, idx) => (
            <div
              key={cat.id || idx}
              className="group flex flex-col justify-between rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 hover:border-[var(--color-border-strong)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              <div className="space-y-4">
                {/* Poster Mockup Image */}
                <div className="relative w-full aspect-[16/10] rounded-[6px] overflow-hidden bg-[#121214] border border-[var(--color-border)]">
                  <Image
                    src={`/images/services/service-${cat.id}.jpg`}
                    alt={cat.category}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs font-semibold text-[var(--color-red)] tracking-wider">
                    0{idx + 1}
                  </span>
                  <span className="rounded-full bg-[var(--color-surface-hover)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-muted)]">
                    {cat.count}
                  </span>
                </div>

                <h2 className="font-heading text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-red)] transition-colors">
                  {cat.category}
                </h2>

                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {cat.desc}
                </p>

                {/* India Angle Box */}
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5 space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text)] flex items-center gap-1.5">
                    <span className="text-[var(--color-red)]">🇮🇳</span> India Specifics
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {cat.indiaAngle}
                  </p>
                </div>

                {/* Sub-services list */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                    Included capabilities:
                  </div>
                  <ul className="space-y-1.5">
                    {cat.subServices.map((sub, sIdx) => (
                      <li
                        key={sIdx}
                        className="text-xs text-[var(--color-text)] flex items-start gap-2"
                      >
                        <span className="text-[var(--color-red)] mt-0.5">•</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-border)]">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-[var(--color-text)] hover:text-[var(--color-red)] transition-colors group"
                >
                  <span>Discuss your project</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12 text-center max-w-4xl mx-auto space-y-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)]">
            Not sure which service fits your stage?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
            Tell us about your current bottlenecks. We give straight, honest recommendations without pushing retainers you do not need.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`/${lang}/contact`} variant="primary" arrow>
              Book a free consultation
            </Button>
            <Button
              href="https://wa.me/919999999999?text=Hello%20Ethixweb%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services"
              variant="whatsapp"
              external
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
