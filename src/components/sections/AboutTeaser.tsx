import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { ChamferCard } from "@/components/ui/ChamferCard";

interface AboutTeaserData {
  label: string;
  headingMain: string;
  headingFade: string;
  statTrustpilot: string;
  trustpilotLink: string;
  statServices: string;
  statAvailability: string;
}

interface AboutTeaserProps {
  lang: string;
  data: AboutTeaserData;
}

export function AboutTeaser({ lang, data }: AboutTeaserProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24 space-y-10">
      <div>
        <SectionLabel>{data.label}</SectionLabel>
        <TwoToneHeading
          as="h2"
          main={data.headingMain}
          fade={data.headingFade}
          size="lg"
          className="mt-4 max-w-4xl"
        />
      </div>

      {/* 2 Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Card 1: Trustpilot */}
        <ChamferCard>
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-[#25D366]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#fcfcfc] tracking-[-0.03em] font-[family-name:var(--font-display)]">
              {data.statTrustpilot}
            </h3>

            <p className="text-[14px] sm:text-[15px] text-[#b5b2b2] leading-relaxed font-light">
              Real client ratings verified on Trustpilot for global development and digital operations excellence.
            </p>

            <div>
              <a
                href="https://www.trustpilot.com/review/ethixweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[#fe1e34] hover:text-white transition-colors duration-160 group/cta"
              >
                <span>{data.trustpilotLink}</span>
                <span className="transition-transform duration-160 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </ChamferCard>

        {/* Card 2: 22 Services & Hub */}
        <ChamferCard>
          <div className="space-y-4">
            <div className="w-8 h-8 rounded-[3px] bg-[#080808] border border-[#262525] text-[#fe1e34] flex items-center justify-center font-bold text-xs">
              ✦
            </div>

            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#fcfcfc] tracking-[-0.03em] font-[family-name:var(--font-display)]">
              {data.statServices}
            </h3>

            <p className="text-[14px] sm:text-[15px] text-[#b5b2b2] leading-relaxed font-light">
              {data.statAvailability}. Seattle, Utah, New York, Canada, UK, and our specialized India delivery team.
            </p>

            <div>
              <Link
                href={`/${lang}/about`}
                className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[#fcfcfc] hover:text-[#fe1e34] transition-colors duration-160 group/cta"
              >
                <span>Read our India story</span>
                <span className="transition-transform duration-160 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </ChamferCard>
      </div>
    </section>
  );
}
