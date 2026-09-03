import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { Features } from "@/components/blocks/features";
import { Journey } from "@/components/blocks/journey";
import { Portfolio } from "@/components/blocks/portfolio";
import { Contact } from "@/components/blocks/contact";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const canonicalUrl = locale === "it" ? baseUrl : `${baseUrl}/en`;

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: [...dict.meta.keywords],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: baseUrl,
        en: `${baseUrl}/en`,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: dict.meta.localeCode,
      alternateLocale: [locale === "it" ? "en_US" : "it_IT"],
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      creator: siteConfig.creator,
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1">
        <Hero dict={dict} />
        <Features dict={dict} locale={locale} />
        <Journey dict={dict} locale={locale} />
        <Portfolio dict={dict} locale={locale} />
        <Contact dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
