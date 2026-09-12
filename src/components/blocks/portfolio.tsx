import { Button } from "@/components/ui/button";
import { Github } from "@/components/ui/icons";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/database.types";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { hasCaseStudyDescription } from "@/lib/data/case-studies";
import { PortfolioCards, type ProjectDisplay } from "./portfolio-cards";

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
        const slug = p.slug || resolveProjectSlug(p.title, dictFallback?.slug);
        const hasDbCaseStudy = Boolean(
          (locale === "en" ? (p.case_study_md_en || p.case_study_md) : p.case_study_md)?.trim()
        );
        const hasCaseStudy = hasDbCaseStudy || Boolean(slug && hasCaseStudyDescription(slug, locale));

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

        <PortfolioCards projects={projects} dict={dict} locale={locale} />

        <div className="mt-8 sm:mt-12 text-center">
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full shadow-xs w-full sm:w-auto sm:min-w-[280px] h-12 justify-center font-medium"
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
