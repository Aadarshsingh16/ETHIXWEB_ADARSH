"use client";

import { useSyncExternalStore } from "react";

interface StatusPillProps {
  onlineText?: string;
  offlineText?: string;
  className?: string;
}

function getOnlineSnapshot(): boolean {
  if (typeof window === "undefined") {
    return true;
  }
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      hour: "numeric",
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const weekdayPart = parts.find((p) => p.type === "weekday")?.value;
    const hourPart = parseInt(parts.find((p) => p.type === "hour")?.value || "12", 10);

    const isWeekday = weekdayPart !== "Sun";
    const isWorkHours = hourPart >= 10 && hourPart < 19;

    return isWeekday && isWorkHours;
  } catch {
    return true;
  }
}

function getServerSnapshot(): boolean {
  return true;
}

function subscribe(callback: () => void) {
  const timer = setInterval(callback, 60000);
  return () => clearInterval(timer);
}

export function StatusPill({
  className = "",
}: StatusPillProps) {
  const isOnline = useSyncExternalStore(subscribe, getOnlineSnapshot, getServerSnapshot);

  // Keep display text clean and compact so it never wraps in the header
  const displayText = isOnline ? "Online · IST" : "Replies in 24h · IST";

  return (
    <div
      className={`inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-xs font-medium select-none border border-black/10 dark:border-white/10 bg-white/90 dark:bg-white/[0.06] backdrop-blur-md shadow-sm dark:shadow-none whitespace-nowrap transition-colors duration-160 ${
        isOnline ? "text-neutral-900 dark:text-white/90" : "text-neutral-600 dark:text-white/60"
      } ${className}`}
      title={isOnline ? "Team active during IST business hours" : "Team offline · replies next working day"}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isOnline ? "bg-[#10b981] shadow-[0_0_8px_#10b981]" : "bg-amber-400"
        }`}
        aria-hidden="true"
      />
      <span className="tracking-wide">{displayText}</span>
    </div>
  );
}
