import Link from "next/link";

interface LogoProps {
  lang?: string;
  theme?: "dark" | "light";
  className?: string;
}

export function Logo({ lang = "en", theme = "dark", className = "" }: LogoProps) {
  const isDark = theme === "dark";

  return (
    <Link
      href={`/${lang}`}
      aria-label="Ethixweb India home"
      className={`inline-flex items-center gap-2 group select-none ${className}`}
    >
      {/* SVG Wordmark precisely crafted to match the Ethixweb bold geometric identity */}
      <svg
        viewBox="0 0 168 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-auto ${isDark ? "text-white" : "text-[#0C0C0D] dark:text-white"}`}
        aria-hidden="true"
      >
        <text
          x="0"
          y="23"
          fill="currentColor"
          fontFamily="var(--font-inter-tight), system-ui, sans-serif"
          fontWeight="800"
          fontSize="26"
          letterSpacing="0.08em"
        >
          ETHIXWEB
        </text>
      </svg>

      {/* Small India chip */}
      <span
        className="text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#C1272D] text-white tracking-widest uppercase leading-none shadow-sm"
        aria-label="India edition"
      >
        IN
      </span>
    </Link>
  );
}
