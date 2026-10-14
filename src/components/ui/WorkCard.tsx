import React from "react";
import Image from "next/image";

interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  badge: string;
}

interface WorkCardProps {
  project: ProjectItem;
  index: number;
}

export function WorkCard({ project, index }: WorkCardProps) {
  const isFirst = index === 0;

  return (
    <div
      className="sticky top-[90px] w-full mb-8 last:mb-0 transition-transform duration-200"
      style={{
        top: `calc(80px + ${index * 16}px)`,
      }}
    >
      {/* SVZ Gallery Card — 8px radius with 1px border; arterial red on first featured */}
      <div
        className={`group rounded-[8px] bg-white dark:bg-[#171617] border p-6 sm:p-10 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300 hover:border-[#fe1e34]/70 hover:shadow-[0_0_30px_rgba(254,30,52,0.1)] ${
          isFirst
            ? "border-[#fe1e34] shadow-[0_0_24px_rgba(254,30,52,0.12)]"
            : "border-[#d4d2d2] dark:border-[#262525]"
        }`}
      >
        {/* Left: Info */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase px-2.5 py-1 rounded-[3px] bg-[#f3efef] dark:bg-[#262525] text-[#525252] dark:text-[#d4d2d2] border border-[#d4d2d2] dark:border-[#393939]">
              {project.badge}
            </span>
          </div>

          <h3 className="text-[28px] sm:text-[38px] font-bold text-[#080808] dark:text-[#fcfcfc] tracking-[-0.035em] leading-[1.04] uppercase font-[family-name:var(--font-display)] group-hover:text-[#fe1e34] transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-[15px] sm:text-[17px] text-[#525252] dark:text-[#d4d2d2] leading-relaxed font-light">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] font-mono uppercase tracking-[0.12em] px-3 py-1 rounded-[3px] bg-[#f3efef] dark:bg-[#262525] text-[#080808] dark:text-[#fcfcfc] border border-[#d4d2d2] dark:border-[#393939]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[#080808] dark:text-[#fcfcfc] group-hover:text-[#fe1e34] transition-colors duration-160">
              <span>View Case Architecture</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span>
            </span>
          </div>
        </div>

        {/* Right: Indian Market Architecture Mockup / Image Container */}
        <div className="lg:col-span-6">
          <div className="rounded-[8px] bg-[#f3efef] dark:bg-[#080808] border border-[#d4d2d2] dark:border-[#262525] p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative">
            {/* Browser top-bar */}
            <div className="flex items-center justify-between border-b border-[#d4d2d2] dark:border-[#262525] pb-3 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4d2d2] dark:bg-[#262525]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4d2d2] dark:bg-[#262525]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4d2d2] dark:bg-[#262525]" />
              </div>
              <div className="text-[11px] font-mono text-[#525252] dark:text-[#d4d2d2] px-3 py-0.5 rounded-[3px] bg-white dark:bg-[#171617] border border-[#d4d2d2] dark:border-[#262525] tracking-wider">
                {project.id}.ethixweb.in
              </div>
              <span className="w-2.5 h-2.5" />
            </div>

            {/* Real High-Resolution Concept Mockup Image */}
            <div className="relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#d4d2d2] dark:border-[#262525] bg-[#080808] my-2 group/img">
              <Image
                src={`/images/concept/work-${project.id}.jpg`}
                alt={project.title}
                fill
                className="object-contain sm:object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Bottom metric */}
            <div className="flex items-center justify-between pt-2 border-t border-[#d4d2d2] dark:border-[#262525] text-[11px] font-mono text-[#525252] dark:text-[#d4d2d2] tracking-[0.14em]">
              <span>CORE WEB VITALS 95+</span>
              <span className="font-semibold text-[#fe1e34]">
                INDIA STACK ARCHITECTURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
