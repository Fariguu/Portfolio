import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  Lock,
  ArrowLeft,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Github } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectJsonLd } from "@/components/seo/project-json-ld";
import { MarkdownContent } from "@/components/ui/markdown-content";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getAdjacentCaseStudies,
} from "@/lib/data/case-studies";
import { createClient } from "@/lib/supabase/server";
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

async function getProjectFromDb(slug: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("visible", true)
      .single();
    return data;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const slugs = new Set<string>();

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("slug, case_study_md, case_study_md_en")
      .eq("visible", true);

    if (data) {
      for (const p of data) {
        const hasCaseStudy = Boolean(
          (p.case_study_md && p.case_study_md.trim().length > 0) ||
          (p.case_study_md_en && p.case_study_md_en.trim().length > 0)
        );
        if (p.slug && hasCaseStudy) {
          slugs.add(p.slug);
        }
      }
    }
  } catch {
    // Supabase offline o build-time fallback
  }

  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const project = await getProjectFromDb(slug);
  const caseStudy = getCaseStudyBySlug(slug);

  const isEn = locale === "en";
  const preferredMarkdown = isEn ? project?.case_study_md_en : project?.case_study_md;
  const fallbackMarkdown = isEn ? project?.case_study_md : project?.case_study_md_en;
  const markdown = (preferredMarkdown || fallbackMarkdown || "").trim();

  // Se il progetto esiste nel database ma non ha un case study compilato, restituisci 404/non trovato
  if (project && !markdown) {
    return {
      title: "Progetto non trovato | Gabriele Farigu",
    };
  }

  if (!project && !caseStudy) {
    return {
      title: "Progetto non trovato | Gabriele Farigu",
    };
  }

  const titleText = project
    ? (isEn && project.title_en ? project.title_en : project.title)
    : caseStudy?.title[locale];
  const descText = project
    ? (isEn && project.description_en ? project.description_en : project.description)
    : caseStudy?.metaDescription[locale];
  const coverImg = project?.image_url || caseStudy?.coverImage || "";
  const resolvedSlug = project?.slug || caseStudy?.slug || slug;

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${locale === "en" ? "/en" : ""}/progetti/${resolvedSlug}`;
  const itUrl = `${baseUrl}/progetti/${resolvedSlug}`;
  const enUrl = `${baseUrl}/en/progetti/${resolvedSlug}`;

  const title = `${titleText} | ${siteConfig.name}`;
  const description = descText;

  return {
    title,
    description,
    keywords: caseStudy?.metaKeywords[locale] || [titleText || "", "case study", "portfolio"],
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
      images: coverImg ? [{ url: coverImg, width: 1200, height: 630, alt: titleText || "Cover" }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImg ? [coverImg] : [],
      creator: siteConfig.creator,
    },
  };
}

async function getAdjacentProjectsFromDb(currentSlug: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("slug, title, title_en, case_study_md, case_study_md_en")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (!data) return { prev: null, next: null };
    const withCaseStudy = data.filter(
      (p) =>
        Boolean((p.case_study_md || p.case_study_md_en)?.trim()) &&
        Boolean(p.slug)
    );

    if (withCaseStudy.length <= 1) {
      return { prev: null, next: null };
    }

    const index = withCaseStudy.findIndex(
      (p) => p.slug?.toLowerCase() === currentSlug.toLowerCase()
    );
    const safeIndex = index === -1 ? 0 : index;
    const prevIndex = (safeIndex - 1 + withCaseStudy.length) % withCaseStudy.length;
    const nextIndex = (safeIndex + 1) % withCaseStudy.length;

    return {
      prev: withCaseStudy[prevIndex],
      next: withCaseStudy[nextIndex],
    };
  } catch {
    return { prev: null, next: null };
  }
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const project = await getProjectFromDb(slug);
  const caseStudy = getCaseStudyBySlug(slug);

  const isEn = locale === "en";
  const preferredMarkdown = isEn ? project?.case_study_md_en : project?.case_study_md;
  const fallbackMarkdown = isEn ? project?.case_study_md : project?.case_study_md_en;
  const markdown = (preferredMarkdown || fallbackMarkdown || "").trim();

  // Se il progetto esiste nel database ma non ha un case study markdown compilato, 404
  if (project) {
    if (!markdown) {
      notFound();
    }
  } else if (!markdown && !caseStudy) {
    notFound();
  }

  const dict = getDictionary(locale);
  const { prev: dbPrev, next: dbNext } = await getAdjacentProjectsFromDb(project?.slug || slug);
  const staticAdjacent = caseStudy ? getAdjacentCaseStudies(caseStudy.slug || slug) : null;

  const homeHref = locale === "en" ? "/en" : "/";
  const projectsHref = locale === "en" ? "/en#progetti" : "/#progetti";
  const contactHref = locale === "en" ? "/en#contatti" : "/#contatti";

  const prev = dbPrev
    ? {
        slug: dbPrev.slug,
        title: isEn && dbPrev.title_en ? dbPrev.title_en : dbPrev.title,
      }
    : staticAdjacent
    ? {
        slug: staticAdjacent.prev.slug,
        title: staticAdjacent.prev.title[locale],
      }
    : null;

  const next = dbNext
    ? {
        slug: dbNext.slug,
        title: isEn && dbNext.title_en ? dbNext.title_en : dbNext.title,
      }
    : staticAdjacent
    ? {
        slug: staticAdjacent.next.slug,
        title: staticAdjacent.next.title[locale],
      }
    : null;

  const prevHref = prev?.slug
    ? `${locale === "en" ? "/en" : ""}/progetti/${prev.slug}`
    : projectsHref;
  const nextHref = next?.slug
    ? `${locale === "en" ? "/en" : ""}/progetti/${next.slug}`
    : projectsHref;

  const title = project
    ? (isEn && project.title_en ? project.title_en : project.title)
    : caseStudy?.title[locale] || "";

  const subtitle = project
    ? (isEn && project.description_en ? project.description_en : project.description)
    : caseStudy?.subtitle[locale] || "";

  const category = caseStudy ? caseStudy.category[locale] : "Progetto";
  const period = caseStudy ? caseStudy.period : "2024 - 2026";
  const isFeatured = project ? project.featured : caseStudy?.featured;
  const isPrivate = project ? project.is_private : caseStudy?.isPrivate;
  const demoUrl = project?.demo_url || caseStudy?.demoUrl;
  const githubUrl = project?.github_url || caseStudy?.githubUrl;
  const coverImage = project?.image_url || caseStudy?.coverImage || "";
  const tags = project?.tags || caseStudy?.tags || [];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-brand-accent selection:text-brand-accent-foreground font-sans">
      <ProjectJsonLd project={project} caseStudy={caseStudy} locale={locale} />
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
                {title}
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
                {category}
              </span>
              <Badge variant="outline" className="text-xs font-medium">
                {period}
              </Badge>
              {isFeatured && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  Featured Case Study
                </span>
              )}
            </div>

            {/* Titolo e Sottotitolo */}
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Tags badges */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-lg bg-secondary text-secondary-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons (Demo, GitHub, Repo Privato) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {demoUrl && (
                <Button size="lg" className="gap-2 shadow-sm font-semibold rounded-xl" asChild>
                  <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span>{dict.portfolio.liveDemo}</span>
                  </a>
                </Button>
              )}

              {githubUrl && !isPrivate && (
                <Button variant="outline" size="lg" className="gap-2 font-semibold rounded-xl" asChild>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span>{dict.portfolio.codeLabel}</span>
                  </a>
                </Button>
              )}

              {isPrivate && (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-xs font-medium border border-border">
                  <Lock className="h-3.5 w-3.5" />
                  <span>{dict.portfolio.privateRepo}</span>
                </div>
              )}
            </div>

            {/* Cover Image */}
            {coverImage && (
              <div className="relative w-full h-[280px] sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-card">
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* CONTENUTO DEL CASO DI STUDIO */}
        {markdown ? (
          /* Sezione 1: Markdown formattato in automatico dalle logiche del sito */
          <section className="py-14 sm:py-20 border-t border-border/70 bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
              <MarkdownContent content={markdown} />
            </div>
          </section>
        ) : caseStudy ? (
          /* Sezione Fallback Strutturata da case-studies.ts */
          <>
            {/* Sezione: Genesi del Progetto */}
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

            {/* Sezione: Sfide Tecniche & Soluzioni Ingegneristiche */}
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
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {challenge.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : null}

        {/* Sezione: Navigazione Progetti Sequenziale & CTA Finale */}
        <section className="py-14 sm:py-20 border-t border-border/70 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
            
            {/* Prev / Next Project Switcher */}
            {prev && next && (
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
                      {prev.title}
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
                      {next.title}
                    </h4>
                  </div>
                </Link>
              </div>
            )}

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
