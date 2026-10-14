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
  const bgStyles = isDark ? "bg-[#161617] text-white" : "bg-white text-[#0C0C0D]";

  return (
    <div
      className={`chamfer-card p-6 sm:p-8 transition-transform duration-200 ease-out hover:-translate-y-0.5 ${bgStyles} ${className}`}
    >
      {children}
    </div>
  );
}
