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
  // Color palette variation for mockups (flat tones, no generic blue/green)
  const mockupAccents = ["#C1272D", "#161617", "#242426", "#0C0C0D", "#A51F25"];
  const accent = mockupAccents[index % mockupAccents.length];

  return (
    <div
      className="sticky top-[100px] w-full mb-8 last:mb-0 transition-transform duration-200"
      style={{
        top: `calc(90px + ${index * 16}px)`,
      }}
    >
      <div className="rounded-[28px] bg-white dark:bg-[#161617] border border-[#E6E6E8] dark:border-[#242426] p-6 sm:p-10 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Info */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#F5F5F7] dark:bg-[#242426] text-[#6E6E73] dark:text-[#A1A1A6] border border-[#E6E6E8] dark:border-[#2E2E31]">
              {project.badge}
            </span>
          </div>

          <h3 className="text-[26px] sm:text-[34px] font-semibold text-[#0C0C0D] dark:text-white tracking-tight leading-tight">
            {project.title}
          </h3>

          <p className="text-[16px] sm:text-[18px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[13px] px-3 py-1 rounded-full bg-[#F5F5F7] dark:bg-[#242426] text-[#0C0C0D] dark:text-[#E6E6E8] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Indian Market Architecture Mockup / Image Container */}
        <div className="lg:col-span-6">
          <div className="rounded-[20px] bg-[#F5F5F7] dark:bg-[#0C0C0D] border border-[#E6E6E8] dark:border-[#242426] p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Browser top-bar */}
            <div className="flex items-center justify-between border-b border-[#E6E6E8] dark:border-[#242426] pb-3 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8] dark:bg-[#2E2E31]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8] dark:bg-[#2E2E31]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8] dark:bg-[#2E2E31]" />
              </div>
              <div className="text-[11px] font-mono text-[#6E6E73] dark:text-[#A1A1A6] px-3 py-0.5 rounded-md bg-white dark:bg-[#161617] border border-[#E6E6E8] dark:border-[#242426]">
                {project.id}.ethixweb.in
              </div>
              <span className="w-2.5 h-2.5" />
            </div>

            {/* Real High-Resolution Concept Mockup Image */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#E6E6E8] dark:border-[#242426] bg-[#0C0C0D] my-2 group/img">
              <Image
                src={`/images/concept/work-${project.id}.jpg`}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover/img:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Bottom metric */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E6E6E8] dark:border-[#242426] text-[11px] text-[#6E6E73] dark:text-[#A1A1A6]">
              <span>Next.js 16 + Core Web Vitals 95+</span>
              <span className="font-semibold" style={{ color: accent }}>
                India Stack Architecture
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
