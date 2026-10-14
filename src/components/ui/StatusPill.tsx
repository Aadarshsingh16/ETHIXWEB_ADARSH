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
  onlineText = "Online · IST",
  offlineText = "Offline · IST",
  className = "",
}: StatusPillProps) {
  const isOnline = useSyncExternalStore(subscribe, getOnlineSnapshot, getServerSnapshot);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium border select-none transition-colors duration-160 ${
        isOnline
          ? "bg-[#161617]/80 text-[#E6E6E8] border-white/10"
          : "bg-[#161617]/80 text-[#A1A1A6] border-white/10"
      } ${className}`}
      title={isOnline ? "Team active during IST business hours" : "Team offline · replies next working day"}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isOnline ? "bg-[#16A34A] pulse-dot text-[#16A34A]" : "bg-[#6E6E73]"
        }`}
        aria-hidden="true"
      />
      <span>{isOnline ? onlineText : offlineText}</span>
    </div>
  );
}
