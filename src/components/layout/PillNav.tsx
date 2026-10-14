"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { LangToggle } from "@/components/ui/LangToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
    <header className="fixed top-5 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Logo with India Badge */}
        <Logo lang={lang} />

        {/* Center: Floating Capsule Nav Bar */}
        <nav
          className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/95 dark:bg-[#141416]/95 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          aria-label="Main Navigation"
        >
          {navLinks.slice(0, 5).map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none ${
                  active
                    ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm"
                    : "text-neutral-700 hover:text-black dark:text-white/70 dark:hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Online status, Lang toggle, Theme toggle, Start Project button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <LangToggle currentLang={lang} currentPath={pathname} />

          <ThemeToggle />

          {/* Primary Pill CTA Button */}
          <Link
            href={`/${lang}/contact`}
            className="hidden md:inline-flex items-center gap-1.5 h-8 px-4 rounded-full text-xs font-medium bg-white/90 dark:bg-white/[0.06] hover:bg-neutral-100 dark:hover:bg-white/[0.12] text-neutral-900 dark:text-white border border-black/10 dark:border-white/15 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-200 whitespace-nowrap"
          >
            <span>{labels.cta}</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-neutral-800 dark:text-white/90 hover:text-black dark:hover:text-white bg-white/90 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#fe1e34]"
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

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-md mx-auto rounded-2xl bg-white/98 dark:bg-[#0e0e10]/98 backdrop-blur-xl border border-black/10 dark:border-white/10 p-5 pointer-events-auto shadow-2xl transition-all duration-200">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                    : "text-neutral-700 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-end">
                <ThemeToggle />
              </div>
              <Link
                href={`/${lang}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full text-center text-xs font-semibold bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-white/90 transition-all shadow-md"
              >
                {labels.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
