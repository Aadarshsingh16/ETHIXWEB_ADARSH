"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface StickyWhatsAppProps {
  lang: string;
  waText?: string;
  callText?: string;
}

export function StickyWhatsApp({
  lang,
  waText = "WhatsApp us",
  callText = "Book a call",
}: StickyWhatsAppProps) {
  const pathname = usePathname() || "";

  // Hide on contact page where the form already exists
  if (pathname.includes("/contact")) {
    return null;
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Ethixweb, I'd like to discuss a project for my business."
  )}`;

  return (
    <aside
      aria-label="Quick Actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-[#0C0C0D]/95 backdrop-blur-md border-t border-[#242426] shadow-2xl transition-transform duration-220 ease-out"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <Button
          variant="whatsapp"
          href={whatsappUrl}
          external
          className="h-11 text-xs font-semibold px-2"
          aria-label="Chat on WhatsApp (opens in a new tab)"
        >
          {waText}
        </Button>
        <Button
          variant="accent"
          href={`/${lang}/contact`}
          className="h-11 text-xs font-semibold px-2"
        >
          {callText}
        </Button>
      </div>
    </aside>
  );
}
