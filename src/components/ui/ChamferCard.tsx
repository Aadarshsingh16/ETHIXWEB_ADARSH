import React from "react";

interface ChamferCardProps {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
}

export function ChamferCard({
  children,
  className = "",
}: ChamferCardProps) {
  return (
    <div
      className={`rounded-[8px] p-6 sm:p-8 bg-[#171617] text-[#fcfcfc] border border-[#262525] hover:border-[#393939] transition-all duration-200 ease-out hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </div>
  );
}
