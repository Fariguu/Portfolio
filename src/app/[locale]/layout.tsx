import { LanguageHtmlSync } from "@/components/layout/language-html-sync";
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n/config";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <LanguageHtmlSync locale={locale} />
      <div className="w-full flex-1 transition-opacity duration-200 animate-in fade-in-50">
        {children}
      </div>
    </>
  );
}
