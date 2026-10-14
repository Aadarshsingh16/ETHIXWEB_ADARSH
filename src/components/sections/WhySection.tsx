import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { FeatureCard } from "@/components/ui/FeatureCard";

interface WhyCard {
  title: string;
  desc: string;
}

interface WhyData {
  label: string;
  headingMain: string;
  headingFade: string;
  cards: WhyCard[];
}

interface WhySectionProps {
  data: WhyData;
}

export function WhySection({ data }: WhySectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
      <div className="space-y-4 mb-10">
        <SectionLabel>{data.label}</SectionLabel>
        <TwoToneHeading
          as="h2"
          main={data.headingMain}
          fade={data.headingFade}
          size="lg"
          className="max-w-3xl"
        />
      </div>

      {/* Bento grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cards.map((card, idx) => {
          // Span 2 columns on first card for bento hierarchy
          const isLarge = idx === 0 || idx === 3;

          return (
            <FeatureCard
              key={idx}
              className={`flex flex-col justify-between ${
                isLarge ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-full bg-[#FDECEC] text-[#C1272D] flex items-center justify-center font-bold text-sm">
                  ✦
                </div>
                <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#0C0C0D] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#6E6E73] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E6E6E8] flex items-center justify-between text-[12px] font-mono text-[#A1A1A6]">
                <span>ETHIXWEB INDIA SPECIFICATION</span>
                <span className="text-[#C1272D] font-bold">VERIFIED</span>
              </div>
            </FeatureCard>
          );
        })}
      </div>
    </section>
  );
}
