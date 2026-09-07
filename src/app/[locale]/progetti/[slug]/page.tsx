import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Github } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectJsonLd } from "@/components/seo/project-json-ld";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getAdjacentCaseStudies,
} from "@/lib/data/case-studies";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";

interface PageProps {
  readonly params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    for (const cs of caseStudies) {
      params.push({ locale, slug: cs.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Progetto non trovato | Gabriele Farigu",
    };
  }

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${locale === "en" ? "/en" : ""}/progetti/${caseStudy.slug}`;
  const itUrl = `${baseUrl}/progetti/${caseStudy.slug}`;
  const enUrl = `${baseUrl}/en/progetti/${caseStudy.slug}`;

  const title = `${caseStudy.title[locale]} | ${siteConfig.name}`;
  const description = caseStudy.metaDescription[locale];

  return {
    title,
    description,
    keywords: caseStudy.metaKeywords[locale],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: itUrl,
        en: enUrl,
        "x-default": itUrl,
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "en" ? "en_US" : "it_IT",
      alternateLocale: [locale === "en" ? "it_IT" : "en_US"],
      url: canonicalUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: caseStudy.coverImage,
          width: 1200,
          height: 630,
          alt: caseStudy.title[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [caseStudy.coverImage],
      creator: siteConfig.creator,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const dict = getDictionary(locale);
  const { prev, next } = getAdjacentCaseStudies(caseStudy.slug);

  const homeHref = locale === "en" ? "/en" : "/";
  const projectsHref = locale === "en" ? "/en#progetti" : "/#progetti";
  const contactHref = locale === "en" ? "/en#contatti" : "/#contatti";

  const prevHref = locale === "en" ? `/en/progetti/${prev.slug}` : `/progetti/${prev.slug}`;
  const nextHref = locale === "en" ? `/en/progetti/${next.slug}` : `/progetti/${next.slug}`;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-brand-accent selection:text-brand-accent-foreground font-sans">
      <ProjectJsonLd caseStudy={caseStudy} locale={locale} />
      <Navbar dict={dict} locale={locale} />

      <main className="flex-1">
        {/* Breadcrumb & Top Bar */}
        <div className="border-b border-border/60 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 py-4 max-w-6xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-muted-foreground flex-wrap">
              <Link href={homeHref} className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href={projectsHref} className="hover:text-foreground transition-colors">
                {dict.nav.projects}
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-none">
                {caseStudy.title[locale]}
              </span>
            </nav>

            <Link
              href={projectsHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{dict.caseStudy.backToProjects}</span>
            </Link>
          </div>
        </div>

        {/* Hero Section del Progetto */}
        <section className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-muted/20 via-background to-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8">
            
            {/* Badges & Meta Info */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-accent/15 text-brand-accent border border-brand-accent/30 shadow-xs">
                {caseStudy.category[locale]}
              </span>
              <Badge variant="outline" className="text-xs font-medium">
                {caseStudy.period}
              </Badge>
              {caseStudy.featured && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  Featured Case Study
                </span>
              )}
            </div>

            {/* Titolo e Sottotitolo */}
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {caseStudy.title[locale]}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {caseStudy.subtitle[locale]}
              </p>
            </div>

            {/* Meta Pill Grid (Ruolo, Committente, Timeline) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-secondary/40 border border-border/80">
              <div>
                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {dict.caseStudy.roleLabel}
                </span>
                <span className="text-sm font-bold text-foreground mt-0.5 block">
                  {caseStudy.role[locale]}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {dict.caseStudy.clientLabel}
                </span>
                <span className="text-sm font-bold text-foreground mt-0.5 block">
                  {caseStudy.client[locale]}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {dict.caseStudy.periodLabel}
                </span>
                <span className="text-sm font-bold text-foreground mt-0.5 block">
                  {caseStudy.period}
                </span>
              </div>
            </div>

            {/* Action Buttons (Demo, GitHub, Repo Privato) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {caseStudy.demoUrl && (
                <Button size="lg" className="gap-2 shadow-sm font-semibold rounded-xl" asChild>
                  <a href={caseStudy.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span>{dict.portfolio.liveDemo}</span>
                  </a>
                </Button>
              )}

              {caseStudy.githubUrl && !caseStudy.isPrivate && (
                <Button variant="outline" size="lg" className="gap-2 font-semibold rounded-xl" asChild>
                  <a href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span>{dict.portfolio.codeLabel}</span>
                  </a>
                </Button>
              )}

              {caseStudy.isPrivate && (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-xs font-medium border border-border">
                  <Lock className="h-3.5 w-3.5" />
                  <span>{dict.portfolio.privateRepo}</span>
                </div>
              )}
            </div>

            {/* Cover Image */}
            <div className="relative w-full h-[280px] sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-card">
              <Image
                src={caseStudy.coverImage}
                alt={caseStudy.title[locale]}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sezione 1: Genesi del Progetto (Il Problema, Il Contesto, L'Obiettivo) */}
        <section className="py-14 sm:py-20 border-t border-border/70 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-accent">
                <Sparkles className="h-4 w-4" />
                <span>Problem & Strategy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {dict.caseStudy.overviewTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Il Problema */}
              <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-amber-500">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">Il Problema Iniziale</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {caseStudy.overview.problem[locale]}
                </p>
              </div>

              {/* Card 2: Il Contesto */}
              <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-brand-accent">
                  <div className="p-2 rounded-lg bg-brand-accent/10">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">Il Contesto Tecnico</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {caseStudy.overview.context[locale]}
                </p>
              </div>

              {/* Card 3: L'Obiettivo */}
              <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-500">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">L&apos;Obiettivo Ingegneristico</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {caseStudy.overview.goal[locale]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sezione 2: Sfide Tecniche & Soluzioni Ingegneristiche */}
        <section className="py-14 sm:py-20 border-t border-border/70 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-accent">
                <Cpu className="h-4 w-4" />
                <span>Engineering Challenges</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {dict.caseStudy.challengesTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {caseStudy.challenges[locale].map((challenge, idx) => (
                <div
                  key={challenge.title}
                  className="p-6 sm:p-8 rounded-2xl border border-border bg-background shadow-xs space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-primary text-primary-foreground">
                      Challenge #{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {challenge.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="p-5 rounded-xl bg-destructive/5 border border-destructive/20 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-destructive">
                        La Complessità / Il Problema:
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {challenge.problem}
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        La Soluzione Ingegneristica:
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">
                        {challenge.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sezione 3: Architettura & Stack Tecnologico */}
        <section className="py-14 sm:py-20 border-t border-border/70 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-accent">
                <Layers className="h-4 w-4" />
                <span>Architecture & Stack</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {dict.caseStudy.architectureTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Architettura e Scelte */}
              <div className="lg:col-span-2 space-y-6">
                <p className="text-base sm:text-lg text-foreground leading-relaxed">
                  {caseStudy.architecture.summary[locale]}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Punti Chiave dell&apos;Architettura:
                  </h4>
                  <ul className="space-y-2.5">
                    {caseStudy.architecture.highlights[locale].map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Badge Stack Tecnologico */}
              <div className="p-6 rounded-2xl bg-secondary/30 border border-border space-y-4">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  {dict.caseStudy.stackTitle}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.stack.map((item) => (
                    <span
                      key={item.name}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-background text-foreground border border-border shadow-2xs flex items-center gap-1.5"
                    >
                      <span>{item.name}</span>
                      {item.version && (
                        <span className="text-[10px] text-brand-accent font-mono">
                          v{item.version}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sezione 4: Funzionalità Chiave & Risultati */}
        <section className="py-14 sm:py-20 border-t border-border/70 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Funzionalità */}
              <div className="p-6 sm:p-8 rounded-2xl bg-background border border-border shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-brand-accent">
                  <CheckCircle2 className="h-5 w-5" />
                  <h3 className="text-xl font-bold text-foreground">
                    {dict.caseStudy.featuresTitle}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {caseStudy.features[locale].map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shrink-0 mt-2" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risultati e Metriche */}
              <div className="p-6 sm:p-8 rounded-2xl bg-background border border-border shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-emerald-500">
                  <TrendingUp className="h-5 w-5" />
                  <h3 className="text-xl font-bold text-foreground">
                    {dict.caseStudy.resultsTitle}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {caseStudy.results[locale].map((res) => (
                    <li key={res} className="flex items-start gap-3 text-sm font-medium text-foreground leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Sezione 5: Navigazione Progetti Sequenziale & CTA Finale */}
        <section className="py-14 sm:py-20 border-t border-border/70 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
            
            {/* Prev / Next Project Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={prevHref}
                className="p-5 rounded-2xl border border-border bg-card hover:border-brand-accent/50 hover:shadow-xs transition-all group flex items-center justify-between"
              >
                <div className="space-y-1 text-left">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                    {dict.caseStudy.prevProject}
                  </span>
                  <h4 className="font-bold text-foreground text-sm sm:text-base group-hover:text-brand-accent transition-colors">
                    {prev.title[locale]}
                  </h4>
                </div>
              </Link>

              <Link
                href={nextHref}
                className="p-5 rounded-2xl border border-border bg-card hover:border-brand-accent/50 hover:shadow-xs transition-all group flex items-center justify-between text-right"
              >
                <div className="space-y-1 text-right ml-auto">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center justify-end gap-1">
                    {dict.caseStudy.nextProject}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <h4 className="font-bold text-foreground text-sm sm:text-base group-hover:text-brand-accent transition-colors">
                    {next.title[locale]}
                  </h4>
                </div>
              </Link>
            </div>

            {/* Banner Call to Action */}
            <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-secondary/60 via-card to-background border border-border text-center space-y-5 shadow-lg">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-accent/15 text-brand-accent border border-brand-accent/30">
                {dict.caseStudy.ctaBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground max-w-2xl mx-auto">
                {dict.caseStudy.ctaTitle}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {dict.caseStudy.ctaDescription}
              </p>
              <div className="pt-2">
                <Button size="lg" className="rounded-xl font-semibold shadow-md gap-2" asChild>
                  <Link href={contactHref}>
                    <span>{dict.caseStudy.ctaButton}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
