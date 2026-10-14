import { Inter_Tight, Inter, Noto_Sans_Devanagari } from "next/font/google";

export const interTight = Inter_Tight({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  adjustFontFallback: true,
});

export const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
});

export const notoDeva = Noto_Sans_Devanagari({
  weight: ["500", "700"],
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-noto-deva",
  adjustFontFallback: true,
});
