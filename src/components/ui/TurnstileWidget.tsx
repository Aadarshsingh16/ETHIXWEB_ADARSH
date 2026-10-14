"use client";

import { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
  siteKey?: string;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export function TurnstileWidget({
  onToken,
  siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
  className = "",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // If turnstile script is not loaded yet, inject it lazily
    const scriptId = "cf-turnstile-script";

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onToken(token);
            },
            "expired-callback": () => {
              onToken("");
            },
            theme: "auto",
          });
        } catch (err) {
          console.warn("Turnstile render note:", err);
          // Fallback dummy token for development
          onToken("1x00000000000000000000AA");
        }
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      window.onloadTurnstileCallback = renderWidget;

      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      window.onloadTurnstileCallback = undefined;
    };
  }, [siteKey, onToken]);

  return (
    // Fixed height (65px) reserved container to prevent CLS per docs/05-PERFORMANCE.md
    <div
      ref={containerRef}
      className={`min-h-[65px] flex items-center justify-start ${className}`}
      aria-label="Human verification challenge"
    />
  );
}
