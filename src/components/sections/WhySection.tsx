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
    <section className="w-full bg-[#080808] text-[#fcfcfc] border-y border-[#262525] py-20 sm:py-28 my-16 sm:my-24 overflow-hidden relative">
      {/* Subtle ambient arterial red glow */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#fe1e34]/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="space-y-4 max-w-4xl">
          <SectionLabel theme="dark" hasDot={true}>
            {data.label}
          </SectionLabel>
          <TwoToneHeading
            as="h2"
            main={data.headingMain}
            fade={data.headingFade}
            size="lg"
            theme="dark"
            italicFade={true}
          />
        </div>

        {/* SVZ Bento Grid — 8px radius with 1px hairline border on Charcoal plate */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.cards.map((card, idx) => {
            const isLarge = idx === 0 || idx === 3;

            return (
              <div
                key={idx}
                className={`group rounded-[8px] bg-[#171617] border border-[#262525] p-8 flex flex-col justify-between transition-all duration-300 ease-out hover:border-[#fe1e34]/60 hover:shadow-[0_0_24px_rgba(254,30,52,0.1)] hover:-translate-y-1 ${
                  isLarge ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-[4px] bg-[#080808] border border-[#262525] text-[#fe1e34] flex items-center justify-center font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-[22px] font-bold text-[#fcfcfc] tracking-tight uppercase font-[family-name:var(--font-display)] group-hover:text-[#fe1e34] transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#b5b2b2] leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#262525] flex items-center justify-between text-[11px] font-mono text-[#8e8c8c] tracking-[0.18em]">
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
