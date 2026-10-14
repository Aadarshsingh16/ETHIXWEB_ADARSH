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
      className={`${interTight.variable} ${inter.variable} ${editorialSerif.variable} ${notoDeva.variable} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased selection:bg-[#C1272D] selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
