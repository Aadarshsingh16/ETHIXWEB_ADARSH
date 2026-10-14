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
    <section className="px-4 sm:px-6 mb-16 sm:mb-20">
      {/* The only large red-500 surface on the site, per Design System rule */}
      <div className="relative max-w-6xl mx-auto rounded-[28px] bg-[#C1272D] p-8 sm:p-14 lg:p-16 text-white overflow-hidden shadow-xl">
        {/* Subtle white Jaali lattice texture */}
        <div className="absolute inset-0 jaali-cta pointer-events-none opacity-40" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/15 text-white">
            <span>✦</span>
            <span>LET'S BUILD TOGETHER</span>
          </div>

          <h2 className="text-[32px] sm:text-[46px] lg:text-[56px] font-bold font-[family-name:var(--font-display)] tracking-tight leading-[1.05]">
            {data.heading}
          </h2>

          <p className="text-[17px] sm:text-[20px] text-white/90 leading-relaxed max-w-2xl">
            {data.sub}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              href={`/${lang}/contact`}
              arrow
              className="bg-white text-[#0C0C0D] hover:bg-[#F5F5F7] shadow-md"
            >
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
        </div>
      </div>
    </section>
  );
}
