import type { Metadata, Viewport } from "next";
import { interTight, inter, editorialSerif, notoDeva } from "@/lib/fonts";
import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Ethixweb India — Websites, AI Chatbots & Ads for Indian Businesses",
    template: "%s | Ethixweb India",
  },
  description:
    "Fast websites, AI chatbots and Google & Meta ads for Indian businesses. WhatsApp-first, GST invoicing, UPI payments, support in IST.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ethixweb.in"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ethixweb India — Websites, AI Chatbots & Ads for Indian Businesses",
    description:
      "Fast websites, AI chatbots and Google & Meta ads for Indian businesses. WhatsApp-first, GST invoicing, UPI payments, support in IST.",
    url: "https://ethixweb.in",
    siteName: "Ethixweb India",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethixweb India",
    description:
      "Fast websites, AI chatbots and Google & Meta ads for Indian businesses.",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/en",
      "hi-IN": "/hi",
    },
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
      suppressHydrationWarning
      className={`${interTight.variable} ${inter.variable} ${editorialSerif.variable} ${notoDeva.variable} scroll-smooth dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#080808] text-[var(--color-text)] font-sans antialiased selection:bg-[#fe1e34] selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
