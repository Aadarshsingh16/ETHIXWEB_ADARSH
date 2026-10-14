import Link from "next/link";

interface ServiceItem {
  id: string;
  category: string;
  count: string;
  desc: string;
  indiaAngle: string;
  subServices: string[];
}

interface ServiceAccordionProps {
  services: ServiceItem[];
  lang?: string;
  exploreText?: string;
}

export function ServiceAccordion({
  services,
  lang = "en",
  exploreText = "Explore category",
}: ServiceAccordionProps) {
  return (
    <div className="divide-y divide-[#262525] border-y border-[#262525]">
      {services.map((item) => (
        <details
          key={item.id}
          name="services"
          className="group py-6 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-lg hover:bg-white/[0.02] transition-colors duration-200"
        >
          <summary className="flex items-center justify-between cursor-pointer list-none select-none">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pr-4">
              <h3 className="text-[22px] sm:text-[28px] font-bold text-[#fcfcfc] tracking-[-0.03em] font-[family-name:var(--font-display)] group-hover:text-[#fe1e34] transition-colors duration-160">
                {item.category}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-[3px] bg-[#171617] text-[#d4d2d2] border border-[#262525]">
                  {item.count}
                </span>
                <span className="hidden md:inline-block text-[13px] text-[#b5b2b2] font-light">
                  {item.subServices.slice(0, 2).join(" · ")}
                </span>
              </div>
            </div>

            {/* Hairline + / - indicator with SVZ 8px radius */}
            <div className="shrink-0 w-9 h-9 rounded-[8px] border border-[#262525] bg-[#171617]/50 flex items-center justify-center text-[#d4d2d2] group-hover:border-[#fe1e34] group-hover:text-[#fe1e34] group-hover:shadow-[0_0_14px_rgba(254,30,52,0.25)] transition-all duration-200">
              <span className="text-lg font-light transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </div>
          </summary>

          <div className="pt-6 pb-2 grid grid-cols-1 lg:grid-cols-12 gap-6 text-[#b5b2b2]">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#d4d2d2] font-light">
                {item.desc}
              </p>
              <div className="p-4 rounded-[8px] bg-[#171617] border border-[#262525] text-[13px] leading-relaxed">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34]" aria-hidden="true" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fcfcfc]">
                    India Operational Advantage
                  </span>
                </div>
                <span className="text-[#b5b2b2] font-light">{item.indiaAngle}</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {item.subServices.map((sub, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] font-mono uppercase tracking-[0.12em] px-2.5 py-1 rounded-[3px] bg-[#171617] text-[#d4d2d2] border border-[#262525]"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              <div>
                <Link
                  href={`/${lang}/services#${item.id}`}
                  className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[#fcfcfc] hover:text-[#fe1e34] transition-colors duration-160 group/cta"
                >
                  <span>{exploreText}</span>
                  <span className="transition-transform duration-160 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
