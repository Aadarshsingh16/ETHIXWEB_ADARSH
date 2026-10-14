import { Button } from "./Button";

interface PlanItem {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

interface PricingCardProps {
  plan: PlanItem;
  lang?: string;
}

export function PricingCard({ plan, lang = "en" }: PricingCardProps) {
  const isPopular = plan.popular;

  return (
    <div
      className={`rounded-[8px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 relative ${
        isPopular
          ? "bg-[#171617] text-[#fcfcfc] border border-[#fe1e34] shadow-[0_0_40px_rgba(254,30,52,0.12)]"
          : "bg-[#171617] text-[#fcfcfc] border border-[#262525] hover:border-[#393939]"
      }`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-[#fcfcfc] font-[family-name:var(--font-display)]">
            {plan.name}
          </h3>
          {isPopular && (
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-[3px] bg-[#fe1e34] text-white">
              Most Popular
            </span>
          )}
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[12px] font-mono uppercase tracking-[0.15em] text-[#b5b2b2]">Starts at</span>
            <span className="text-[36px] sm:text-[44px] font-bold font-[family-name:var(--font-display)] tracking-tight text-[#fcfcfc]">
              {plan.price}
            </span>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#8e8c8c] block mt-1">
            Indicative · excl. GST · final quote after discovery
          </span>
        </div>

        <p className="text-[14px] leading-relaxed text-[#b5b2b2] font-light">
          {plan.desc}
        </p>

        <div className="pt-6 border-t border-[#262525] space-y-3">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#8e8c8c]">
            What&apos;s included:
          </div>
          <ul className="space-y-2.5 text-[14px]">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#fe1e34] text-sm font-bold leading-tight" aria-hidden="true">
                  ✓
                </span>
                <span className="text-[#d4d2d2] font-light">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8">
        <Button
          variant={isPopular ? "accent" : "discovery"}
          href={`/${lang}/contact`}
          className="w-full justify-center"
          arrow
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}
