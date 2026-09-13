import { createClient } from "@/lib/supabase/server";
import { getIconComponent } from "@/lib/icons";
import { SectionExploreButton } from "@/components/ui/section-explore-button";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

interface FeaturesProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
  readonly showExploreLink?: boolean;
}

export async function Features({
  dict,
  locale,
  showExploreLink = true,
}: Readonly<FeaturesProps>) {
  let features = dict.skills.fallbackList;

  // Se siamo in lingua italiana proviamo a recuperare eventuali aggiornamenti dal DB Supabase
  if (locale === "it") {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        features = data;
      }
    } catch {
      // Fallback sul dizionario se il DB non è raggiungibile
    }
  }

  return (
    <section id="competenze" className="w-full py-24 bg-muted/40 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mx-auto max-w-2xl text-center space-y-4 min-h-[135px] flex flex-col justify-center">
          <p className="text-base font-semibold leading-7 text-primary">
            {dict.skills.badge}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {dict.skills.title}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground mx-auto">
            {dict.skills.description}
          </p>
        </div>
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-24 lg:max-w-none">
          <dl className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-4 pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8 md:overflow-visible">
            {features.map((feature) => {
              const Icon = getIconComponent(feature.icon_name);
              return (
                <div
                  key={feature.name}
                  className="w-[82vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink flex flex-col bg-background p-6 rounded-2xl shadow-xs border border-border/50 hover:border-brand-accent/40 hover:shadow-md transition-all min-h-[190px]"
                  style={{ contain: "layout" }}
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-accent/10 dark:bg-brand-accent/15 shrink-0">
                      <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
                    </div>
                    <span>{feature.name}</span>
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm sm:text-base leading-relaxed text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              );
            })}
          </dl>

          {/* Indicatore scorrimento orizzontale mobile */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <span className="text-[11px] font-medium tracking-wide text-muted-foreground flex items-center gap-1">
              <span>{locale === "en" ? "Swipe to explore skills" : "Scorri per esplorare le competenze"}</span>
              <span className="text-brand-accent font-bold">➔</span>
            </span>
          </div>

          {/* Pulsante di approfondimento per la pagina dedicata /competenze */}
          {showExploreLink && (
            <SectionExploreButton
              href={locale === "en" ? "/en/competenze" : "/competenze"}
              label={dict.explore.skills}
            />
          )}
        </div>
      </div>
    </section>
  );
}
