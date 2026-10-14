"use client";

import { useEffect, useState } from "react";

interface StatusPillProps {
  onlineText?: string;
  offlineText?: string;
  className?: string;
}

export function StatusPill({
  onlineText = "Online · IST",
  offlineText = "Offline · IST",
  className = "",
}: StatusPillProps) {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    try {
      const now = new Date();
      // Format current time into Asia/Kolkata timezone components
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      const weekdayPart = parts.find((p) => p.type === "weekday")?.value;
      const hourPart = parseInt(parts.find((p) => p.type === "hour")?.value || "12", 10);

      // Business hours: Mon-Sat, 10:00 to 19:00 IST
      const isWeekday = weekdayPart !== "Sun";
      const isWorkHours = hourPart >= 10 && hourPart < 19;

      setIsOnline(isWeekday && isWorkHours);
    } catch {
      setIsOnline(true);
    }
  }, []);

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
