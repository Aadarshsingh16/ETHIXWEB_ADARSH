interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  // Render duplicated list twice to create infinite seamless loop
  return (
    <div
      className={`relative w-full overflow-hidden py-4 select-none border-y border-[#262525] bg-[#080808] ${className}`}
      aria-label="Industries we serve"
    >
      <div className="animate-marquee flex items-center gap-10">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.2em] font-semibold text-[#fcfcfc]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fe1e34]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
