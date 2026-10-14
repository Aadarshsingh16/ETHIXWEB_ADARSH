interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  // Render duplicated list twice to create infinite seamless loop
  return (
    <div
      className={`relative w-full overflow-hidden py-4 select-none border-y border-[#E6E6E8] bg-white ${className}`}
      aria-label="Industries we serve"
    >
      <div className="animate-marquee flex items-center gap-8">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="text-[15px] sm:text-[17px] font-semibold text-[#0C0C0D] tracking-tight">
              {item}
            </span>
            <span className="text-[#C1272D] text-[12px] leading-none select-none" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
