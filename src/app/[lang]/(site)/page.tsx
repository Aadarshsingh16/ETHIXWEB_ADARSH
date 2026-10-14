import type { Metadata } from "next";
import { getDictionary, LOCALES, isValidLocale } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhySection } from "@/components/sections/WhySection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        hi: "/hi",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "hi" ? "hi_IN" : "en_IN",
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isHi = lang === "hi";
  const dict = getDictionary(lang);

  return (
    <div className="space-y-0">
      {/* 1. Hero: Dark Inset Card */}
      <Hero lang={lang} data={dict.hero} isHindi={isHi} />

      {/* 2. Industries Marquee Ticker */}
      <div className="mb-16 sm:mb-24">
        <Marquee items={dict.industries} />
      </div>

      {/* 3. About Teaser + Trustpilot / 22 Services ChamferCards */}
      <AboutTeaser lang={lang} data={dict.aboutTeaser} />

      {/* 4. Services Accordion: Dark Inset Card */}
      <ServicesSection lang={lang} data={dict.services} />

      {/* 5. Featured Work: Stacked Sticky Concept Cards */}
      <WorkSection data={dict.work} />

      {/* 6. Process: 01 to 04 Workflow */}
      <ProcessSection data={dict.process} />

      {/* 7. Why Ethixweb: India-First Bento Grid */}
      <WhySection data={dict.why} />

      {/* 8. Pricing: Indicative ₹ Packages */}
      <PricingSection lang={lang} data={dict.pricing} />

      {/* 9. FAQ: Dark Inset Card + WhatsApp Support Card */}
      <FaqSection data={dict.faq} />

      {/* 10. Final CTA Band: Red 500 Block with Jaali Pattern */}
      <CtaBand lang={lang} data={dict.ctaBand} />
    </div>
  );
}
