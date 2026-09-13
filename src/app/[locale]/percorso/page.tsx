import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Journey } from "@/components/blocks/journey";
import { BackToHomeButton } from "@/components/ui/back-to-home-button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, GraduationCap } from "lucide-react";
import Link from "next/link";

interface PercorsoPageProps {
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PercorsoPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const canonicalUrl =
    locale === "it" ? `${baseUrl}/percorso` : `${baseUrl}/en/percorso`;

  return {
    title: dict.pages.journey.title,
    description: dict.pages.journey.description,
    keywords: dict.pages.journey.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: `${baseUrl}/percorso`,
        en: `${baseUrl}/en/percorso`,
        "x-default": `${baseUrl}/percorso`,
      },
    },
    openGraph: {
      title: dict.pages.journey.title,
      description: dict.pages.journey.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.journey.title,
      description: dict.pages.journey.description,
      creator: siteConfig.creator,
    },
  };
}

export default async function PercorsoPage({
  params,
}: Readonly<PercorsoPageProps>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: dict.pages.journey.title,
    description: dict.pages.journey.description,
    url: locale === "it" ? `${baseUrl}/percorso` : `${baseUrl}/en/percorso`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      url: baseUrl,
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name:
            locale === "en"
              ? "University of Bari Aldo Moro"
              : "Università degli Studi di Bari Aldo Moro",
        },
      ],
    },
  };

  const contactHref = locale === "en" ? "/en/contatti" : "/contatti";
  const projectsHref = locale === "en" ? "/en/progetti" : "/progetti";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-[family-name:var(--font-geist-sans)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar dict={dict} locale={locale} />

      <main className="flex-1">
        {/* Componente Journey principale */}
        <Journey dict={dict} locale={locale} showExploreLink={false} />

        {/* Sezione CTA di approfondimento */}
        <section className="w-full py-16 bg-muted/30 border-t border-border/40">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {locale === "en"
                ? "Interested in collaborating or discussing an opportunity?"
                : "Vuoi approfondire il mio percorso o proporre una collaborazione?"}
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              {locale === "en"
                ? "I am available for junior engineering roles, freelance contracts, and software development projects."
                : "Sono disponibile per opportunità lavorative, progetti freelance e collaborazioni tecniche su misura."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" className="rounded-full shadow-md">
                <Link href={contactHref}>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{dict.bio.ctaContact}</span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href={projectsHref}>
                  <span>{dict.bio.ctaProjects}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
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
