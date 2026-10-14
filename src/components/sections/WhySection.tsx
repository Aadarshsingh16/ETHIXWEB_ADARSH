"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

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
  shortLabel: string;
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
    shortLabel: "WhatsApp-First",
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
    shortLabel: "Dedicated IST",
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
    shortLabel: "One Team",
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
    shortLabel: "Rupee (₹) Pricing",
    tag: "COMMERCIAL CLARITY",
    title: "Transparent Rupee (₹) Pricing",
    desc: "Predictable upfront pricing with compliant GST invoices for input tax credits. Native UPI, NEFT, and Net Banking checkouts with zero hidden foreign exchange markups.",
    image: "/images/why/why-pricing.jpg",
    metaLeft: "GST INPUT CREDIT ELIGIBLE",
    metaRight: "NATIVE UPI + ZERO FX FEES",
    accentPill: "Standard GST Invoices",
  },
];

export function WhySection({ data }: WhySectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  const total = items.length;

  const goNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      goNext();
    } else if (e.key === "ArrowLeft") {
      goPrev();
    }
  };

  // Gentle autoplay with pause on interaction
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  return (
    <section
      className="w-full bg-[#080808] text-[#fcfcfc] border-y border-[#262525] py-16 sm:py-24 my-16 sm:my-24 overflow-hidden relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Why Ethixweb Interactive Slide Deck"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#fe1e34]/8 blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        {/* Section Header & Slide Navigation Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-2xl">
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

          {/* Navigation Controls: Tabs & Arrows */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            {/* Arrow Nav Buttons */}
            <div className="flex items-center gap-2 bg-[#121212] p-1 rounded-full border border-white/10 shadow-lg">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#fe1e34]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <span className="font-mono text-xs font-semibold px-2 text-[#fe1e34]">
                0{activeIdx + 1} <span className="text-white/30">/</span> 0{total}
              </span>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#fe1e34]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Pills Bar for One-Click Jump */}
        <div
          role="tablist"
          aria-label="Why Ethixweb Key Advantages"
          className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 pb-2"
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIdx(idx)}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 rounded-full font-mono text-xs transition-all duration-300 border ${
                  isActive
                    ? "bg-white/10 text-white border-[#fe1e34] shadow-[0_0_20px_rgba(254,30,52,0.2)] font-semibold"
                    : "bg-[#101010]/80 text-white/50 border-white/10 hover:border-white/25 hover:text-white"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isActive ? "bg-[#fe1e34] animate-pulse" : "bg-white/30"
                  }`}
                />
                <span className="text-[11px] font-bold text-[#fe1e34]">{item.number}</span>
                <span className="truncate">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Slide-Over Frame Container (Single Viewport Height) */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[#262525] bg-[#080808] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Horizontal Slide Track */}
          <div
            className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${activeIdx * 100}%)` }}
          >
            {items.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={item.id}
                  className="group w-full shrink-0 min-w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[560px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative select-none"
                >
                  {/* High-Resolution Photographic Artwork Background */}
                  <div className="absolute inset-0 overflow-hidden select-none">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Editorial Contrast Gradient: Image clearly visible on top/right, typography crystal-clear on bottom/left */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-black/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/40 to-transparent pointer-events-none" />

                    {/* Arterial Red Ambient Glow Accent */}
                    <div
                      className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#fe1e34]/20 blur-[90px] pointer-events-none"
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
                  <div className="relative z-10 space-y-4 sm:space-y-5 pt-16 sm:pt-20 max-w-3xl">
                    <h3 className="text-[28px] sm:text-[40px] lg:text-[48px] font-black uppercase text-[#fcfcfc] tracking-tight leading-[1] font-[family-name:var(--font-display)]">
                      {item.title}
                    </h3>

                    <p className="text-[14px] sm:text-[16px] text-[#d4d2d2] font-light leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>

                    {/* Footer Metadata Badges */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono tracking-[0.16em] text-[#b5b2b2]">
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
            })}
          </div>

          {/* Segmented Progress Bar at the bottom edge */}
          <div className="relative z-10 flex w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
            {items.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Jump to slide 0${idx + 1}`}
                  className="relative flex-1 h-1.5 transition-all group overflow-hidden"
                >
                  <div
                    className={`h-full transition-all duration-500 ${
                      isActive
                        ? "bg-[#fe1e34] shadow-[0_0_12px_#fe1e34]"
                        : "bg-white/15 group-hover:bg-white/30"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
