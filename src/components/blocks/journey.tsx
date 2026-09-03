import { GraduationCap, Award, BookOpen, ExternalLink, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

export interface TimelineItemDisplay {
  id?: string;
  period: string;
  title: string;
  institution: string;
  description: string;
  type?: "education" | "certification" | "milestone";
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

interface JourneyProps {
  dict: Dictionary;
  locale: Locale;
}

export async function Journey({ dict, locale }: JourneyProps) {
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

        {/* Timeline container */}
        <div className="max-w-3xl mx-auto">
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
                      {item.type === "education" ? (
                        <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : item.type === "certification" ? (
                        <Award className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
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
      </div>
    </section>
  );
}
