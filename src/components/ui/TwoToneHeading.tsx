import React from "react";

interface TwoToneHeadingProps {
  as?: "h1" | "h2" | "h3";
  main: string;
  fade?: string;
  size?: "xl" | "lg" | "title";
  theme?: "light" | "dark" | "auto";
  className?: string;
  italicFade?: boolean;
}

export function TwoToneHeading({
  as: Tag = "h2",
  main,
  fade = "",
  size = "lg",
  theme = "auto",
  className = "",
  italicFade = true,
}: TwoToneHeadingProps) {
  let mainColor = "text-[#080808] dark:text-[#fcfcfc]";
  let fadeColor = "text-[#525252] dark:text-[#d4d2d2]/80";

  if (theme === "dark") {
    mainColor = "text-[#fcfcfc]";
    fadeColor = "text-[#d4d2d2]/80";
  } else if (theme === "light") {
    mainColor = "text-[#080808]";
    fadeColor = "text-[#525252]";
  }

  const sizeClasses = {
    xl: "text-[46px] sm:text-[68px] lg:text-[96px] xl:text-[120px] leading-[0.92] tracking-[-0.055em] font-bold font-[family-name:var(--font-display)]",
    lg: "text-[32px] sm:text-[48px] lg:text-[64px] leading-[0.98] tracking-[-0.045em] font-bold font-[family-name:var(--font-display)]",
    title: "text-[24px] sm:text-[32px] leading-[1.08] tracking-[-0.035em] font-bold font-[family-name:var(--font-display)]",
  };

  return (
    <Tag className={`${sizeClasses[size]} ${className}`}>
      <span className={`${mainColor} uppercase`}>{main}</span>
      {fade && (
        <>
          {" "}
          <span
            className={`${fadeColor} ${
              italicFade
                ? "font-[family-name:var(--font-editorial)] font-normal italic lowercase tracking-normal"
                : "font-normal"
            }`}
          >
            {fade}
          </span>
        </>
      )}
    </Tag>
  );
}
