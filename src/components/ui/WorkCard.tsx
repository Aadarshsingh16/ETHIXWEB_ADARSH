import React from "react";

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
          <div className="rounded-[20px] bg-[#F5F5F7] dark:bg-[#0C0C0D] border border-[#E6E6E8] dark:border-[#242426] p-5 sm:p-6 aspect-[16/10] flex flex-col justify-between overflow-hidden relative">
            {/* Browser top-bar */}
            <div className="flex items-center justify-between border-b border-[#E6E6E8] dark:border-[#242426] pb-3 mb-3">
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

            {/* Simulated UI context / Image Slot */}
            <div className="space-y-3 my-auto">
              {project.id === "d2c" && (
                <div className="bg-white dark:bg-[#161617] p-4 rounded-xl border border-[#E6E6E8] dark:border-[#242426] space-y-2">
                  <div className="flex items-center justify-between text-[#0C0C0D] dark:text-white">
                    <span className="font-semibold text-sm">Ayurvedic Night Serum</span>
                    <span className="text-[#C1272D] font-bold text-sm">₹1,499</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 py-1.5 px-3 rounded-lg bg-[#25D366]/10 text-[#25D366] text-xs font-semibold flex items-center justify-center gap-1">
                      <span>✓ WhatsApp Updates</span>
                    </div>
                    <div className="flex-1 py-1.5 px-3 rounded-lg bg-[#0C0C0D] dark:bg-white text-white dark:text-[#0C0C0D] text-xs font-semibold flex items-center justify-center">
                      <span>Instant UPI Pay</span>
                    </div>
                  </div>
                </div>
              )}

              {project.id === "edtech" && (
                <div className="bg-white dark:bg-[#161617] p-4 rounded-xl border border-[#E6E6E8] dark:border-[#242426] space-y-2">
                  <div className="flex items-center justify-between text-[#0C0C0D] dark:text-white">
                    <span className="font-semibold text-sm">JEE Advanced 2027 Batch</span>
                    <span className="text-xs bg-[#FDECEC] dark:bg-[#C1272D]/20 text-[#C1272D] px-2 py-0.5 rounded font-medium">94% Demo Rate</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F5F5F7] dark:bg-[#242426] text-xs space-y-1">
                    <div className="text-[#6E6E73] dark:text-[#A1A1A6]">Automated Hinglish Followup:</div>
                    <div className="font-medium text-[#0C0C0D] dark:text-white">&ldquo;नमस्ते राहुल! आपका डेमो क्लास स्लॉट बुक हो चुका है।&rdquo;</div>
                  </div>
                </div>
              )}

              {project.id === "clinic" && (
                <div className="bg-white dark:bg-[#161617] p-4 rounded-xl border border-[#E6E6E8] dark:border-[#242426] space-y-2">
                  <div className="flex items-center justify-between text-[#0C0C0D] dark:text-white">
                    <span className="font-semibold text-sm">Dr. Verma Dental Clinic (Delhi NCR)</span>
                    <span className="text-xs text-[#16A34A] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> Live Slots
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                    <span className="p-1.5 rounded border border-[#E6E6E8] dark:border-[#2E2E31] bg-[#F5F5F7] dark:bg-[#242426] text-[#0C0C0D] dark:text-white">11:00 AM</span>
                    <span className="p-1.5 rounded border border-[#C1272D] bg-[#FDECEC] dark:bg-[#C1272D]/20 text-[#C1272D] font-bold">02:30 PM</span>
                    <span className="p-1.5 rounded border border-[#E6E6E8] dark:border-[#2E2E31] bg-[#F5F5F7] dark:bg-[#242426] text-[#0C0C0D] dark:text-white">05:00 PM</span>
                  </div>
                </div>
              )}

              {project.id === "realestate" && (
                <div className="bg-white dark:bg-[#161617] p-4 rounded-xl border border-[#E6E6E8] dark:border-[#242426] space-y-2">
                  <div className="flex items-center justify-between text-[#0C0C0D] dark:text-white">
                    <span className="font-semibold text-sm">The Grand Residences (Bengaluru)</span>
                    <span className="text-xs font-mono font-bold text-[#C1272D] dark:text-white">₹1.85 Cr+</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#F5F5F7] dark:bg-[#242426] text-[#0C0C0D] dark:text-white">
                    <span>3 & 4 BHK Luxury Condos</span>
                    <span className="text-[#0C0C0D] dark:text-white font-semibold underline">Schedule Site Visit →</span>
                  </div>
                </div>
              )}

              {project.id === "jewellery" && (
                <div className="bg-white dark:bg-[#161617] p-4 rounded-xl border border-[#E6E6E8] dark:border-[#242426] space-y-2">
                  <div className="flex items-center justify-between text-xs border-b border-[#E6E6E8] dark:border-[#242426] pb-1.5">
                    <span className="text-[#6E6E73] dark:text-[#A1A1A6]">Live 24K Gold Rate:</span>
                    <span className="font-mono font-bold text-[#C1272D]">₹76,420 / 10g</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#0C0C0D] dark:text-white">
                    <span className="font-semibold">Bridal Heritage Collection</span>
                    <span className="text-xs bg-[#25D366] text-white px-2 py-0.5 rounded font-medium">WhatsApp Consult</span>
                  </div>
                </div>
              )}
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
