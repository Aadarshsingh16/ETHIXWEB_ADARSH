"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { StatusPill } from "@/components/ui/StatusPill";
import { LangToggle } from "@/components/ui/LangToggle";
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
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Main Navbar Pill */}
        <div className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 rounded-full bg-[#161617]/90 backdrop-blur-md border border-white/10 shadow-lg">
          {/* Logo */}
          <Logo lang={lang} theme="dark" />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-160 select-none ${
                    active
                      ? "bg-white text-[#0C0C0D] shadow-sm font-semibold"
                      : "text-[#A1A1A6] hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <StatusPill onlineText={labels.onlineIst} offlineText={labels.offlineIst} />
            </div>

            <LangToggle currentLang={lang} currentPath={pathname} theme="dark" />

            <div className="hidden md:block">
              <Button
                variant="accent"
                href={`/${lang}/contact`}
                className="h-9 px-4 text-xs font-semibold"
              >
                {labels.cta}
              </Button>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#C1272D]"
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
        <div className="lg:hidden mt-2 max-w-6xl mx-auto rounded-[24px] bg-[#161617]/95 backdrop-blur-xl border border-white/10 p-6 pointer-events-auto shadow-2xl transition-all duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-[17px] font-medium border-b border-white/5 ${
                  isActive(link.href) ? "text-[#C1272D] font-semibold" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <div className="sm:hidden">
                <StatusPill onlineText={labels.onlineIst} offlineText={labels.offlineIst} />
              </div>
              <Button
                variant="accent"
                href={`/${lang}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-sm"
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
