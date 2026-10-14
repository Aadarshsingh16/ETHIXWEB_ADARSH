import React from "react";

interface ChamferCardProps {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
}

export function ChamferCard({
  children,
  theme = "light",
  className = "",
}: ChamferCardProps) {
  const isDark = theme === "dark";
  const bgStyles = isDark
    ? "bg-[#161617] text-white border border-[#242426]"
    : "bg-white dark:bg-[#161617] text-[#0C0C0D] dark:text-white border border-[#E6E6E8] dark:border-[#242426]";

  return (
    <div
      className={`chamfer-card p-6 sm:p-8 transition-transform duration-200 ease-out hover:-translate-y-0.5 ${bgStyles} ${className}`}
    >
      {children}
    </div>
  );
}
