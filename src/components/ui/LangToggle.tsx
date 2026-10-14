interface LangToggleProps {
  currentLang: string;
  currentPath?: string;
  theme?: "dark" | "light";
  className?: string;
}

export function LangToggle({
  currentLang,
  currentPath = "",
  className = "",
}: LangToggleProps) {
  // Clean up path and construct alternative target
  const pathWithoutLang = currentPath.replace(/^\/(en|hi)/, "");
  const enHref = `/en${pathWithoutLang}`;
  const hiHref = `/hi${pathWithoutLang}`;

  return (
    <div
      className={`inline-flex items-center h-8 rounded-[6px] p-0.5 border border-[#262525] bg-[#121213] text-[11px] font-mono select-none whitespace-nowrap ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <a
        href={enHref}
        hrefLang="en"
        className={`px-2.5 h-7 flex items-center justify-center rounded-[4px] transition-colors duration-160 ${
          currentLang === "en"
            ? "bg-[#262525] text-[#fcfcfc] font-bold"
            : "text-[#8e8c8c] hover:text-[#fcfcfc]"
        }`}
        aria-current={currentLang === "en" ? "true" : undefined}
      >
        EN
      </a>
      <a
        href={hiHref}
        hrefLang="hi"
        lang="hi"
        className={`px-2.5 h-7 flex items-center justify-center rounded-[4px] transition-colors duration-160 font-[family-name:var(--font-deva)] ${
          currentLang === "hi"
            ? "bg-[#262525] text-[#fcfcfc] font-bold"
            : "text-[#8e8c8c] hover:text-[#fcfcfc]"
        }`}
        aria-current={currentLang === "hi" ? "true" : undefined}
      >
        हिं
      </a>
    </div>
  );
}
