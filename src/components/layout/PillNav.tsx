"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { StatusPill } from "@/components/ui/StatusPill";
import { LangToggle } from "@/components/ui/LangToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

interface NavLabels {
  home: string;
  about: string;
  services: string;
  work: string;
  pricing: string;
  contact: string;
  cta: string;
  onlineIst: string;
  offlineIst: string;
}

interface PillNavProps {
  lang: string;
  labels: NavLabels;
}

export function PillNav({ lang, labels }: PillNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;

  const navLinks = [
    { href: `/${lang}`, label: labels.home, id: "home" },
    { href: `/${lang}/about`, label: labels.about, id: "about" },
    { href: `/${lang}/services`, label: labels.services, id: "services" },
    { href: `/${lang}#work`, label: labels.work, id: "work" },
    { href: `/${lang}#pricing`, label: labels.pricing, id: "pricing" },
    { href: `/${lang}/contact`, label: labels.contact, id: "contact" },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === `/${lang}` || pathname === `/${lang}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* SVZ-Inspired Floating Nav Bar with Hairline Borders */}
        <div className="w-full flex items-center justify-between gap-4 px-5 py-3 rounded-[8px] bg-[#080808]/90 backdrop-blur-md border border-[#262525] shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          {/* Logo */}
          <Logo lang={lang} theme="dark" />

          {/* Desktop Nav Links — SVZ 10-12px tracked uppercase labels */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-[4px] text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-160 select-none ${
                    active
                      ? "text-[#fcfcfc] border-b border-[#fe1e34] font-semibold"
                      : "text-[#d4d2d2]/70 hover:text-[#fcfcfc]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="hidden sm:block">
              <StatusPill />
            </div>

            <LangToggle currentLang={lang} currentPath={pathname} />

            <ThemeToggle />

            {/* SVZ Discovery Call Outlined Button */}
            <div className="hidden md:block">
              <Button
                variant="discovery"
                href={`/${lang}/contact`}
                className="h-8 px-3.5 text-[11px] tracking-[0.14em] rounded-[6px] whitespace-nowrap"
              >
                {labels.cta}
              </Button>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-[6px] text-white/90 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#fe1e34]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-[8px] bg-[#080808]/98 backdrop-blur-xl border border-[#262525] p-6 pointer-events-auto shadow-2xl transition-all duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-[13px] font-mono uppercase tracking-[0.16em] border-b border-[#262525] ${
                  isActive(link.href) ? "text-[#fe1e34] font-semibold" : "text-[#d4d2d2] hover:text-[#fcfcfc]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <StatusPill onlineText={labels.onlineIst} offlineText={labels.offlineIst} />
                <ThemeToggle />
              </div>
              <Button
                variant="discovery"
                href={`/${lang}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-xs"
              >
                {labels.cta}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
