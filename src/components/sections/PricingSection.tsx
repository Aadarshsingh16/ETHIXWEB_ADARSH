import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { PricingCard } from "@/components/ui/PricingCard";

interface PlanItem {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

interface PricingData {
  label: string;
  headingMain: string;
  headingFade: string;
  disclaimer: string;
  plans: PlanItem[];
}

interface PricingSectionProps {
  lang: string;
  data: PricingData;
}

export function PricingSection({ lang, data }: PricingSectionProps) {
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
      <div className="space-y-4 mb-12">
        <SectionLabel>{data.label}</SectionLabel>
        <TwoToneHeading
          as="h2"
          main={data.headingMain}
          fade={data.headingFade}
          size="lg"
          className="max-w-3xl"
        />
        <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-[#8e8c8c] max-w-2xl">
          {data.disclaimer}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {data.plans.map((plan, idx) => (
          <PricingCard key={idx} plan={plan} lang={lang} />
        ))}
      </div>
    </section>
  );
}
