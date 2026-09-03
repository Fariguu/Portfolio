import { LanguageHtmlSync } from "@/components/layout/language-html-sync";
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n/config";

interface LocaleLayoutProps {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <LanguageHtmlSync locale={locale} />
      <div className="w-full flex-1">
        {children}
      </div>
    </>
  );
}
