import { getDictionary, LOCALES } from "@/lib/i18n";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { StatusPill } from "@/components/ui/StatusPill";
import { LangToggle } from "@/components/ui/LangToggle";
import { ChamferCard } from "@/components/ui/ChamferCard";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Marquee } from "@/components/ui/Marquee";
import { ServiceAccordion } from "@/components/ui/ServiceAccordion";
import { ProcessCard } from "@/components/ui/ProcessCard";
import { PricingCard } from "@/components/ui/PricingCard";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function DesignTokensPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="border-b border-[#E6E6E8] pb-6">
        <SectionLabel>Design System & Token Verification</SectionLabel>
        <TwoToneHeading
          as="h1"
          main="Ethixweb Design Tokens"
          fade="and Core Components (Phase 1)"
          size="lg"
          className="mt-3"
        />
        <p className="mt-2 text-[#6E6E73] text-sm">
          Temporary verification page for typography, colors, borders, and interactive components.
        </p>
      </div>

      {/* 1. Brand & Color Palette */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">1. Color Palette Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-[#C1272D] text-white">
            <span className="font-bold block">Red 500</span>
            <span>#C1272D (Brand)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#A51F25] text-white">
            <span className="font-bold block">Red 600</span>
            <span>#A51F25 (Hover)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FDECEC] text-[#C1272D] border border-[#C1272D]/20">
            <span className="font-bold block">Red 50</span>
            <span>#FDECEC (Chip)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0C0C0D] text-white">
            <span className="font-bold block">Ink</span>
            <span>#0C0C0D (Dark section)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#161617] text-white">
            <span className="font-bold block">Ink 2</span>
            <span>#161617 (Dark card)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#25D366] text-white">
            <span className="font-bold block">WhatsApp</span>
            <span>#25D366</span>
          </div>
        </div>
      </section>

      {/* 2. Logos & Nav Pills */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">2. Logo, StatusPill & LangToggle</h2>
        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-[#0C0C0D]">
          <Logo lang={lang} theme="dark" />
          <StatusPill onlineText={dict.nav.onlineIst} offlineText={dict.nav.offlineIst} />
          <LangToggle currentLang={lang} theme="dark" />
        </div>
        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white border border-[#E6E6E8]">
          <Logo lang={lang} theme="light" />
          <LangToggle currentLang={lang} theme="light" />
        </div>
      </section>

      {/* 3. Button Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">3. Buttons & Micro-Interactions</h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl bg-white border border-[#E6E6E8]">
          <Button variant="primary">Primary Button</Button>
          <Button variant="accent" arrow>
            Accent with Arrow
          </Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="whatsapp">WhatsApp Button</Button>
        </div>
      </section>

      {/* 4. Jaali Pattern and Chamfer Card */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">4. Jaali Motif & Chamfer Card (Covix Polygon)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-[28px] bg-[#0C0C0D] p-8 text-white overflow-hidden min-h-[220px]">
            <div className="absolute inset-0 jaali pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <SectionLabel theme="dark">Authentic Indian Texture</SectionLabel>
              <h3 className="text-2xl font-bold">Lattice Jaali Pattern</h3>
              <p className="text-sm text-[#A1A1A6]">
                Subtle mathematical architectural lattice, masked radially to corner.
              </p>
            </div>
          </div>

          <ChamferCard theme="light">
            <SectionLabel>Covix Cut-Corner</SectionLabel>
            <h3 className="text-2xl font-bold mt-2 text-[#0C0C0D]">Chamfered Card</h3>
            <p className="text-sm text-[#6E6E73] mt-1">
              Polygon clip-path removing 28px diagonally from top-right and bottom-left.
            </p>
          </ChamferCard>

          <FeatureCard theme="light">
            <SectionLabel>Apple Flat 28px Card</SectionLabel>
            <h3 className="text-2xl font-bold mt-2 text-[#0C0C0D]">Feature Card</h3>
            <p className="text-sm text-[#6E6E73] mt-1">
              Clean 28px radius flat card with hairline border, no drop shadows.
            </p>
          </FeatureCard>
        </div>
      </section>

      {/* 5. Marquee */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">5. Industries Marquee</h2>
        <Marquee items={dict.industries} />
      </section>

      {/* 6. Service Accordion Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">6. Native Details Service Accordion (Dark Inset Card)</h2>
        <div className="rounded-[28px] bg-[#0C0C0D] p-8">
          <ServiceAccordion
            services={dict.services.items.slice(0, 3)}
            lang={lang}
            exploreText={dict.services.exploreButton}
          />
        </div>
      </section>

      {/* 7. Process Cards Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">7. Process Cards (01–04)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.process.steps.map((step, idx) => (
            <ProcessCard key={step.number} step={step} index={idx} />
          ))}
        </div>
      </section>

      {/* 8. Pricing Cards Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">8. Indicative Rupee Pricing Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {dict.pricing.plans.map((plan, idx) => (
            <PricingCard key={idx} plan={plan} lang={lang} />
          ))}
        </div>
      </section>
    </div>
  );
}
