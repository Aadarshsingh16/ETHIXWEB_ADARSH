"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { ParticleMorphCanvas } from "@/components/ui/ParticleMorphCanvas";

interface WhyCard {
  title: string;
  desc: string;
}

interface WhyData {
  label: string;
  headingMain: string;
  headingFade: string;
  cards: WhyCard[];
}

interface WhySectionProps {
  data: WhyData;
}

interface ParallaxItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  metaLeft: string;
  metaRight: string;
  accentPill: string;
}

const PARALLAX_ITEMS: ParallaxItem[] = [
  {
    id: "whatsapp",
    number: "01",
    tag: "COMMUNICATION ARCHITECTURE",
    title: "WhatsApp-First Operations",
    desc: "Enquiries, follow-ups, and notifications land right where 500M+ Indians communicate every single day. Automated qualification, real-time reminders, and zero missed after-hours leads.",
    image: "/images/why/why-whatsapp.jpg",
    metaLeft: "NATIVE HINGLISH NLP",
    metaRight: "500M+ ACTIVE AUDIENCE",
    accentPill: "Instant WhatsApp Sync",
  },
  {
    id: "ist",
    number: "02",
    tag: "TIMEZONE ALIGNMENT",
    title: "Dedicated IST Support",
    desc: "No waiting 12 hours for a US or UK time zone to wake up. Our core engineering and growth team operates in sync with your business hours, delivering rapid same-day deployments.",
    image: "/images/why/why-ist.jpg",
    metaLeft: "MUMBAI (BOM) DELIVERY HUB",
    metaRight: "100% IST WORKING HOURS",
    accentPill: "Same-Day Turnaround",
  },
  {
    id: "team",
    number: "03",
    tag: "FULL-STACK OWNERSHIP",
    title: "One Accountable Team",
    desc: "22 specialized capabilities under one roof. No finger-pointing between your web developer, ad agency, CRM vendor, and chatbot provider. Single point of contact, guaranteed ownership.",
    image: "/images/why/why-team.jpg",
    metaLeft: "CROSS-FUNCTIONAL STUDIO",
    metaRight: "SINGLE POINT OF CONTACT",
    accentPill: "22 Disciplines Unified",
  },
  {
    id: "pricing",
    number: "04",
    tag: "COMMERCIAL CLARITY",
    title: "Transparent Rupee (₹) Pricing",
    desc: "Predictable upfront pricing with compliant GST invoices for input tax credits. Native UPI, NEFT, and Net Banking checkouts with zero hidden foreign exchange markups.",
    image: "/images/why/why-pricing.jpg",
    metaLeft: "GST INPUT CREDIT ELIGIBLE",
    metaRight: "NATIVE UPI + ZERO FX FEES",
    accentPill: "Standard GST Invoices",
  },
];

function ParallaxCard({
  item,
}: {
  item: ParallaxItem;
}) {
  return (
    <div
      className="group relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] rounded-2xl overflow-hidden flex flex-col justify-between p-7 sm:p-10 lg:p-14 border border-[#262525] hover:border-[#fe1e34]/70 transition-colors duration-500 shadow-2xl bg-[#080808]"
    >
      {/* Interactive Particle Morph Background Container */}
      <div className="absolute inset-0 overflow-hidden select-none">
        <ParticleMorphCanvas
          imageSrc={item.image}
          title={item.title}
          accentColor="#fe1e34"
        />

        {/* Dramatic Multi-Stop Obsidian Vignette Overlay (pointer-events-none so canvas receives gestures) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/40 to-[#080808] pointer-events-none" />

        {/* Arterial Red Ambient Glow Accent */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#fe1e34]/15 blur-[90px] pointer-events-none group-hover:bg-[#fe1e34]/25 transition-all duration-500"
          aria-hidden="true"
        />
      </div>

      {/* Top Header Row inside Card */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#fe1e34] tracking-widest px-3 py-1 rounded-full bg-[#080808]/85 border border-[#fe1e34]/40 backdrop-blur-md shadow-lg">
            {item.number}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d4d2d2] hidden sm:inline">
            {item.tag}
          </span>
        </div>

        {/* Frosted Accent Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34] animate-pulse" />
          <span>{item.accentPill}</span>
        </div>
      </div>

      {/* Bottom Main Content Layer */}
      <div className="relative z-10 space-y-4 sm:space-y-6 pt-16 sm:pt-24 max-w-3xl">
        <h3 className="text-[30px] sm:text-[44px] lg:text-[54px] font-black uppercase text-[#fcfcfc] tracking-tight leading-[0.98] font-[family-name:var(--font-display)] group-hover:text-[#fe1e34] transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-[15px] sm:text-[18px] text-[#d4d2d2] font-light leading-relaxed max-w-2xl">
          {item.desc}
        </p>

        {/* Footer Metadata Badges */}
        <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono tracking-[0.16em] text-[#b5b2b2]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            {item.metaLeft}
          </span>
          <span className="text-[#fe1e34] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34]" />
            {item.metaRight}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WhySection({ data }: WhySectionProps) {
  // Merge customized descriptions if available in dictionary
  const items = PARALLAX_ITEMS.map((item, idx) => {
    if (data.cards && data.cards[idx]) {
      return {
        ...item,
        title: data.cards[idx].title || item.title,
        desc: data.cards[idx].desc || item.desc,
      };
    }
    return item;
  });

  return (
    <section className="w-full bg-[#080808] text-[#fcfcfc] border-y border-[#262525] py-20 sm:py-28 my-16 sm:my-24 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#fe1e34]/8 blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <SectionLabel theme="dark" hasDot={true}>
            {data.label}
          </SectionLabel>
          <TwoToneHeading
            as="h2"
            main={data.headingMain}
            fade={data.headingFade}
            size="lg"
            theme="dark"
            italicFade={true}
          />
        </div>

        {/* Full-Bleed Parallax Cinematic Showcase */}
        <div className="space-y-8 sm:space-y-12">
          {items.map((item) => (
            <ParallaxCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
