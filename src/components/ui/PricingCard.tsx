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
      className={`rounded-[28px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 ${
        isPopular
          ? "bg-[#0C0C0D] text-white border border-[#242426] ring-1 ring-[#C1272D]/30"
          : "bg-white dark:bg-[#161617] text-[#0C0C0D] dark:text-white border border-[#E6E6E8] dark:border-[#242426]"
      }`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] font-semibold tracking-tight">{plan.name}</h3>
          {isPopular && (
            <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#C1272D] text-white">
              Most Popular
            </span>
          )}
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] text-[#A1A1A6]">Starts at</span>
            <span className="text-[36px] sm:text-[44px] font-bold font-[family-name:var(--font-display)] tracking-tight">
              {plan.price}
            </span>
          </div>
          <span className="text-[12px] text-[#A1A1A6]">
            Indicative · excl. GST · final quote after discovery
          </span>
        </div>

        <p className={`text-[15px] leading-relaxed ${isPopular ? "text-[#A1A1A6]" : "text-[#6E6E73] dark:text-[#A1A1A6]"}`}>
          {plan.desc}
        </p>

        <div className={`pt-6 border-t ${isPopular ? "border-[#242426]" : "border-[#E6E6E8] dark:border-[#242426]"} space-y-3`}>
          <div className="text-[13px] font-semibold uppercase tracking-wider text-[#A1A1A6]">
            What&apos;s included:
          </div>
          <ul className="space-y-2.5 text-[14px]">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#C1272D] text-sm font-bold leading-tight" aria-hidden="true">
                  ✓
                </span>
                <span className={isPopular ? "text-[#E6E6E8]" : "text-[#0C0C0D] dark:text-[#E6E6E8]"}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8">
        <Button
          variant={isPopular ? "accent" : "primary"}
          href={`/${lang}/contact`}
          className="w-full"
          arrow
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}
