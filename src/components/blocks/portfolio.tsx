import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Lock } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/database.types";

interface ProjectDisplay {
    id?: string;
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

const fallbackProjects: ProjectDisplay[] = [
    {
        title: "Impresa Edile",
        statusBadge: "In Evidenza",
        description: "Piattaforma web per un'impresa edile specializzata in costruzioni ex-novo e restauro conservativo di trulli e masserie storiche in Puglia. Integra calcolo preventivo interattivo, vetrina dei servizi chiavi in mano, mappa del territorio con Leaflet e animazioni fluide con Framer Motion.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
        tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Leaflet"],
        github: "https://github.com/Fariguu/Impresa-Edile",
        githubLabel: "Codice GitHub",
        isPrivate: true,
        featured: true,
    },
    {
        title: "EduBook",
        statusBadge: "In sviluppo attivo",
        description: "Piattaforma serverless per la gestione e prenotazione di lezioni private. Offre un'architettura multi-docente, calendario interattivo con partizionamento automatico degli slot orari, autenticazione sicura passwordless (OTP via Supabase), email transazionali con Resend e protezione bot con Cloudflare Turnstile.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "Resend"],
        github: "https://github.com/Fariguu/Educational-Booking-WebSite",
        githubLabel: "Bozza Architettura",
        isPrivate: true,
        featured: false,
    },
    {
        title: "QR-Code Creator",
        description: "Applicazione web client-side per la generazione di codici QR statici ad alta risoluzione (100% privati, non scadono mai). Supporta personalizzazione dei colori, inserimento logo con calcolo intelligente della safe-zone circolare ed esportazione sia in formato PNG HD (fino a 2048px) sia in SVG vettoriale puro.",
        image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=800",
        tags: ["JavaScript ES6+", "HTML5", "CSS3", "Canvas API", "SVG Export"],
        github: "https://github.com/Fariguu/QR-Code-Creator",
        githubLabel: "Codice GitHub",
        isPrivate: false,
        featured: false,
    },
];

export async function Portfolio() {
    let projects: ProjectDisplay[] = fallbackProjects;

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("visible", true)
            .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
            projects = (data as Project[]).map((p) => ({
                id: p.id,
                title: p.title,
                description: p.description,
                image: p.image_url,
                tags: p.tags || [],
                statusBadge: p.status_badge || undefined,
                demo: p.demo_url || undefined,
                github: p.github_url || undefined,
                githubLabel: p.github_label || "Codice",
                isPrivate: p.is_private,
                featured: p.featured,
            }));
        }
    } catch {
        // Fallback to default projects if DB is not reachable
    }

    return (
        <section id="progetti" className="w-full py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mx-auto max-w-2xl text-center space-y-4 mb-16">
                    <p className="text-base font-semibold leading-7 text-primary">Progetti</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        I Miei Lavori e Progetti
                    </h2>
                    <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground mx-auto">
                        Una panoramica delle applicazioni che ho sviluppato: architetture reali, database relazionali, logica client-side e serverless.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <Card key={project.id || index} className="overflow-hidden flex flex-col h-full bg-card group border-border/50 hover:border-primary/50 transition-colors">
                            <div className="relative w-full h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={`Anteprima del progetto ${project.title}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index === 0}
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {project.statusBadge && (
                                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-primary border border-primary/20 shadow-sm">
                                        {project.statusBadge}
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">{project.title}</CardTitle>
                                    {project.isPrivate && (
                                        <span className="flex items-center text-xs text-muted-foreground gap-1" title="Repo principale privato">
                                            <Lock className="h-3 w-3" /> Privato
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="text-sm md:text-base leading-relaxed">
                                    {project.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4 mt-auto">
                                {project.github ? (
                                    <Button variant="outline" size="sm" asChild>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            {project.githubLabel || "Codice"}
                                        </a>
                                    </Button>
                                ) : (
                                    <span className="text-xs text-muted-foreground">Repo privato</span>
                                )}
                                {project.demo && (
                                    <Button size="sm" asChild>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Demo Live
                                        </a>
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button variant="secondary" size="lg" className="rounded-full shadow-sm" asChild>
                        <a href="https://github.com/Fariguu?tab=repositories" target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Esplora tutti i progetti su GitHub
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
