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
    <section className="w-full bg-[#080808] border-b border-[#262525] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 mb-16 sm:mb-24 relative overflow-hidden">
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

        {/* SVZ Concept Architecture Cards — Redesigned with Spacious Mockup Showcase */}
        <div className="pt-10 border-t border-[#262525] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Concept Card 1: D2C (Featured Arterial Red Border) */}
          <div className="group rounded-[8px] bg-[#171617] border border-[#fe1e34] p-6 sm:p-7 space-y-4 transition-all duration-300 hover:border-[#fe1e34] hover:shadow-[0_0_30px_rgba(254,30,52,0.14)] flex flex-col justify-between overflow-hidden shadow-[0_0_24px_rgba(254,30,52,0.12)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-[3px] bg-[#262525] text-[#d4d2d2] border border-[#393939]">
                  {data.conceptCard1.badge}
                </span>
                <span className="text-[11px] font-mono text-[#16A34A] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] pulse-dot" />
                  UPI + COD Ready
                </span>
              </div>
              <h3 className="text-[22px] font-bold text-[#fcfcfc] tracking-tight uppercase font-[family-name:var(--font-display)] group-hover:text-[#fe1e34] transition-colors duration-200">
                {data.conceptCard1.title}
              </h3>
              <p className="text-[14px] text-[#b5b2b2] leading-relaxed font-light">
                {data.conceptCard1.desc}
              </p>
            </div>

            {/* Visual Image Showcase — Generous aspect ratio with browser chrome */}
            <div className="mt-4 rounded-[6px] border border-[#262525] bg-[#080808] overflow-hidden flex flex-col">
              {/* Browser chrome header */}
              <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#262525] bg-[#121213] text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#262525]" />
                  <span className="w-2 h-2 rounded-full bg-[#262525]" />
                  <span className="w-2 h-2 rounded-full bg-[#262525]" />
                  <span className="text-[#8e8c8c] ml-1.5 tracking-wider text-[11px]">checkout.store.ethixweb.in</span>
                </div>
                <span className="text-[#fe1e34] font-bold text-[10px] tracking-widest uppercase">₹1,499 UPI</span>
              </div>

              {/* Full-view Image Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#080808]">
                <Image
                  src="/images/concept/hero-d2c.jpg"
                  alt={data.conceptCard1.title}
                  fill
                  className="object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Concept Card 2: Clinic Booking */}
          <div className="group rounded-[8px] bg-[#171617] border border-[#262525] p-6 sm:p-7 space-y-4 transition-all duration-300 hover:border-[#393939] hover:shadow-[0_0_24px_rgba(255,255,255,0.04)] flex flex-col justify-between overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-[3px] bg-[#262525] text-[#d4d2d2] border border-[#393939]">
                  {data.conceptCard2.badge}
                </span>
                <span className="text-[11px] font-mono text-[#25D366] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  WhatsApp Synced
                </span>
              </div>
              <h3 className="text-[22px] font-bold text-[#fcfcfc] tracking-tight uppercase font-[family-name:var(--font-display)] group-hover:text-[#fe1e34] transition-colors duration-200">
                {data.conceptCard2.title}
              </h3>
              <p className="text-[14px] text-[#b5b2b2] leading-relaxed font-light">
                {data.conceptCard2.desc}
              </p>
            </div>

            {/* Visual Image Showcase — Generous aspect ratio with browser chrome */}
            <div className="mt-4 rounded-[6px] border border-[#262525] bg-[#080808] overflow-hidden flex flex-col">
              {/* Browser chrome header */}
              <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#262525] bg-[#121213] text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#262525]" />
                  <span className="w-2 h-2 rounded-full bg-[#262525]" />
                  <span className="w-2 h-2 rounded-full bg-[#262525]" />
                  <span className="text-[#8e8c8c] ml-1.5 tracking-wider text-[11px]">drverma.clinic.ethixweb.in</span>
                </div>
                <span className="text-[#25D366] font-bold text-[10px] tracking-widest uppercase">Slot: 02:30 PM IST</span>
              </div>

              {/* Full-view Image Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#080808]">
                <Image
                  src="/images/concept/hero-clinic.jpg"
                  alt={data.conceptCard2.title}
                  fill
                  className="object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
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
