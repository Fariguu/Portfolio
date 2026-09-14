import { JsonLd } from "@/components/seo/json-ld";
import { defaultLocale, isValidLocale, locales, type Locale } from "@/lib/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <div className="w-full flex-1">
      {locale !== "it" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang = "${locale}";`,
          }}
        />
      )}
      <JsonLd locale={locale} />
      {children}
    </div>
  );
}
