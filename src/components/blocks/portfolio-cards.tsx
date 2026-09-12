"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Lock, ArrowRight } from "lucide-react";
import { Github } from "@/components/ui/icons";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

export interface ProjectDisplay {
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

interface PortfolioCardsProps {
  readonly projects: ProjectDisplay[];
  readonly dict: Dictionary;
  readonly locale: Locale;
}

export function PortfolioCards({
  projects,
  dict,
  locale,
}: Readonly<PortfolioCardsProps>) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [maxTextHeight, setMaxTextHeight] = React.useState<number | null>(null);

  const measureHeights = React.useCallback(() => {
    if (!containerRef.current) return;
    const textEls =
      containerRef.current.querySelectorAll<HTMLElement>("[data-project-desc]");
    let max = 0;
    textEls.forEach((el) => {
      const h = el.offsetHeight;
      if (h > max) max = h;
    });
    if (max > 0) {
      setMaxTextHeight(max);
    }
  }, []);

  React.useEffect(() => {
    measureHeights();

    if (typeof window === "undefined") return;

    const resizeObserver = new ResizeObserver(() => {
      measureHeights();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(measureHeights);
    }

    window.addEventListener("resize", measureHeights);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureHeights);
    };
  }, [measureHeights, projects]);

  return (
    <>
      <div
        ref={containerRef}
        className="flex items-stretch overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-6 pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible"
      >
        {projects.map((project, index) => (
          <Card
            key={project.id || index}
            className="w-[85vw] max-w-[360px] shrink-0 snap-center self-stretch md:w-auto md:max-w-none md:shrink overflow-hidden flex flex-col bg-card group border-border/50 hover:border-brand-accent/50 transition-all shadow-xs"
          >
            {/* Blocco 1: Immagine */}
            <div className="relative w-full h-48 overflow-hidden shrink-0">
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

            {/* Intestazione: Blocchi 2 e 3 */}
            <CardHeader className="flex-none p-6 pb-0 space-y-2">
              {/* Blocco 2: Titolo e visibilità (allineato su tutte le card) */}
              <div className="h-[3.25rem] sm:h-[3rem] flex items-center justify-between gap-2 shrink-0">
                <CardTitle className="text-lg sm:text-xl font-bold leading-snug line-clamp-2">
                  {project.title}
                </CardTitle>
                {project.isPrivate && (
                  <span
                    className="flex items-center text-xs text-muted-foreground gap-1 shrink-0"
                    title={dict.portfolio.privateRepo}
                  >
                    <Lock className="h-3.5 w-3.5" /> {dict.portfolio.privateRepo}
                  </span>
                )}
              </div>

              {/* Blocco 3: Tecnologie (allineato su tutte le card) */}
              <div className="h-[5.5rem] md:h-[4.25rem] overflow-hidden flex flex-wrap content-start gap-1.5 shrink-0 pt-1">
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

            {/* Contenuto: Blocchi 4 e 5 */}
            <CardContent className="flex-none flex flex-col p-6 pt-4">
              {/* Blocco 4: Testo descrittivo (altezza equalizzata sulla card con più testo; le altre lasciano lo spazio bianco fino al blocco 5) */}
              <div
                className="flex flex-col justify-start min-h-[19.5rem] sm:min-h-[16rem] md:min-h-[13rem]"
                style={
                  maxTextHeight ? { height: `${maxTextHeight}px` } : undefined
                }
              >
                <div
                  data-project-desc
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {project.description}
                </div>
              </div>

              {/* Blocco 5: Collegamento al caso di studio (perfettamente allineato sulla stessa riga orizzontale) */}
              <div className="pt-4 shrink-0">
                {project.hasCaseStudy && project.slug ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-xs font-semibold border-brand-accent/40 text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent group/btn shadow-2xs h-9"
                    asChild
                  >
                    <Link
                      href={
                        locale === "en"
                          ? `/en/progetti/${project.slug}`
                          : `/progetti/${project.slug}`
                      }
                    >
                      <span>{dict.portfolio.viewCaseStudy}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                ) : (
                  <div className="h-9 w-full invisible" aria-hidden="true" />
                )}
              </div>
            </CardContent>

            {/* Blocco 6: Collegamenti a GitHub / Demo Live (perfettamente allineato in fondo) */}
            <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-border/50 p-6 pt-4 mt-auto min-h-[60px] shrink-0">
              {project.github ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 min-w-[85px] h-10 sm:h-9 justify-center text-xs sm:text-sm"
                  asChild
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {project.githubLabel || dict.portfolio.codeLabel}
                    </span>
                  </a>
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground py-1">
                  {dict.portfolio.privateRepo}
                </span>
              )}
              {project.demo && (
                <Button
                  size="sm"
                  className="flex-1 min-w-[85px] h-10 sm:h-9 justify-center text-xs sm:text-sm"
                  asChild
                >
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4 shrink-0" />
                    <span className="truncate">{dict.portfolio.liveDemo}</span>
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Indicatore scorrimento orizzontale mobile */}
      <div className="flex md:hidden items-center justify-center gap-2 -mt-1 mb-6 text-xs text-muted-foreground">
        <span className="text-[11px] font-medium tracking-wide text-muted-foreground flex items-center gap-1">
          <span>
            {locale === "en"
              ? "Swipe to explore projects"
              : "Scorri per esplorare i progetti"}
          </span>
          <span className="text-brand-accent font-bold">➔</span>
        </span>
      </div>
    </>
  );
}
