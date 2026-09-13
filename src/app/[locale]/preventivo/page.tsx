import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QuoteConfigurator } from "@/components/blocks/quote-configurator";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";

interface PreventivoPageProps {
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PreventivoPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const canonicalUrl =
    locale === "it" ? `${baseUrl}/preventivo` : `${baseUrl}/en/preventivo`;

  return {
    title: dict.quote.meta.title,
    description: dict.quote.meta.description,
    keywords: dict.quote.meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: `${baseUrl}/preventivo`,
        en: `${baseUrl}/en/preventivo`,
        "x-default": `${baseUrl}/preventivo`,
      },
    },
    openGraph: {
      title: dict.quote.meta.title,
      description: dict.quote.meta.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function PreventivoPage({
  params,
}: Readonly<PreventivoPageProps>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: dict.quote.meta.title,
    description: dict.quote.meta.description,
    url: locale === "it" ? `${baseUrl}/preventivo` : `${baseUrl}/en/preventivo`,
    mainEntity: {
      "@type": "ProfessionalService",
      name:
        locale === "en"
          ? "Gabriele Farigu — Web & Software Development"
          : "Gabriele Farigu — Sviluppo Web & Software",
      provider: {
        "@type": "Person",
        name: "Gabriele Farigu",
        url: baseUrl,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Turi",
          addressRegion: "BA",
          addressCountry: "IT",
        },
      },
      areaServed: [
        { "@type": "Country", name: "Italy" },
        { "@type": "AdministrativeArea", name: "Puglia" },
        { "@type": "City", name: "Bari" },
      ],
      serviceType: [
        "Web Application Development",
        "Website Design",
        "Booking System Development",
        "Website Redesign & Speed Optimization",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: locale === "en" ? "Development Services" : "Servizi di Sviluppo",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name:
                locale === "en"
                  ? "Custom Web App & Platform Development"
                  : "Sviluppo Web App & Piattaforme su Misura",
              description:
                locale === "en"
                  ? "Interactive web applications with Next.js, React, TypeScript, and Supabase"
                  : "Applicazioni web interattive con Next.js, React, TypeScript e Supabase",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name:
                locale === "en"
                  ? "High-Performance Showcase Website"
                  : "Sviluppo Siti Vetrina ad Alte Prestazioni",
              description:
                locale === "en"
                  ? "Modern, fast websites optimized for SEO and lead generation"
                  : "Siti web moderni e veloci, ottimizzati per SEO e lead generation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name:
                locale === "en"
                  ? "Booking & Scheduling System"
                  : "Sistemi di Prenotazione e Calendario",
              description:
                locale === "en"
                  ? "Real-time booking platforms with calendar management and automated notifications"
                  : "Piattaforme di prenotazione in tempo reale con gestione calendario e notifiche",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name:
                locale === "en"
                  ? "Website Redesign & Speed Optimization"
                  : "Restyling & Ottimizzazione Prestazioni",
              description:
                locale === "en"
                  ? "Core Web Vitals improvement, accessibility audit, and modern visual redesign"
                  : "Miglioramento Core Web Vitals, audit accessibilità e restyling grafico moderno",
            },
          },
        ],
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar dict={dict} locale={locale} />

      <main className="flex-1 py-10 sm:py-16 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {/* Header Introduttivo */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10 dark:border-emerald-500/30 dark:bg-emerald-500/10 text-xs sm:text-sm font-medium text-primary dark:text-[#88fc9d]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-[#88fc9d] animate-pulse" />
              <span>{dict.quote.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 pb-1">
              {dict.quote.title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {dict.quote.subtitle}
            </p>
          </div>

          {/* Configuratore Guidato Multi-Step */}
          <QuoteConfigurator
            dict={dict}
            locale={locale}
            turnstileSiteKey={turnstileSiteKey}
          />
        </div>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
