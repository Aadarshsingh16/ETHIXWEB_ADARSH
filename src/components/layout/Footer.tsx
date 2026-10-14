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
    <footer className="relative bg-[#0C0C0D] text-white pt-16 sm:pt-20 pb-0 overflow-hidden border-t border-[#242426]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16">
          {/* Col 1: Brand & Narrative */}
          <div className="lg:col-span-4 space-y-4">
            <Logo lang={lang} theme="dark" />
            <p className="text-[14px] text-[#A1A1A6] leading-relaxed max-w-sm">
              {data.desc}
            </p>
            <div className="pt-2 text-[13px] text-[#A1A1A6]">
              <span className="text-[#C1272D] font-semibold block mb-1">
                {data.tagline}
              </span>
              <span>{data.hours}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-white">
              {data.quickLinks}
            </h4>
            <ul className="space-y-2 text-[14px] text-[#A1A1A6]">
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
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-white">
              {data.servicesTitle}
            </h4>
            <ul className="space-y-2 text-[14px] text-[#A1A1A6]">
              <li>
                <Link href={`/${lang}/services#website`} className="hover:text-white transition-colors">
                  Websites & Redesigns (4)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#ai`} className="hover:text-white transition-colors">
                  AI Chatbots & Agents (4)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#growth`} className="hover:text-white transition-colors">
                  SEO & Ads Engine (6)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#data`} className="hover:text-white transition-colors">
                  Analytics & Tracking (3)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#accessibility`} className="hover:text-white transition-colors">
                  Accessibility AA (2)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services#support`} className="hover:text-white transition-colors">
                  IST Priority Support (3)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Legal */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-white">
              {data.contactTitle}
            </h4>
            <div className="space-y-2 text-[14px] text-[#A1A1A6]">
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
                <a href="mailto:india@ethixweb.com" className="hover:text-white transition-colors">
                  india@ethixweb.com
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#242426] space-y-2 text-[13px]">
              <div>
                <Link href={`/${lang}/privacy`} className="text-[#A1A1A6] hover:text-white transition-colors">
                  {data.privacy}
                </Link>
              </div>
              <div>
                <Link href="/admin/login" className="text-[#A1A1A6] hover:text-white transition-colors">
                  {data.adminLogin}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-[#242426] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#6E6E73]">
          <div>
            © {new Date().getFullYear()} {data.copyright}
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
        className="w-full select-none pointer-events-none opacity-[0.06] flex justify-center -mb-6 sm:-mb-10 lg:-mb-14 overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-extrabold text-[18vw] leading-none tracking-tighter text-white font-[family-name:var(--font-display)]">
          ETHIXWEB
        </span>
      </div>
    </footer>
  );
}
