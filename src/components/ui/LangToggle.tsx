interface LangToggleProps {
  currentLang: string;
  currentPath?: string;
  theme?: "dark" | "light";
  className?: string;
}

export function LangToggle({
  currentLang,
  currentPath = "",
  theme = "dark",
  className = "",
}: LangToggleProps) {
  // Clean up path and construct alternative target
  const pathWithoutLang = currentPath.replace(/^\/(en|hi)/, "");
  const enHref = `/en${pathWithoutLang}`;
  const hiHref = `/hi${pathWithoutLang}`;

  const isDark = theme === "dark";

  return (
    <div
      className={`inline-flex items-center rounded-full p-1 border text-[12px] font-semibold select-none ${
        isDark
          ? "bg-[#161617]/90 border-white/10 text-white"
          : "bg-white/90 border-[#E6E6E8] text-[#0C0C0D]"
      } ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <a
        href={enHref}
        hrefLang="en"
        className={`px-2.5 py-1 rounded-full transition-colors duration-160 ${
          currentLang === "en"
            ? isDark
              ? "bg-white text-[#0C0C0D]"
              : "bg-[#0C0C0D] text-white"
            : isDark
            ? "text-[#A1A1A6] hover:text-white"
            : "text-[#6E6E73] hover:text-[#0C0C0D]"
        }`}
        aria-current={currentLang === "en" ? "true" : undefined}
      >
        EN
      </a>
      <span className={isDark ? "text-white/20" : "text-[#E6E6E8]"} aria-hidden="true">
        /
      </span>
      <a
        href={hiHref}
        hrefLang="hi"
        lang="hi"
        className={`px-2.5 py-1 rounded-full transition-colors duration-160 font-[family-name:var(--font-deva)] ${
          currentLang === "hi"
            ? isDark
              ? "bg-white text-[#0C0C0D]"
              : "bg-[#0C0C0D] text-white"
            : isDark
            ? "text-[#A1A1A6] hover:text-white"
            : "text-[#6E6E73] hover:text-[#0C0C0D]"
        }`}
        aria-current={currentLang === "hi" ? "true" : undefined}
      >
        हिं
      </a>
    </div>
  );
}
