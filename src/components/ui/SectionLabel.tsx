interface SectionLabelProps {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
}

export function SectionLabel({
  children,
  theme = "light",
  className = "",
}: SectionLabelProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-[#A1A1A6]" : "text-[#6E6E73]";

  return (
    <div className={`inline-flex items-center gap-2 text-[13px] font-medium tracking-normal ${textColor} ${className}`}>
      <span className="text-[#C1272D] text-[12px] leading-none select-none" aria-hidden="true">
        ✦
      </span>
      <span>{children}</span>
    </div>
  );
}
