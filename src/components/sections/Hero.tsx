import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

interface HeroData {
  label: string;
  headingMain: string;
  headingFade: string;
  sub: string;
  ctaCall: string;
  ctaWa: string;
  conceptCard1: {
    badge: string;
    title: string;
    desc: string;
  };
  conceptCard2: {
    badge: string;
    title: string;
    desc: string;
  };
}

interface HeroProps {
  lang: string;
  data: HeroData;
  isHindi?: boolean;
}

export function Hero({ lang, data, isHindi = false }: HeroProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Ethixweb, I'd like to book a consultation for my Indian business."
  )}`;

  return (
    <section className="w-full bg-[#080808] border-b border-[#262525] py-16 sm:py-24 lg:py-28 mb-16 sm:mb-24 relative overflow-hidden">
      {/* Subtle Arterial Red ambient glow in top-right */}
      <div
        className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full bg-[#fe1e34]/15 blur-[120px] pointer-events-none animate-glow-pulse"
        aria-hidden="true"
      />

      {/* Jaali lattice atmospheric mask */}
      <div className="absolute inset-0 jaali opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Top Metadata Label with Arterial Red Dot */}
        <div>
          <SectionLabel theme="dark">{data.label}</SectionLabel>
        </div>

        {/* Monumental Typographic Dialogue — Server rendered for LCP 95+ */}
        <div className="max-w-5xl space-y-6 animate-hero-rise">
          <TwoToneHeading
            as="h1"
            main={data.headingMain}
            fade={data.headingFade}
            size="xl"
            theme="dark"
            italicFade={true}
          />

          {/* Bilingual Hindi sub-heading */}
          {!isHindi && (
            <p
              lang="hi"
              className="text-[17px] sm:text-[20px] text-[#d4d2d2] font-medium font-[family-name:var(--font-deva)] tracking-normal"
            >
              आपका बिज़नेस, अब ऑनलाइन और हमेशा बुक।
            </p>
          )}

          {/* Value Proposition */}
          <p className="text-[16px] sm:text-[19px] text-[#b5b2b2] leading-relaxed max-w-2xl font-light">
            {data.sub}
          </p>
        </div>

        {/* Action Row — SVZ Editorial CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button variant="accent" href={`/${lang}/contact`} arrow>
            {data.ctaCall}
          </Button>
          <Button
            variant="whatsapp"
            href={whatsappUrl}
            external
            aria-label="Chat on WhatsApp (opens in a new tab)"
          >
            {data.ctaWa}
          </Button>
          <div className="pl-2">
            <Button variant="ghost" href={`/${lang}/services`} arrow>
              EXPLORE 22 SERVICES
            </Button>
          </div>
        </div>

        {/* SVZ Concept Architecture Cards — 8px Radius with 1px Arterial Red Border on Featured */}
        <div className="pt-10 border-t border-[#262525] grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* Concept Card 1: D2C (Featured Arterial Red Border) */}
          <div className="group rounded-[8px] bg-[#171617] border border-[#fe1e34] p-6 space-y-4 transition-all duration-200 hover:border-[#fe1e34] flex flex-col justify-between overflow-hidden shadow-[0_0_24px_rgba(254,30,52,0.12)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-[3px] bg-[#262525] text-[#d4d2d2]">
                  {data.conceptCard1.badge}
                </span>
                <span className="text-[11px] font-mono text-[#16A34A] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] pulse-dot" />
                  UPI + COD Ready
                </span>
              </div>
              <h3 className="text-[20px] font-bold text-[#fcfcfc] tracking-tight uppercase font-[family-name:var(--font-display)]">
                {data.conceptCard1.title}
              </h3>
              <p className="text-[14px] text-[#d4d2d2] leading-relaxed font-light">
                {data.conceptCard1.desc}
              </p>
            </div>

            {/* Visual Image Preview */}
            <div className="relative mt-3 w-full h-40 sm:h-48 rounded-[6px] overflow-hidden border border-[#262525] bg-[#080808]">
              <Image
                src="/images/concept/hero-d2c.jpg"
                alt={data.conceptCard1.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between text-xs font-mono">
                <span className="text-[#fcfcfc] font-medium tracking-wider">checkout.store.ethixweb.in</span>
                <span className="text-[#fe1e34] font-bold">₹1,499 UPI</span>
              </div>
            </div>
          </div>

          {/* Concept Card 2: Clinic Booking */}
          <div className="group rounded-[8px] bg-[#171617] border border-[#262525] p-6 space-y-4 transition-all duration-200 hover:border-[#393939] flex flex-col justify-between overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-[3px] bg-[#262525] text-[#d4d2d2]">
                  {data.conceptCard2.badge}
                </span>
                <span className="text-[11px] font-mono text-[#25D366] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  WhatsApp Synced
                </span>
              </div>
              <h3 className="text-[20px] font-bold text-[#fcfcfc] tracking-tight uppercase font-[family-name:var(--font-display)]">
                {data.conceptCard2.title}
              </h3>
              <p className="text-[14px] text-[#d4d2d2] leading-relaxed font-light">
                {data.conceptCard2.desc}
              </p>
            </div>

            {/* Visual Image Preview */}
            <div className="relative mt-3 w-full h-40 sm:h-48 rounded-[6px] overflow-hidden border border-[#262525] bg-[#080808]">
              <Image
                src="/images/concept/hero-clinic.jpg"
                alt={data.conceptCard2.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between text-xs font-mono">
                <span className="text-[#fcfcfc] font-medium tracking-wider">drverma.clinic.ethixweb.in</span>
                <span className="text-[#25D366] font-bold">Slot: 02:30 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Line */}
        <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-[#525252] select-none tracking-[0.2em]">
          <span>DISCOVERY & ARCHITECTURE</span>
          <span className="hidden sm:inline">01 ────────────────────────────── 04</span>
          <span>PRODUCTION DEPLOYMENT</span>
        </div>
      </div>
    </section>
  );
}
