import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { ServiceAccordion } from "@/components/ui/ServiceAccordion";

interface ServiceItem {
  id: string;
  category: string;
  count: string;
  desc: string;
  indiaAngle: string;
  subServices: string[];
}

interface ServicesData {
  label: string;
  headingMain: string;
  headingFade: string;
  sub: string;
  exploreButton: string;
  items: ServiceItem[];
}

interface ServicesSectionProps {
  lang: string;
  data: ServicesData;
}

export function ServicesSection({ lang, data }: ServicesSectionProps) {
  return (
    <section id="services" className="w-full bg-[#080808] border-y border-[#262525] py-20 sm:py-28 mb-16 sm:mb-24 relative overflow-hidden">
      {/* Subtle arterial red ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#fe1e34]/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="max-w-3xl space-y-5">
          <SectionLabel theme="dark">{data.label}</SectionLabel>
          <TwoToneHeading
            as="h2"
            main={data.headingMain}
            fade={data.headingFade}
            size="lg"
            theme="dark"
          />
          <p className="text-[16px] sm:text-[18px] text-[#b5b2b2] leading-relaxed font-light">
            {data.sub}
          </p>
        </div>

        <ServiceAccordion
          services={data.items}
          lang={lang}
          exploreText={data.exploreButton}
        />
      </div>
    </section>
  );
}
