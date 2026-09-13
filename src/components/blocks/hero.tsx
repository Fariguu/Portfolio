import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, CornerDownRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { SaturnOrbit } from "@/components/blocks/saturn-orbit";
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
      {/* Background gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] dark:from-[#047857] dark:to-[#88fc9d] opacity-30 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto flex flex-col items-center">
        <SaturnOrbit>
          <div className="flex flex-col items-center justify-center text-center space-y-5 sm:space-y-6 w-full">
            {/* Badge disponibilità: compatto e protetto da overflow su schermi piccoli */}
            <div className="inline-flex items-center justify-center min-w-0 sm:min-w-[245px] max-w-full rounded-full border border-primary/20 bg-primary/10 dark:border-emerald-500/30 dark:bg-emerald-500/10 px-3.5 py-1 text-xs sm:text-sm font-medium text-primary dark:text-[#88fc9d] transition-colors hover:bg-primary/20 dark:hover:bg-emerald-500/20 backdrop-blur-sm cursor-pointer">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-[#88fc9d] mr-2 shrink-0 animate-pulse"></span>
              <span className="truncate">{dict.hero.badge}</span>
            </div>

            <div className="space-y-3 sm:space-y-4 max-w-4xl px-2">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-gray-100 dark:to-gray-500 pb-2">
                {dict.hero.name}
              </h1>
              <p className="mx-auto max-w-[700px] min-h-0 sm:min-h-[56px] text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground transition-opacity duration-150">
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
                  <Link href={locale === "en" ? "/en/chi-sono" : "/chi-sono"}>
                    <span>{dict.explore.about}</span>
                    <CornerDownRight className="h-3.5 w-3.5 text-brand-accent transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </SaturnOrbit>

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
