import { createClient } from "@/lib/supabase/server";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import type { Testimonial } from "@/lib/database.types";
import { Star, Quote, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getBaseUrl } from "@/lib/url";

interface TestimonialsProps {
  readonly dict: Dictionary;
  readonly locale?: Locale;
}

export async function Testimonials({ dict, locale = "it" }: Readonly<TestimonialsProps>) {
  let testimonials: Testimonial[] = [];
  let validCaseStudySlugs = new Set<string>();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (!error && data) {
      testimonials = data;
    }

    if (testimonials.length > 0) {
      const { data: projectsData } = await supabase
        .from("projects")
        .select("slug, case_study_md, case_study_md_en")
        .eq("visible", true);

      if (projectsData) {
        validCaseStudySlugs = new Set(
          projectsData
            .filter((p) =>
              Boolean(
                (p.case_study_md && p.case_study_md.trim().length > 0) ||
                (p.case_study_md_en && p.case_study_md_en.trim().length > 0)
              ) && Boolean(p.slug)
            )
            .map((p) => p.slug as string)
        );
      }
    }
  } catch {
    // In caso di errore di connessione DB o assenza tabella, testimonials resta vuoto
  }

  // Se l'array è vuoto o non ci sono testimonianze visibili, il componente non renderizza NULLA (zero ingombro)
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Calcolo dati statistici per Schema.org
  const totalRating = testimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0);
  const averageRating = (totalRating / testimonials.length).toFixed(1);
  const baseUrl = getBaseUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gabriele Farigu",
    url: baseUrl,
    jobTitle: "Software & Web Developer",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: testimonials.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((item) => {
      const quote =
        locale === "en" && item.quote_en ? item.quote_en : item.quote_it;
      return {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: item.author_name,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: item.rating || 5,
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: quote,
        datePublished: item.date || item.created_at.slice(0, 10),
      };
    }),
  };

  return (
    <section
      id="testimonials"
      className="w-full py-24 bg-muted/20 relative border-t border-border/40 overflow-hidden"
    >
      {/* Schema.org Review & AggregateRating per Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container px-4 md:px-6 mx-auto">
        {/* Intestazione Sezione */}
        <div className="mx-auto max-w-2xl text-center space-y-4 mb-12 sm:mb-16">
          <p className="text-base font-semibold leading-7 text-primary dark:text-[#88fc9d]">
            {dict.testimonials.badge}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {dict.testimonials.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {dict.testimonials.description}
          </p>

          {/* Badge Rating Medio */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background/80 border border-border/80 shadow-2xs backdrop-blur-xs text-xs font-medium text-foreground mt-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
              ))}
            </div>
            <span>
              <strong>{averageRating}</strong> / 5.0 • {testimonials.length}{" "}
              {locale === "en" ? "reviews" : "recensioni"}
            </span>
          </div>
        </div>

        {/* Layout Mobile: Scorrimento Orizzontale Touch con Snap & Card Peek */}
        {/* Layout Desktop: Griglia Responsiva bilanciata */}
        <div className="w-full">
          {/* Indicatore visivo swipe su mobile */}
          <div className="flex md:hidden items-center justify-end gap-1.5 text-xs text-muted-foreground mb-3 px-1">
            <span className="font-medium">{dict.testimonials.swipeHint}</span>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none scroll-smooth">
            {testimonials.map((item) => {
              const role =
                locale === "en" && item.role_or_project_en
                  ? item.role_or_project_en
                  : item.role_or_project_it;
              const quote =
                locale === "en" && item.quote_en
                  ? item.quote_en
                  : item.quote_it;

              const caseStudyUrl =
                item.project_slug && validCaseStudySlugs.has(item.project_slug)
                  ? `/${locale === "en" ? "en/" : ""}progetti/${item.project_slug}`
                  : null;

              return (
                <div
                  key={item.id}
                  className="w-[86vw] sm:w-[380px] md:w-auto shrink-0 snap-center flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border/70 bg-card/60 dark:bg-card/40 backdrop-blur-sm shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 relative group"
                >
                  {/* Virgolette decorative di sfondo */}
                  <Quote className="absolute top-5 right-5 h-8 w-8 text-muted-foreground/15 group-hover:text-primary/20 transition-colors pointer-events-none" />

                  <div>
                    {/* Valutazione a stelle */}
                    <div className="flex items-center gap-1 mb-4" aria-label={`Valutazione: ${item.rating || 5} su 5 stelle`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (item.rating || 5)
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted-foreground/25"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Citazione della recensione */}
                    <blockquote className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal italic relative z-10">
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Informazioni Autore & Azioni Footer */}
                  <div className="mt-6 pt-5 border-t border-border/50 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {item.avatar_url ? (
                          <Image
                            src={item.avatar_url}
                            alt={item.author_name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover border border-border shrink-0"
                            unoptimized
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 border border-primary/20">
                            {item.author_name.slice(0, 2).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 font-semibold text-sm text-foreground truncate">
                            <span className="truncate">{item.author_name}</span>
                            {item.company_url && (
                              <a
                                href={item.company_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                                title="Visita profilo"
                                aria-label={`Visita profilo di ${item.author_name}`}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{role}</p>
                        </div>
                      </div>

                      {/* Badge recensione verificata */}
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0"
                        title={dict.testimonials.verifiedReview}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="hidden sm:inline">
                          {dict.testimonials.verifiedReview}
                        </span>
                      </span>
                    </div>

                    {/* Link facoltativo al Caso di Studio associato */}
                    {caseStudyUrl && (
                      <div className="pt-2">
                        <Link
                          href={caseStudyUrl}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline group/link"
                        >
                          <span>{dict.testimonials.viewProject}</span>
                          <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                        </Link>
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
