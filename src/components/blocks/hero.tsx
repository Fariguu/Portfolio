import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, CornerDownRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { DesktopOrbit } from "@/components/blocks/desktop-orbit";
import { TechChips } from "@/components/blocks/tech-chips";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

interface HeroProps {
  readonly dict: Dictionary;
  readonly locale?: Locale;
  readonly showExploreLink?: boolean;
}

export function Hero({
  dict,
  locale = "it",
  showExploreLink = true,
}: Readonly<HeroProps>) {
  return (
    <section
      id="chi-sono"
      className="relative w-full overflow-hidden bg-background pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-10 lg:pb-14 flex items-center min-h-[85vh] sm:min-h-[90vh]"
    >
      {/* Background ambient glow: gradiente radiale nativo a 0ms senza overhead di rasterizzazione */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(144,137,252,0.18),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(4,120,87,0.20),transparent)]"
        aria-hidden="true"
      />

      <div className="container px-4 md:px-6 relative z-10 mx-auto flex flex-col items-center">
        <div className="relative w-full min-h-0 py-6 md:py-0 md:min-h-[550px] flex items-center justify-center select-none overflow-visible">
          {/* Layer orbitante 3D: caricato asincronamente esclusivamente su desktop (>= md) */}
          <DesktopOrbit />

          {/* Il Pianeta / Contenuto Centrale: Server Component puro al 100% */}
          <div className="relative z-50 flex flex-col items-center justify-center max-w-2xl text-center pointer-events-auto w-full space-y-5 sm:space-y-6">
            {/* Badge disponibilità: compatto e protetto da overflow su schermi piccoli */}
            <div className="inline-flex items-center justify-center min-w-0 sm:min-w-[245px] max-w-full rounded-full border border-primary/20 bg-primary/10 dark:border-emerald-500/30 dark:bg-emerald-500/10 px-3.5 py-1 text-xs sm:text-sm font-medium text-primary dark:text-[#88fc9d] transition-colors hover:bg-primary/20 dark:hover:bg-emerald-500/20 backdrop-blur-sm cursor-pointer">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-[#88fc9d] mr-2 shrink-0 animate-pulse"></span>
              <span className="truncate">{dict.hero.badge}</span>
            </div>

            <div className="space-y-3 sm:space-y-4 max-w-4xl px-2">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-gray-100 dark:to-gray-500 pb-2">
                {dict.hero.name}
              </h1>
              <p className="mx-auto max-w-[700px] min-h-0 sm:min-h-[56px] text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
                {dict.hero.tagline}
              </p>
            </div>

            {/* CTA Buttons responsive ed ergonomici al tocco */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="rounded-full shadow-lg h-12 w-full sm:w-[230px] justify-center group font-medium transition-all duration-200"
                asChild
              >
                <a href="#progetti">
                  <span>{dict.hero.ctaProjects}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 w-full sm:w-[150px] justify-center font-medium bg-background/50 backdrop-blur-sm hover:text-brand-accent hover:border-brand-accent/40 transition-all duration-200"
                asChild
              >
                <a href="#contatti">{dict.hero.ctaContact}</a>
              </Button>
            </div>

            {/* Link di approfondimento per la pagina dedicata /chi-sono */}
            {showExploreLink && (
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full px-4 h-9 transition-colors inline-flex items-center gap-1.5"
                  asChild
                >
                  <Link href={locale === "en" ? "/en/chi-sono" : "/chi-sono"} prefetch={false}>
                    <span>{dict.explore.about}</span>
                    <CornerDownRight className="h-3.5 w-3.5 text-brand-accent transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Tech Stack Chips statici per schermi mobile (< md): Server Component puro */}
            <TechChips />
          </div>
        </div>

        {/* Social Icons posizionati all'esterno dell'orbita per eliminare qualsiasi sovrapposizione visiva */}
        <div className="flex items-center gap-6 pt-2 sm:pt-4 text-muted-foreground relative z-30">
          <a
            href="https://github.com/Fariguu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-accent transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/gabriele-farigu-3863b1312/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-accent transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="mailto:farigugabriele@gmail.com"
            className="hover:text-brand-accent transition-colors"
          >
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
