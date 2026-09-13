import { GraduationCap, Award, BookOpen, ExternalLink, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SectionExploreButton } from "@/components/ui/section-explore-button";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

export type TimelineItemType = "education" | "certification" | "milestone";

export interface TimelineItemDisplay {
  id?: string;
  period: string;
  title: string;
  institution: string;
  description: string;
  type?: TimelineItemType;
  isCurrent?: boolean;
  tags?: string[];
  link?: {
    label: string;
    url: string;
  };
}

function formatPeriod(
  startDateStr: string,
  endDateStr: string | null,
  presentLabel: string
): string {
  try {
    const startYear = new Date(startDateStr).getFullYear();
    if (!endDateStr) {
      return `${startYear} — ${presentLabel}`;
    }
    const endYear = new Date(endDateStr).getFullYear();
    return `${startYear} — ${endYear}`;
  } catch {
    return startDateStr;
  }
}

function TimelineTypeIcon({ type }: { readonly type?: TimelineItemType }) {
  if (type === "education") {
    return <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />;
  }
  if (type === "certification") {
    return <Award className="h-4 w-4 text-muted-foreground shrink-0" />;
  }
  return <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />;
}

interface JourneyProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
  readonly showExploreLink?: boolean;
}

export async function Journey({
  dict,
  locale,
  showExploreLink = true,
}: Readonly<JourneyProps>) {
  let timelineData: TimelineItemDisplay[] = dict.journey.fallbackList.map(
    (item, index) => ({
      id: `fallback-${index}`,
      period: item.period,
      title: item.title,
      institution: item.institution,
      description: item.description,
      type: item.type,
      isCurrent: item.isCurrent,
      tags: item.tags,
      link: item.linkUrl
        ? {
            label: item.linkLabel,
            url: item.linkUrl,
          }
        : undefined,
    })
  );

  if (locale === "it") {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("journey_items")
        .select("*")
        .eq("visible", true)
        .order("start_date", { ascending: true })
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        timelineData = data.map((item) => ({
          id: item.id,
          period: formatPeriod(
            item.start_date,
            item.end_date,
            dict.journey.presentLabel
          ),
          title: item.title,
          institution: item.institution,
          description: item.description,
          type: item.type as TimelineItemDisplay["type"],
          isCurrent: !item.end_date,
          tags: item.tags || [],
          link: item.link_url
            ? {
                label: item.link_label || dict.journey.detailsLabel,
                url: item.link_url,
              }
            : undefined,
        }));
      }
    } catch {
      // Fallback sul dizionario
    }
  }

  return (
    <section id="percorso" className="w-full py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center space-y-4 mb-16">
          <p className="text-base font-semibold leading-7 text-primary">
            {dict.journey.badge}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {dict.journey.title}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground mx-auto">
            {dict.journey.description}
          </p>
        </div>

        {/* Mobile Horizontal View (< md) */}
        <div className="block md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-4 pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6">
            {timelineData.map((item, index) => {
              const isCurrent = item.isCurrent;
              return (
                <div
                  key={item.id || index}
                  className="w-[84vw] max-w-[340px] shrink-0 snap-center flex flex-col justify-between bg-card p-5 rounded-2xl border border-border/60 shadow-xs relative"
                >
                  <div className="space-y-3">
                    {/* Top bar: Period + Index / Current badge */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-border/40">
                      <span className="inline-flex items-center text-xs font-bold text-primary tracking-wide">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-primary/80" />
                        {item.period}
                      </span>
                      {isCurrent ? (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                          {dict.journey.presentLabel || "In corso"}
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-semibold text-muted-foreground/60">
                          0{index + 1}
                        </span>
                      )}
                    </div>

                    {/* Title & Institution */}
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-foreground/80 flex items-center gap-1.5 mt-1">
                        <TimelineTypeIcon type={item.type} />
                        <span>{item.institution}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom: Tags & Link */}
                  <div className="space-y-2 pt-3 mt-3 border-t border-border/30">
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[11px] rounded-full bg-secondary/80 text-secondary-foreground font-medium border border-border/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.link && (
                      <div className="pt-1">
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
                        >
                          {item.link.label}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe indicator */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <span className="text-[11px] font-medium tracking-wide text-muted-foreground flex items-center gap-1">
              <span>{locale === "en" ? "Swipe to explore journey" : "Scorri per esplorare il percorso"}</span>
              <span className="text-brand-accent font-bold">➔</span>
            </span>
          </div>
        </div>

        {/* Desktop Vertical Timeline View (>= md) */}
        <div className="hidden md:block max-w-3xl mx-auto">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-border/80 space-y-12">
            {timelineData.map((item, index) => {
              const isCurrent = item.isCurrent;

              return (
                <div key={item.id || index} className="relative group">
                  {/* Bullet point / Dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-background transition-all duration-300 ${
                      isCurrent
                        ? "bg-primary ring-4 ring-primary/20 scale-110"
                        : "bg-foreground group-hover:scale-125 group-hover:bg-primary"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="space-y-2">
                    {/* Date and Title line */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="inline-flex items-center text-sm font-bold text-primary tracking-wide">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-primary/80" />
                        {item.period}
                      </span>
                      <span className="text-muted-foreground font-semibold hidden sm:inline">—</span>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Institution / Subtitle */}
                    <p className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                      <TimelineTypeIcon type={item.type} />
                      <span>{item.institution}</span>
                    </p>

                    {/* Brief Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                      {item.description}
                    </p>

                    {/* Optional Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-xs rounded-full bg-secondary/80 text-secondary-foreground font-medium border border-border/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Optional Link / Certificate */}
                    {item.link && (
                      <div className="pt-2">
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
                        >
                          {item.link.label}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pulsante di approfondimento per la pagina /chi-sono */}
        {showExploreLink && (
          <SectionExploreButton
            href={locale === "en" ? "/en/chi-sono" : "/chi-sono"}
            label={dict.explore.journey}
          />
        )}
      </div>
    </section>
  );
}
