import { createClient } from "@/lib/supabase/server";
import { getIconComponent } from "@/lib/icons";

const fallbackFeatures = [
    {
        name: "Frontend Moderno con Next.js",
        description: "Realizzo interfacce utente reattive e veloci con Next.js (App Router), React, TypeScript e Tailwind CSS.",
        icon_name: "MonitorSmartphone",
    },
    {
        name: "Backend & Database Relazionali",
        description: "Gestione di database con Supabase (PostgreSQL) e SQLite, con query sicure, funzioni RPC e modellazione dei dati.",
        icon_name: "Database",
    },
    {
        name: "Sicurezza, Privacy & Validazione",
        description: "Focus su buone pratiche: Row Level Security (RLS), validazione degli schemi con Zod e protezione anti-spam con Cloudflare Turnstile.",
        icon_name: "ShieldCheck",
    },
    {
        name: "Interattività, Mappe & Grafica",
        description: "Integrazione di mappe dinamiche con Leaflet, animazioni fluide con Framer Motion e grafica vettoriale/Canvas client-side.",
        icon_name: "Layers",
    },
];

export async function Features() {
    let features = fallbackFeatures;

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
        // Fallback gracefully to default list if DB not reachable
    }

    return (
        <section id="competenze" className="w-full py-24 bg-muted/40 relative">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mx-auto max-w-2xl text-center space-y-4">
                    <p className="text-base font-semibold leading-7 text-primary">Competenze</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        Tecnologie e Metodo di Lavoro
                    </h2>
                    <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground mx-auto">
                        Gli strumenti e i principi che applico quotidianamente nello sviluppo dei miei progetti web e software.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {features.map((feature) => {
                            const Icon = getIconComponent(feature.icon_name);
                            return (
                                <div key={feature.name} className="flex flex-col bg-background p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10">
                                            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            );
                        })}
                    </dl>
                </div>
            </div>
        </section>
    );
}
