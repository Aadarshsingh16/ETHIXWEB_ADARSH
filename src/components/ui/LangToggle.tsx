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
      className={`inline-flex items-center h-8 rounded-full px-3.5 border border-black/10 dark:border-white/10 bg-white/90 dark:bg-white/[0.06] backdrop-blur-md shadow-sm dark:shadow-none text-xs font-medium select-none whitespace-nowrap gap-1.5 ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <a
        href={enHref}
        hrefLang="en"
        className={`transition-colors duration-160 ${
          currentLang === "en"
            ? "text-black dark:text-white font-bold"
            : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
        }`}
        aria-current={currentLang === "en" ? "true" : undefined}
      >
        EN
      </a>
      <span className="text-black/20 dark:text-white/20 select-none text-[11px]">|</span>
      <a
        href={hiHref}
        hrefLang="hi"
        lang="hi"
        className={`transition-colors duration-160 font-[family-name:var(--font-deva)] ${
          currentLang === "hi"
            ? "text-black dark:text-white font-bold"
            : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
        }`}
        aria-current={currentLang === "hi" ? "true" : undefined}
      >
        हिं
      </a>
    </div>
  );
}
