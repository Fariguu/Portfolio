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
      className="relative w-full overflow-hidden bg-background pt-3 pb-3 md:pt-10 md:pb-14 flex flex-col justify-center md:min-h-[85vh] lg:min-h-[90vh]"
    >
      {/* Background ambient glow: gradiente radiale nativo a 0ms senza overhead di rasterizzazione */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(144,137,252,0.18),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(4,120,87,0.20),transparent)]"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* OPZIONE 2: COMPACT MOBILE PROFILE CARD (< md)                            */}
      {/* Profilo condensato a scheda (~135px) che libera tutto lo spazio          */}
      {/* inferiore per i 3 toggle (Competenze, Percorso, Progetti) above-the-fold */}
      {/* ========================================================================= */}
      <div className="md:hidden w-full px-4 container mx-auto mb-2">
        <div className="rounded-2xl border border-border/80 bg-card/80 p-3.5 backdrop-blur-md shadow-xs flex flex-col gap-3">
          {/* Header riga: Avatar con pulse status + Nome + Disponibilità */}
          <div className="flex items-center gap-3">
            {/* Avatar compatto con indicatore attivo verde */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent/20 via-primary/10 to-emerald-500/15 border border-primary/25 font-bold text-sm tracking-wider text-foreground select-none">
              GF
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-card"></span>
              </span>
            </div>

            {/* Info profilo essenziali */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1.5">
                <h1 className="text-base font-bold tracking-tight text-foreground truncate">
                  {dict.hero.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-[#88fc9d] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {locale === "en" ? "Available" : "Disponibile"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {locale === "en"
                  ? "Full Stack Web & Software Developer"
                  : "Sviluppatore Web & Software Full Stack"}
              </p>
              {showExploreLink && (
                <div className="mt-1">
                  <Link
                    href={locale === "en" ? "/en/chi-sono" : "/chi-sono"}
                    prefetch={false}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-accent hover:underline"
                  >
                    <span>{dict.explore.about}</span>
                    <CornerDownRight className="h-2.5 w-2.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Micro nastro orizzontale Tech Stack integrato nella card */}
          <TechChips className="mt-0" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP HERO CLASSICO (>= md)                                             */}
      {/* Esperienza immersiva a schermo intero con orbita 3D e bottoni completi    */}
      {/* ========================================================================= */}
      <div className="hidden md:flex container px-4 md:px-6 relative z-10 mx-auto flex-col items-center">
        <div className="relative w-full min-h-[550px] flex items-center justify-center select-none overflow-visible">
          {/* Layer orbitante 3D: caricato asincronamente esclusivamente su desktop (>= md) */}
          <DesktopOrbit />

          {/* Il Pianeta / Contenuto Centrale: Server Component puro al 100% */}
          <div className="relative z-50 flex flex-col items-center justify-center max-w-2xl text-center pointer-events-auto w-full space-y-6">
            {/* Badge disponibilità */}
            <div className="inline-flex items-center justify-center min-w-[245px] max-w-full rounded-full border border-primary/20 bg-primary/10 dark:border-emerald-500/30 dark:bg-emerald-500/10 px-3.5 py-1 text-sm font-medium text-primary dark:text-[#88fc9d] transition-colors hover:bg-primary/20 dark:hover:bg-emerald-500/20 backdrop-blur-sm cursor-pointer">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-[#88fc9d] mr-2 shrink-0 animate-pulse"></span>
              <span className="truncate">{dict.hero.badge}</span>
            </div>

            <div className="space-y-4 max-w-4xl px-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl/none font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-gray-100 dark:to-gray-500 pb-2">
                {dict.hero.name}
              </h1>
              <p className="mx-auto max-w-[700px] min-h-[56px] text-xl/relaxed text-muted-foreground">
                {dict.hero.tagline}
              </p>
            </div>

            {/* CTA Buttons: visibili su desktop */}
            <div className="flex items-center justify-center gap-4 w-auto">
              <Button
                size="lg"
                className="rounded-full shadow-lg h-12 w-[220px] justify-center group font-medium transition-all duration-200"
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
                className="rounded-full h-12 w-[150px] justify-center font-medium bg-background/50 backdrop-blur-sm hover:text-brand-accent hover:border-brand-accent/40 transition-all duration-200"
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
          </div>
        </div>

        {/* Social Icons posizionati all'esterno dell'orbita su desktop */}
        <div className="flex items-center gap-6 pt-4 text-muted-foreground relative z-30">
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
