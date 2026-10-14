import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqData {
  label: string;
  headingMain: string;
  headingFade: string;
  sideCtaHeading: string;
  sideCtaText: string;
  sideCtaBtn: string;
  items: FaqItem[];
}

interface FaqSectionProps {
  data: FaqData;
}

export function FaqSection({ data }: FaqSectionProps) {
  return (
    <section id="faq" className="w-full bg-[#0C0C0D] border-y border-[#242426] py-16 sm:py-24 mb-16 sm:mb-24">
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
        </div>

        <FaqAccordion
          items={data.items}
          sideCtaHeading={data.sideCtaHeading}
          sideCtaText={data.sideCtaText}
          sideCtaBtn={data.sideCtaBtn}
        />
      </div>
    </section>
  );
}
