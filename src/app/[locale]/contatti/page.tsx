import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/blocks/contact";
import { BackToHomeButton } from "@/components/ui/back-to-home-button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";

interface ContattiPageProps {
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ContattiPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const canonicalUrl =
    locale === "it" ? `${baseUrl}/contatti` : `${baseUrl}/en/contatti`;

  return {
    title: dict.pages.contact.title,
    description: dict.pages.contact.description,
    keywords: dict.pages.contact.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: `${baseUrl}/contatti`,
        en: `${baseUrl}/en/contatti`,
        "x-default": `${baseUrl}/contatti`,
      },
    },
    openGraph: {
      title: dict.pages.contact.title,
      description: dict.pages.contact.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.contact.title,
      description: dict.pages.contact.description,
      creator: siteConfig.creator,
    },
  };
}

export default async function ContattiPage({
  params,
}: Readonly<ContattiPageProps>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: dict.pages.contact.title,
    description: dict.pages.contact.description,
    url: locale === "it" ? `${baseUrl}/contatti` : `${baseUrl}/en/contatti`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      email: `mailto:${siteConfig.socials.email}`,
      telephone: "+39 349 717 6263",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Turi",
        addressRegion: "BA",
        addressCountry: "IT",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-[family-name:var(--font-geist-sans)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar dict={dict} locale={locale} />

      <main className="flex-1">
        <Contact dict={dict} locale={locale} />
        <BackToHomeButton
          href={locale === "en" ? "/en" : "/"}
          label={dict.nav.backHome}
        />
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
