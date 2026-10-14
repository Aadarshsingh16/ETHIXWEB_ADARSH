import Image from "next/image";
import Link from "next/link";

interface HeroData {
  label: string;
  headingMain: string;
  headingLead?: string;
  headingAccent?: string;
  headingFade?: string;
  sub: string;
  ctaCall: string;
  ctaWork?: string;
  ctaWa?: string;
  card1Badge?: string;
  card2Badge?: string;
  conceptCard1?: {
    badge: string;
    title: string;
    desc: string;
  };
  conceptCard2?: {
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

export function Hero({ lang, data }: HeroProps) {
  const leadText = data.headingLead || "You run the ";
  const accentText = data.headingAccent || "business.";

  return (
    <section className="w-full bg-[#080808] border-b border-[#262525] pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 lg:pb-32 mb-16 sm:mb-24 relative overflow-hidden">
      {/* Ambient Void Video — preload="none" so it never blocks LCP/FCP */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
          style={{ willChange: "auto" }}
        >
          <source src="/videos/hero-ambient-void.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70 pointer-events-none" />
      </div>

      {/* Silky Smoke Ribbon Atmospheric Drift */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full object-cover opacity-45 mix-blend-screen"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="smokeFlow1" x1="40%" y1="100%" x2="90%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="65%" stopColor="#d4d4d8" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="smokeFlow2" x1="50%" y1="90%" x2="100%" y2="10%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%" stopColor="#f4f4f5" stopOpacity="0.32" />
              <stop offset="80%" stopColor="#a1a1aa" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id="smokeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
            <filter id="smokeSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
          </defs>

          {/* Primary deep smoke plume */}
          <path
            d="M 680,950 C 780,720 820,540 960,380 C 1100,220 1280,180 1480,80"
            stroke="url(#smokeFlow1)"
            strokeWidth="150"
            strokeLinecap="round"
            filter="url(#smokeGlow)"
          />

          {/* Secondary silky ribbon with sharper definition */}
          <path
            d="M 640,920 C 760,700 800,510 940,360 C 1080,210 1240,150 1440,60"
            stroke="url(#smokeFlow2)"
            strokeWidth="70"
            strokeLinecap="round"
            filter="url(#smokeSoft)"
          />

          {/* Dynamic wisps curving around the red accent */}
          <path
            d="M 720,900 C 820,740 890,620 1020,460 C 1150,300 1320,240 1460,180"
            stroke="url(#smokeFlow1)"
            strokeWidth="45"
            strokeLinecap="round"
            filter="url(#smokeSoft)"
          />
        </svg>
      </div>

      {/* Subtle Arterial Red ambient glow in top-right */}
      <div
        className="absolute top-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-[#fe1e34]/12 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        {/* Top Tagline with Red Star/Diamond Accent */}
        <div className="flex items-center gap-2 select-none animate-hero-rise">
          <span className="text-[#fe1e34] text-xs" aria-hidden="true">
            ✦
          </span>
          <span className="text-white/80 text-[13px] sm:text-[14px] font-medium tracking-wide">
            {data.label}
          </span>
        </div>

        {/* Monumental Display Headline */}
        <div className="max-w-5xl animate-hero-rise">
          <h1 className="text-[44px] sm:text-[68px] md:text-[84px] lg:text-[98px] xl:text-[108px] font-black tracking-tight leading-[0.96] text-white font-[family-name:var(--font-display)] select-none">
            {data.headingMain}
            <br />
            <span>{leadText}</span>
            <span className="text-[#fe1e34]">{accentText}</span>
          </h1>
        </div>

        {/* Bottom Split Layout: Value Prop + Action Buttons (Left) & Preview Cards + Timeline (Right) */}
        <div className="pt-4 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Subtitle + Action Buttons */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <p className="text-[15px] sm:text-[17px] text-[#a8a6a6] leading-relaxed max-w-xl font-normal">
              {data.sub}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Dark Pill Button: Explore Work · */}
              <Link
                href={`/${lang}#work`}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 backdrop-blur-sm transition-all duration-200"
              >
                <span>{data.ctaWork || "Explore Work ·"}</span>
              </Link>

              {/* Solid White Pill Button: Book a Call ↗ */}
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-[#ededed] text-black shadow-[0_4px_24px_rgba(255,255,255,0.15)] transition-all duration-200"
              >
                <span>{data.ctaCall || "Book a Call"}</span>
                <span
                  className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Two Landscape Preview Cards */}
          <div className="lg:col-span-5 flex flex-col items-end gap-3.5">
            <div className="flex items-center gap-3 sm:gap-3.5 w-full justify-end">
              {/* Card 1: Strategy & Tech */}
              <div className="relative w-[150px] sm:w-[185px] md:w-[215px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-[#141416]">
                <Image
                  src="/images/concept/hero-card-1.jpg"
                  alt={data.card1Badge || "Strategy & Tech"}
                  fill
                  priority
                  sizes="(max-width: 768px) 150px, 215px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Bottom-left Pill Badge */}
                <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-white shadow-lg pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34] animate-pulse" />
                  <span>{data.card1Badge || "Strategy & Tech"}</span>
                </div>
              </div>

              {/* Card 2: ethixweb® studio */}
              <div className="relative w-[150px] sm:w-[185px] md:w-[215px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-[#141416]">
                <Image
                  src="/images/concept/hero-card-2.jpg"
                  alt={data.card2Badge || "ethixweb® studio"}
                  fill
                  priority
                  sizes="(max-width: 768px) 150px, 215px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Bottom-left Pill Badge */}
                <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-white shadow-lg pointer-events-none">
                  {data.card2Badge || "ethixweb® studio"}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
