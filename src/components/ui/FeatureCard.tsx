import React from "react";

interface FeatureCardProps {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
}

export function FeatureCard({
  children,
  theme = "light",
  className = "",
}: FeatureCardProps) {
  const isDark = theme === "dark";
  const styles = isDark
    ? "bg-[#161617] text-white border border-[#242426]"
    : "bg-white text-[#0C0C0D] border border-[#E6E6E8]";

  return (
    <div
      className={`rounded-[28px] p-6 sm:p-8 transition-transform duration-200 ease-out hover:-translate-y-0.5 ${styles} ${className}`}
    >
      {children}
    </div>
  );
}
