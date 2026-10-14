import React from "react";

interface TwoToneHeadingProps {
  as?: "h1" | "h2" | "h3";
  main: string;
  fade: string;
  size?: "xl" | "lg" | "title";
  theme?: "light" | "dark";
  className?: string;
}

export function TwoToneHeading({
  as: Tag = "h2",
  main,
  fade,
  size = "lg",
  theme = "light",
  className = "",
}: TwoToneHeadingProps) {
  const isDark = theme === "dark";
  const mainColor = isDark ? "text-white" : "text-[#0C0C0D] dark:text-white";
  const fadeColor = isDark ? "text-[#6B6B70]" : "text-[#A1A1A6] dark:text-[#6B6B70]";

  const sizeClasses = {
    xl: "text-[40px] sm:text-[56px] lg:text-[76px] xl:text-[92px] leading-[1.02] tracking-[-0.03em] font-semibold font-[family-name:var(--font-display)]",
    lg: "text-[28px] sm:text-[40px] lg:text-[52px] leading-[1.08] tracking-[-0.025em] font-semibold font-[family-name:var(--font-display)]",
    title: "text-[22px] sm:text-[28px] leading-[1.2] tracking-[-0.02em] font-semibold font-[family-name:var(--font-display)]",
  };

  return (
    <Tag className={`${sizeClasses[size]} ${className}`}>
      <span className={mainColor}>{main}</span>{" "}
      <span className={fadeColor}>{fade}</span>
    </Tag>
  );
}
