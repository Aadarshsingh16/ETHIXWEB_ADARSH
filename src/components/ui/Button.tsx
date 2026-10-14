import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "accent" | "outline" | "whatsapp" | "secondary" | "ghost" | "discovery";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  arrow?: boolean;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  arrow = false,
  href,
  external = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  // SVZ Design Tokens: 8px radius, crisp uppercase typography, tracked letter-spacing
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-[8px] text-[12px] font-mono font-medium uppercase tracking-[0.12em] select-none transition-all duration-160 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fe1e34] active:scale-[0.98]";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#fcfcfc] text-[#080808] hover:bg-[#d4d2d2] dark:bg-[#fcfcfc] dark:text-[#080808]",
    accent:
      "bg-[#fe1e34] text-[#fcfcfc] hover:bg-[#d81528] active:bg-[#b01020] shadow-[0_0_20px_rgba(254,30,52,0.25)]",
    discovery:
      "bg-transparent text-[#fcfcfc] border border-[#d4d2d2]/40 hover:border-[#fcfcfc] hover:bg-white/5",
    ghost:
      "bg-transparent text-[#fcfcfc] hover:text-[#fe1e34] border-0 p-0 h-auto tracking-[0.16em]",
    outline:
      "border border-[#262525] text-[#fcfcfc] hover:border-[#525252] hover:bg-[#171617] dark:border-[#262525] dark:text-[#fcfcfc]",
    whatsapp:
      "bg-[#25D366] text-[#080808] hover:bg-[#20BA5A] font-semibold",
    secondary:
      "bg-[#171617] text-[#fcfcfc] border border-[#262525] hover:border-[#525252]",
  };

  const arrowIcon = (
    <span
      className="inline-flex items-center justify-center transition-transform duration-160 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </span>
  );

  const whatsappIcon = (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );

  const content = (
    <>
      {variant === "whatsapp" && whatsappIcon}
      <span>{children}</span>
      {(arrow || variant === "discovery" || variant === "ghost") && arrowIcon}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={`group ${baseStyles} ${variantStyles[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`group ${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
}
