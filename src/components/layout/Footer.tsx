import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

interface FooterData {
  tagline: string;
  desc: string;
  quickLinks: string;
  servicesTitle: string;
  legalTitle: string;
  contactTitle: string;
  copyright: string;
  privacy: string;
  adminLogin: string;
  hours: string;
}

interface FooterProps {
  lang: string;
  data: FooterData;
}

export function Footer({ lang, data }: FooterProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Ethixweb, I'd like to discuss a project.")}`;

  return (
    <footer className="relative bg-[#080808] text-[#fcfcfc] pt-20 sm:pt-24 pb-0 overflow-hidden border-t border-[#262525]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          {/* Col 1: Brand & Narrative */}
          <div className="lg:col-span-4 space-y-5">
            <Logo lang={lang} theme="dark" />
            <p className="text-[14px] text-[#b5b2b2] leading-relaxed max-w-sm font-light">
              {data.desc}
            </p>
            <div className="pt-2 text-[12px] font-mono text-[#8e8c8c] space-y-1">
              <span className="text-[#fe1e34] uppercase tracking-[0.15em] block">
                {data.tagline}
              </span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" aria-hidden="true" />
                <span className="text-[#d4d2d2]">{data.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#fcfcfc]">
              {data.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#b5b2b2] font-light">
              <li>
                <Link href={`/${lang}`} className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#work`} className="hover:text-white transition-colors">
                  Featured Work
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#pricing`} className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Disciplines */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#fcfcfc]">
              {data.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#b5b2b2] font-light">
              <li>
                <Link href={`/${lang}/services#website`} className="hover:text-[#fcfcfc] transition-colors">
                  Websites & Redesigns (4)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#ai`} className="hover:text-[#fcfcfc] transition-colors">
                  AI Chatbots & Agents (4)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#growth`} className="hover:text-[#fcfcfc] transition-colors">
                  SEO & Ads Engine (6)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#data`} className="hover:text-[#fcfcfc] transition-colors">
                  Analytics & Tracking (3)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#accessibility`} className="hover:text-[#fcfcfc] transition-colors">
                  Accessibility AA (2)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#support`} className="hover:text-[#fcfcfc] transition-colors">
                  IST Priority Support (3)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Legal */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#fcfcfc]">
              {data.contactTitle}
            </h4>
            <div className="space-y-2.5 text-[13px] text-[#b5b2b2] font-light">
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-medium"
                >
                  WhatsApp: +{whatsappNumber}
                </a>
              </div>
              <div>
                <a href="mailto:india@ethixweb.com" className="hover:text-[#fcfcfc] transition-colors">
                  india@ethixweb.com
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262525] space-y-2 text-[12px] font-mono uppercase tracking-[0.12em]">
              <div>
                <Link href={`/${lang}/privacy`} className="text-[#8e8c8c] hover:text-[#fcfcfc] transition-colors">
                  {data.privacy}
                </Link>
              </div>
              <div>
                <Link href="/admin/login" className="text-[#8e8c8c] hover:text-[#fcfcfc] transition-colors">
                  {data.adminLogin}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-[#262525] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.15em] text-[#8e8c8c]">
          <div>
            © 2026 {data.copyright}
          </div>
          <div className="flex items-center gap-4">
            <span>Made for Indian Businesses</span>
            <span>·</span>
            <span>GST Invoicing</span>
            <span>·</span>
            <span>UPI Payments</span>
          </div>
        </div>
      </div>

      {/* Giant cropped ETHIXWEB wordmark at bottom */}
      <div
        className="w-full select-none pointer-events-none opacity-[0.04] flex justify-center -mb-6 sm:-mb-10 lg:-mb-14 overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-extrabold text-[18vw] leading-none tracking-tighter text-[#fcfcfc] font-[family-name:var(--font-display)]">
          ETHIXWEB
        </span>
      </div>
    </footer>
  );
}
