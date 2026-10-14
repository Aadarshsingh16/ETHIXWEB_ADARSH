import type { Metadata } from "next";
import { interTight, inter, notoDeva } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Ethixweb India — Websites, AI Chatbots & Ads for Indian Businesses",
  description:
    "Fast websites, AI chatbots and Google & Meta ads for Indian businesses. WhatsApp-first, GST invoicing, UPI payments, support in IST.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ethixweb.in"),
  icons: {
    icon: "/ethixweb-logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${notoDeva.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F5F5F7] text-[#0C0C0D] font-sans antialiased selection:bg-[#C1272D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
