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
    <div className="divide-y divide-[#242426] border-y border-[#242426]">
      {services.map((item, index) => (
        <details
          key={item.id}
          name="services"
          className="group py-6 transition-colors duration-200"
          open={index === 0}
        >
          <summary className="flex items-center justify-between cursor-pointer list-none select-none">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pr-4">
              <h3 className="text-[22px] sm:text-[28px] font-semibold text-white tracking-tight group-hover:text-[#C1272D] transition-colors duration-160">
                {item.category}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-[#242426] text-[#A1A1A6]">
                  {item.count}
                </span>
                <span className="hidden md:inline-block text-[13px] text-[#A1A1A6]">
                  {item.subServices.slice(0, 2).join(" · ")}
                </span>
              </div>
            </div>

            {/* Rotating + / - indicator */}
            <div className="shrink-0 w-10 h-10 rounded-full border border-[#242426] flex items-center justify-center text-white/80 group-hover:border-[#C1272D] group-hover:text-white transition-colors duration-160">
              <span className="text-xl font-light transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </div>
          </summary>

          <div className="pt-6 pb-2 grid grid-cols-1 lg:grid-cols-12 gap-6 text-[#A1A1A6]">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-[#E6E6E8]">
                {item.desc}
              </p>
              <div className="p-4 rounded-xl bg-[#161617] border border-[#242426] text-[14px] leading-relaxed">
                <span className="font-semibold text-white block mb-1">
                  India operational advantage:
                </span>
                <span className="text-[#A1A1A6]">{item.indiaAngle}</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {item.subServices.map((sub, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[12px] px-3 py-1.5 rounded-full bg-[#161617] text-[#E6E6E8] border border-[#242426]"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              <div>
                <Link
                  href={`/${lang}/services#${item.id}`}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-[#C1272D] transition-colors"
                >
                  <span>{exploreText}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
