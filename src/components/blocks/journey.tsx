import { GraduationCap, Award, BookOpen, ExternalLink, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

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

const fallbackTimeline: TimelineItemDisplay[] = [
    {
        period: "2019 — 2024",
        title: "Diploma di Scuola Secondaria di Secondo Grado — Sistemi Informativi Aziendali (SIA)",
        institution: "I.I.S.S. \"Pertini - Anelli - Pinto\"",
        description: "Diploma conseguito con specializzazione in Sistemi Informativi Aziendali (SIA). Formazione incentrata su programmazione e sviluppo software gestionale, progettazione e modellazione di database relazionali (SQL), reti informatiche, sicurezza dei dati aziendali ed economia d'impresa.",
        type: "education",
        isCurrent: false,
        tags: [
            "Sistemi Informativi Aziendali",
            "Database SQL",
            "Programmazione",
            "Reti e Sicurezza Dati",
            "Economia Aziendale",
        ],
        link: {
            label: "Sito Ufficiale Istituto",
            url: "https://www.pertinianellipinto.edu.it/",
        },
    },
    {
        period: "2024 — Presente",
        title: "Laurea in Informatica e Tecnologie per la Produzione del Software (ITPS)",
        institution: "Università degli Studi di Bari Aldo Moro — Dipartimento di Informatica",
        description: "Percorso accademico focalizzato sui fondamenti teorici e metodologici della programmazione, dell'algoritmica e dell'ingegneria del software. Approfondimento dei modelli e tecniche per la produzione, verifica e manutenzione di sistemi software affidabili, gestione di basi di dati e sviluppo di interfacce utente efficaci.",
        type: "education",
        isCurrent: true,
        tags: [
            "Ingegneria del Software",
            "Algoritmi e Strutture Dati",
            "Programmazione",
            "Basi di Dati",
            "Architettura dei Sistemi",
            "UI/UX Design",
        ],
        link: {
            label: "Scheda CdL UniBa ITPS",
            url: "https://www.uniba.it/it/corsi/cdl-informatica-tecnologie-produzione-software",
        },
    },
];

function formatPeriod(startDateStr: string, endDateStr: string | null): string {
    try {
        const startYear = new Date(startDateStr).getFullYear();
        if (!endDateStr) {
            return `${startYear} — Presente`;
        }
        const endYear = new Date(endDateStr).getFullYear();
        return `${startYear} — ${endYear}`;
    } catch {
        return startDateStr;
    }
}

export async function Journey() {
    let timelineData: TimelineItemDisplay[] = fallbackTimeline;

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
                period: formatPeriod(item.start_date, item.end_date),
                title: item.title,
                institution: item.institution,
                description: item.description,
                type: item.type as TimelineItemDisplay["type"],
                isCurrent: !item.end_date,
                tags: item.tags || [],
                link: item.link_url
                    ? {
                          label: item.link_label || "Vedi Dettagli",
                          url: item.link_url,
                      }
                    : undefined,
            }));
        }
    } catch {
        // Fallback to default timeline if DB is not reachable
    }

    return (
        <section id="percorso" className="w-full py-24 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center space-y-4 mb-16">
                    <p className="text-base font-semibold leading-7 text-primary">Percorso</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        Formazione & Traguardi
                    </h2>
                    <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground mx-auto">
                        Come ho costruito le mie competenze: il percorso scolastico, gli studi universitari e le tappe fondamentali della mia crescita.
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
                                        className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-background transition-all duration-300 ${isCurrent
                                                ? "bg-brand-accent ring-4 ring-brand-accent/25 scale-110"
                                                : "bg-foreground group-hover:scale-125 group-hover:bg-brand-accent"
                                            }`}
                                        aria-hidden="true"
                                    />

                                    {/* Content */}
                                    <div className="space-y-2">
                                        {/* Date and Title line */}
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <span className="inline-flex items-center text-sm font-semibold text-foreground tracking-wide">
                                                <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
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
                                                    className="inline-flex items-center text-xs font-semibold text-brand-accent hover:underline"
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
