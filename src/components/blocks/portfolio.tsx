import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock, ArrowRight } from "lucide-react";
import { Github } from "@/components/ui/icons";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/database.types";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { hasCaseStudyDescription } from "@/lib/data/case-studies";

interface ProjectDisplay {
  id?: string;
  slug?: string;
  hasCaseStudy: boolean;
  title: string;
  description: string;
  image: string;
  tags: string[];
  statusBadge?: string;
  demo?: string;
  github?: string;
  githubLabel?: string;
  isPrivate?: boolean;
  featured?: boolean;
}

interface PortfolioProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
}

function resolveProjectSlug(title: string, candidateSlug?: string): string | undefined {
  if (candidateSlug) return candidateSlug;
  const lower = title.toLowerCase().trim();
  if (lower.includes("impresa")) return "impresa-edile";
  if (lower.includes("edubook")) return "edubook";
  if (lower.includes("qr")) return "qr-code-creator";
  return undefined;
}

export async function Portfolio({ dict, locale }: Readonly<PortfolioProps>) {
  let projects: ProjectDisplay[] = dict.portfolio.fallbackList.map((p, idx) => {
    const slug = resolveProjectSlug(p.title, p.slug);
    const hasCaseStudy = Boolean(slug && hasCaseStudyDescription(slug, locale));
    return {
      id: `fallback-${idx}`,
      slug,
      hasCaseStudy,
      title: p.title,
      description: p.description,
      image: p.image,
      tags: p.tags,
      statusBadge: p.statusBadge,
      demo: p.demo,
      github: p.github,
      githubLabel: p.githubLabel || dict.portfolio.codeLabel,
      isPrivate: p.isPrivate,
      featured: p.featured,
    };
  });

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      projects = (data as Project[]).map((p) => {
        // Find matching fallback item by exact title match or slug
        const dictFallback = dict.portfolio.fallbackList.find(
          (f) => f.title.toLowerCase() === p.title.toLowerCase() ||
                 (f.slug && p.title.toLowerCase().includes(f.slug.replace(/-/g, " ")))
        );
        const slug = resolveProjectSlug(p.title, dictFallback?.slug);
        const hasCaseStudy = Boolean(slug && hasCaseStudyDescription(slug, locale));

        if (locale === "en") {
          return {
            id: p.id,
            slug,
            hasCaseStudy,
            title: p.title_en || dictFallback?.title || p.title,
            description: p.description_en || dictFallback?.description || p.description,
            image: p.image_url,
            tags: p.tags || [],
            statusBadge: p.status_badge_en || dictFallback?.statusBadge || undefined,
            demo: p.demo_url || undefined,
            github: p.github_url || undefined,
            githubLabel: p.github_label_en || dictFallback?.githubLabel || dict.portfolio.codeLabel,
            isPrivate: p.is_private,
            featured: p.featured,
          };
        }

        return {
          id: p.id,
          slug,
          hasCaseStudy,
          title: p.title,
          description: p.description,
          image: p.image_url,
          tags: p.tags || [],
          statusBadge: p.status_badge || undefined,
          demo: p.demo_url || undefined,
          github: p.github_url || undefined,
          githubLabel: p.github_label || dict.portfolio.codeLabel,
          isPrivate: p.is_private,
          featured: p.featured,
        };
      });
    }
  } catch {
    // Fallback sul dizionario
  }

  return (
    <section id="progetti" className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mx-auto max-w-2xl text-center space-y-4 mb-16">
          <p className="text-base font-semibold leading-7 text-primary">
            {dict.portfolio.badge}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {dict.portfolio.title}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground mx-auto">
            {dict.portfolio.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id || index}
              className="overflow-hidden flex flex-col h-full bg-card group border-border/50 hover:border-brand-accent/50 transition-all"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${dict.portfolio.previewAltPrefix} ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {project.statusBadge && (
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-brand-accent border border-brand-accent/30 shadow-xs">
                    {project.statusBadge}
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  {project.isPrivate && (
                    <span
                      className="flex items-center text-xs text-muted-foreground gap-1"
                      title={dict.portfolio.privateRepo}
                    >
                      <Lock className="h-3 w-3" /> {dict.portfolio.privateRepo}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                <CardDescription className="text-sm md:text-base leading-relaxed">
                  {project.description}
                </CardDescription>
                {project.hasCaseStudy && project.slug && (
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between text-xs font-semibold border-brand-accent/40 text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent group/btn shadow-2xs"
                      asChild
                    >
                      <Link href={locale === "en" ? `/en/progetti/${project.slug}` : `/progetti/${project.slug}`}>
                        <span>{dict.portfolio.viewCaseStudy}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4 mt-auto">
                {project.github ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-[100px] justify-center"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      {project.githubLabel || dict.portfolio.codeLabel}
                    </a>
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {dict.portfolio.privateRepo}
                  </span>
                )}
                {project.demo && (
                  <Button
                    size="sm"
                    className="min-w-[105px] justify-center"
                    asChild
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {dict.portfolio.liveDemo}
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full shadow-xs min-w-[280px] justify-center"
            asChild
          >
            <a
              href="https://github.com/Fariguu?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              {dict.portfolio.exploreAllGithub}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
