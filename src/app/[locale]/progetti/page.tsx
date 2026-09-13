import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Portfolio } from "@/components/blocks/portfolio";
import { BackToHomeButton } from "@/components/ui/back-to-home-button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

interface ProgettiPageProps {
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ProgettiPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const canonicalUrl =
    locale === "it" ? `${baseUrl}/progetti` : `${baseUrl}/en/progetti`;

  return {
    title: dict.pages.projects.title,
    description: dict.pages.projects.description,
    keywords: dict.pages.projects.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: `${baseUrl}/progetti`,
        en: `${baseUrl}/en/progetti`,
        "x-default": `${baseUrl}/progetti`,
      },
    },
    openGraph: {
      title: dict.pages.projects.title,
      description: dict.pages.projects.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.projects.title,
      description: dict.pages.projects.description,
      creator: siteConfig.creator,
    },
  };
}

export default async function ProgettiPage({
  params,
}: Readonly<ProgettiPageProps>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: dict.pages.projects.title,
    description: dict.pages.projects.description,
    url: locale === "it" ? `${baseUrl}/progetti` : `${baseUrl}/en/progetti`,
    mainEntity: {
      "@type": "ItemList",
      name: dict.portfolio.title,
      description: dict.portfolio.description,
      itemListElement: dict.portfolio.fallbackList.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "SoftwareApplication",
          name: p.title,
          description: p.description,
          applicationCategory: "WebApplication",
          operatingSystem: "Web Browser",
          url: p.slug
            ? `${baseUrl}${locale === "en" ? "/en" : ""}/progetti/${p.slug}`
            : undefined,
        },
      })),
    },
  };

  const quoteHref = locale === "en" ? "/en/preventivo" : "/preventivo";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-[family-name:var(--font-geist-sans)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar dict={dict} locale={locale} />

      <main className="flex-1">
        {/* Componente Portfolio con griglia progetti, filtri e case study */}
        <Portfolio dict={dict} locale={locale} />

        {/* Banner CTA preventivo per convertire i visitatori del portfolio */}
        <section className="w-full py-16 bg-muted/40 border-t border-border/40">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {locale === "en"
                ? "Have a project in mind?"
                : "Hai in mente un progetto simile?"}
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              {locale === "en"
                ? "Configure your web solution in 4 easy steps and get a transparent estimate tailored to your requirements."
                : "Configura la tua soluzione ideale in 4 semplici passaggi e ricevi una stima trasparente e dettagliata per la tua idea."}
            </p>
            <div className="pt-2">
              <Button asChild size="lg" className="rounded-full shadow-md gap-2">
                <Link href={quoteHref}>
                  <Calculator className="h-4 w-4" />
                  <span>{dict.nav.quote}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <BackToHomeButton
          href={locale === "en" ? "/en" : "/"}
          label={dict.nav.backHome}
        />
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
