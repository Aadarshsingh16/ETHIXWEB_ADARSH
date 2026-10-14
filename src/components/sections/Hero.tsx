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
    <section className="px-4 sm:px-6 mb-16 sm:mb-24">
      {/* Dark Inset Card (Covix style, 28px radius) */}
      <div className="relative max-w-6xl mx-auto rounded-[28px] bg-[#0C0C0D] border border-[#242426] p-6 sm:p-12 lg:p-16 overflow-hidden">
        {/* Subtle red corner ambient glow */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C1272D]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Jaali lattice pattern masked in top-right */}
        <div className="absolute inset-0 jaali pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 space-y-8">
          {/* Top Label with ✦ */}
          <div>
            <SectionLabel theme="dark">{data.label}</SectionLabel>
          </div>

          {/* H1 Headline — Server rendered, painted at first frame for LCP 95+ */}
          <div className="max-w-4xl space-y-4">
            <TwoToneHeading
              as="h1"
              main={data.headingMain}
              fade={data.headingFade}
              size="xl"
              theme="dark"
            />

            {/* Bilingual Hindi sub-heading visible above the fold on English page */}
            {!isHindi && (
              <p
                lang="hi"
                className="text-[18px] sm:text-[22px] text-[#A1A1A6] font-medium font-[family-name:var(--font-deva)] tracking-normal"
              >
                आपका बिज़नेस, अब ऑनलाइन और हमेशा बुक।
              </p>
            )}

            {/* Value Proposition with Indian market highlights */}
            <p className="text-[17px] sm:text-[20px] text-[#A1A1A6] leading-relaxed max-w-2xl pt-2">
              {data.sub}
            </p>
          </div>

          {/* Action Row */}
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
          </div>

          {/* Concept Architecture Cards Preview */}
          <div className="pt-8 border-t border-[#242426] grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Concept Card 1 */}
            <div className="rounded-[20px] bg-[#161617] border border-[#242426] p-5 space-y-3 transition-colors duration-200 hover:border-[#38383B]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#242426] text-[#A1A1A6]">
                  {data.conceptCard1.badge}
                </span>
                <span className="text-[12px] font-mono text-[#16A34A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] pulse-dot" />
                  UPI + COD Ready
                </span>
              </div>
              <h3 className="text-[18px] font-semibold text-white tracking-tight">
                {data.conceptCard1.title}
              </h3>
              <p className="text-[14px] text-[#A1A1A6] leading-relaxed">
                {data.conceptCard1.desc}
              </p>
            </div>

            {/* Concept Card 2 */}
            <div className="rounded-[20px] bg-[#161617] border border-[#242426] p-5 space-y-3 transition-colors duration-200 hover:border-[#38383B]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#242426] text-[#A1A1A6]">
                  {data.conceptCard2.badge}
                </span>
                <span className="text-[12px] font-mono text-[#25D366] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  WhatsApp Synced
                </span>
              </div>
              <h3 className="text-[18px] font-semibold text-white tracking-tight">
                {data.conceptCard2.title}
              </h3>
              <p className="text-[14px] text-[#A1A1A6] leading-relaxed">
                {data.conceptCard2.desc}
              </p>
            </div>
          </div>

          {/* Bottom Progress Line 01 ── 04 */}
          <div className="flex items-center justify-between pt-2 text-[12px] font-mono text-[#6E6E73] select-none">
            <span>DISCOVERY & ARCHITECTURE</span>
            <span className="tracking-widest">01 ────────── 04</span>
            <span>PRODUCTION DEPLOYMENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
