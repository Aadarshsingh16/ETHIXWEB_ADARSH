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
    <section id="services" className="w-full bg-[#0C0C0D] border-y border-[#242426] py-16 sm:py-24 mb-16 sm:mb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-4">
          <SectionLabel theme="dark">{data.label}</SectionLabel>
          <TwoToneHeading
            as="h2"
            main={data.headingMain}
            fade={data.headingFade}
            size="lg"
            theme="dark"
          />
          <p className="text-[16px] sm:text-[18px] text-[#A1A1A6] leading-relaxed">
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
