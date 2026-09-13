import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/blocks/hero";
import { Journey } from "@/components/blocks/journey";
import { BackToHomeButton } from "@/components/ui/back-to-home-button";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Sparkles, GraduationCap, Code2, MapPin } from "lucide-react";
import Link from "next/link";

interface ChiSonoPageProps {
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ChiSonoPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const canonicalUrl =
    locale === "it" ? `${baseUrl}/chi-sono` : `${baseUrl}/en/chi-sono`;

  return {
    title: dict.pages.about.title,
    description: dict.pages.about.description,
    keywords: dict.pages.about.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: `${baseUrl}/chi-sono`,
        en: `${baseUrl}/en/chi-sono`,
        "x-default": `${baseUrl}/chi-sono`,
      },
    },
    openGraph: {
      title: dict.pages.about.title,
      description: dict.pages.about.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.about.title,
      description: dict.pages.about.description,
      creator: siteConfig.creator,
    },
  };
}

export default async function ChiSonoPage({
  params,
}: Readonly<ChiSonoPageProps>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  // Recupero bio da DB con fallback sul dizionario
  let headline =
    locale === "en"
      ? dict.bio.fallbackHeadline
      : dict.bio.fallbackHeadline;
  let bio =
    locale === "en"
      ? dict.bio.fallbackBio
      : dict.bio.fallbackBio;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profile")
      .select("*")
      .eq("id", "main")
      .single();

    if (data) {
      if (locale === "en") {
        headline = data.headline_en || data.headline_it || headline;
        bio = data.bio_en || data.bio_it || bio;
      } else {
        headline = data.headline_it || headline;
        bio = data.bio_it || bio;
      }
    }
  } catch {
    // Fallback sul dizionario
  }

  const bioParagraphs = bio
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: dict.pages.about.title,
    description: dict.pages.about.description,
    url: locale === "it" ? `${baseUrl}/chi-sono` : `${baseUrl}/en/chi-sono`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      url: baseUrl,
      jobTitle:
        locale === "en"
          ? "Web & Software Developer"
          : "Sviluppatore Web & Software",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Turi",
        addressRegion: "BA",
        addressCountry: "IT",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name:
            locale === "en"
              ? "University of Bari Aldo Moro"
              : "Università degli Studi di Bari Aldo Moro",
        },
      ],
      sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
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
        {/* 1. Hero principale */}
        <Hero dict={dict} locale={locale} showExploreLink={false} />

        {/* 2. Sezione Biografia Narrativa Approfondita */}
        <section className="w-full py-20 bg-muted/30 border-y border-border/40">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-10">
            {/* Header Bio */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10 dark:border-emerald-500/30 dark:bg-emerald-500/10 text-xs sm:text-sm font-medium text-primary dark:text-[#88fc9d]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{dict.bio.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                {dict.bio.title}
              </h2>
              {headline && (
                <p className="text-lg font-medium text-primary dark:text-[#88fc9d]">
                  {headline}
                </p>
              )}
            </div>

            {/* Paragrafi Bio */}
            <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
              {bioParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              {/* Highlight Badges */}
              <div className="pt-6 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-foreground">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
                  <MapPin className="h-5 w-5 text-brand-accent shrink-0" />
                  <span>Turi (Bari), Puglia • Remote Friendly</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
                  <GraduationCap className="h-5 w-5 text-brand-accent shrink-0" />
                  <span>Università degli Studi di Bari (ITPS)</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
                  <Code2 className="h-5 w-5 text-brand-accent shrink-0" />
                  <span>Next.js • React • TypeScript • Supabase</span>
                </div>
              </div>
            </div>

            {/* CTA interattive */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" className="rounded-full shadow-lg">
                <Link href={projectsHref}>
                  <span>{dict.bio.ctaProjects}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href={contactHref}>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{dict.bio.ctaContact}</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 3. Percorso di Studi ed Esperienze (Journey) */}
        <div className="w-full">
          <Journey dict={dict} locale={locale} showExploreLink={false} />
        </div>

        {/* 4. Pulsante finale: Torna alla Home */}
        <BackToHomeButton
          href={locale === "en" ? "/en" : "/"}
          label={dict.nav.backHome}
        />
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
