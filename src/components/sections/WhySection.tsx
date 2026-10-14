import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

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
    <section className="w-full bg-[#f3efef] text-[#080808] border-y border-[#d4d2d2] py-20 sm:py-28 my-16 sm:my-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-4xl">
          <SectionLabel theme="light" hasDot={true}>
            {data.label}
          </SectionLabel>
          <TwoToneHeading
            as="h2"
            main={data.headingMain}
            fade={data.headingFade}
            size="lg"
            theme="light"
            italicFade={true}
          />
        </div>

        {/* SVZ Inverted Linen Bento Grid — 8px radius with 1px hairline border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.cards.map((card, idx) => {
            const isLarge = idx === 0 || idx === 3;

            return (
              <div
                key={idx}
                className={`rounded-[8px] bg-white border border-[#d4d2d2] p-8 flex flex-col justify-between transition-transform duration-200 ease-out hover:-translate-y-0.5 shadow-sm ${
                  isLarge ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-[4px] bg-[#080808] text-[#fcfcfc] flex items-center justify-center font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-[22px] font-bold text-[#080808] tracking-tight uppercase font-[family-name:var(--font-display)]">
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-[#525252] leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#d4d2d2]/60 flex items-center justify-between text-[11px] font-mono text-[#525252] tracking-[0.18em]">
                  <span>INDIA STACK ARCHITECTURE</span>
                  <span className="text-[#fe1e34] font-bold">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
