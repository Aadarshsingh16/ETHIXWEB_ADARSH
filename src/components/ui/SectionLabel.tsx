import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
  hasDot?: boolean;
}

export function SectionLabel({
  children,
  theme = "light",
  className = "",
  hasDot = true,
}: SectionLabelProps) {
  const isDark = theme === "dark";
  const textColor = isDark
    ? "text-[#d4d2d2]"
    : "text-[#525252] dark:text-[#d4d2d2]";

  return (
    <div
      className={`inline-flex items-center gap-2.5 text-[11px] font-mono font-semibold uppercase tracking-[0.22em] ${textColor} ${className}`}
    >
      {hasDot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#fe1e34] shadow-[0_0_8px_#fe1e34]"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
}
