import { getDictionary, LOCALES } from "@/lib/i18n";
import { PillNav } from "@/components/layout/PillNav";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = ${JSON.stringify(lang)};`,
        }}
      />
      <PillNav lang={lang} labels={dict.nav} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} data={dict.footer} />
      <StickyWhatsApp
        lang={lang}
        waText={dict.hero.ctaWa}
        callText={dict.hero.ctaCall}
      />
    </div>
  );
}
