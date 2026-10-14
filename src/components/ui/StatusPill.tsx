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
  const displayText = isOnline ? "Online · IST" : "Offline · IST";

  return (
    <div
      className={`inline-flex items-center gap-2 h-8 px-3 rounded-[6px] text-[11px] font-mono select-none border border-[#262525] bg-[#121213] whitespace-nowrap transition-colors duration-160 ${
        isOnline ? "text-[#d4d2d2]" : "text-[#8e8c8c]"
      } ${className}`}
      title={isOnline ? "Team active during IST business hours" : "Team offline · replies next working day"}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isOnline ? "bg-[#16A34A] pulse-dot text-[#16A34A]" : "bg-[#525252]"
        }`}
        aria-hidden="true"
      />
      <span className="tracking-wider">{displayText}</span>
    </div>
  );
}
