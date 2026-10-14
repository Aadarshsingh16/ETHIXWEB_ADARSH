import { Button } from "@/components/ui/Button";

interface CtaBandData {
  heading: string;
  sub: string;
  ctaCall: string;
  ctaWa: string;
}

interface CtaBandProps {
  lang: string;
  data: CtaBandData;
}

export function CtaBand({ lang, data }: CtaBandProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Ethixweb, I'm ready to get more enquiries from India for my business."
  )}`;

  return (
    <section className="px-4 sm:px-6 mb-20 sm:mb-28">
      <div className="relative max-w-6xl mx-auto rounded-[14.4px] bg-[#171617] border border-[#fe1e34] p-8 sm:p-14 lg:p-16 text-[#fcfcfc] overflow-hidden shadow-[0_0_60px_rgba(254,30,52,0.12)]">
        {/* Atmospheric arterial red radial glow */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#fe1e34]/15 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2.5 text-[11px] font-mono font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-[3px] bg-[#080808] border border-[#262525] text-[#fcfcfc]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34] animate-pulse" aria-hidden="true" />
            <span>DIRECT ENGAGEMENT · DISCOVERY</span>
          </div>

          <h2 className="text-[32px] sm:text-[48px] lg:text-[60px] font-bold font-[family-name:var(--font-display)] tracking-[-0.04em] leading-[1.02] text-[#fcfcfc]">
            {data.heading}
          </h2>

          <p className="text-[16px] sm:text-[19px] text-[#b5b2b2] leading-relaxed max-w-2xl font-light">
            {data.sub}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="accent"
              href={`/${lang}/contact`}
              arrow
              className="text-[12px] font-mono tracking-[0.16em] uppercase"
            >
              {data.ctaCall}
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappUrl}
              external
              aria-label="Chat on WhatsApp (opens in a new tab)"
              className="text-[12px] font-mono tracking-[0.14em]"
            >
              {data.ctaWa}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
