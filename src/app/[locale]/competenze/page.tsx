import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Features } from "@/components/blocks/features";
import { BackToHomeButton } from "@/components/ui/back-to-home-button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Cpu, ShieldCheck, Database, Zap } from "lucide-react";
import Link from "next/link";

interface CompetenzePageProps {
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: CompetenzePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const canonicalUrl =
    locale === "it" ? `${baseUrl}/competenze` : `${baseUrl}/en/competenze`;

  return {
    title: dict.pages.skills.title,
    description: dict.pages.skills.description,
    keywords: dict.pages.skills.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: `${baseUrl}/competenze`,
        en: `${baseUrl}/en/competenze`,
        "x-default": `${baseUrl}/competenze`,
      },
    },
    openGraph: {
      title: dict.pages.skills.title,
      description: dict.pages.skills.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.skills.title,
      description: dict.pages.skills.description,
      creator: siteConfig.creator,
    },
  };
}

export default async function CompetenzePage({
  params,
}: Readonly<CompetenzePageProps>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: dict.pages.skills.title,
    description: dict.pages.skills.description,
    url: locale === "it" ? `${baseUrl}/competenze` : `${baseUrl}/en/competenze`,
    mainEntity: {
      "@type": "ItemList",
      name: dict.skills.title,
      description: dict.skills.description,
      itemListElement: dict.skills.fallbackList.map((skill, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: skill.name,
        description: skill.description,
      })),
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
        {/* Componente Features principale con griglia competenze (senza link di approfondimento circolare) */}
        <Features dict={dict} locale={locale} showExploreLink={false} />

        {/* Approfondimento sull'Approccio Ingegneristico */}
        <section className="w-full py-20 bg-background border-t border-border/40">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10 dark:border-emerald-500/30 dark:bg-emerald-500/10 text-xs sm:text-sm font-medium text-primary dark:text-[#88fc9d]">
                <Cpu className="h-3.5 w-3.5" />
                <span>
                  {locale === "en" ? "Engineering Philosophy" : "Metodologia di Sviluppo"}
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {locale === "en"
                  ? "Built for Performance, Speed & Longevity"
                  : "Codice Pulito, Prestazioni e Scalabilità"}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {locale === "en"
                  ? "Every project is designed from the ground up prioritizing Core Web Vitals, clean architecture, and reliable security."
                  : "Ogni riga di codice viene scritta ponendo al centro i Core Web Vitals, la manutenibilità a lungo termine e la sicurezza dei dati."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  {locale === "en" ? "Extreme Web Performance" : "Prestazioni Estreme"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {locale === "en"
                    ? "Sub-second loading times, optimized image assets, Server Components, and zero useless JavaScript sent to the client."
                    : "Caricamenti istantanei, ottimizzazione delle immagini, Server Components e zero JavaScript superfluo scaricato dal browser."}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  {locale === "en" ? "Relational Data Integrity" : "Integrità Dati Relazionale"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {locale === "en"
                    ? "PostgreSQL schemas, transactions, RPC functions, and automated constraints that protect your business logic."
                    : "Modellazione dati rigorosa su PostgreSQL, vincoli relazionali, transazioni sicure e query ottimizzate con indici."}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  {locale === "en" ? "Security by Design" : "Sicurezza Nativa"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {locale === "en"
                    ? "Row Level Security (RLS) policies, schema parsing with Zod, bot defenses via Cloudflare Turnstile, and strict CSP headers."
                    : "Row Level Security (RLS), validazione con Zod su ogni input, protezione bot Turnstile e header HTTP anti-exploit."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full shadow-md">
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

        <BackToHomeButton
          href={locale === "en" ? "/en" : "/"}
          label={dict.nav.backHome}
        />
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
