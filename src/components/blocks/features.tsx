import { Database, Layers, MonitorSmartphone, ShieldCheck } from "lucide-react";

const features = [
    {
        name: "Frontend Moderno con Next.js",
        description: "Realizzo interfacce utente reattive e veloci con Next.js (App Router), React, TypeScript e Tailwind CSS.",
        icon: MonitorSmartphone,
    },
    {
        name: "Backend & Database Relazionali",
        description: "Gestione di database con Supabase (PostgreSQL) e SQLite, con query sicure, funzioni RPC e modellazione dei dati.",
        icon: Database,
    },
    {
        name: "Sicurezza, Privacy & Validazione",
        description: "Focus su buone pratiche: Row Level Security (RLS), validazione degli schemi con Zod e protezione anti-spam con Cloudflare Turnstile.",
        icon: ShieldCheck,
    },
    {
        name: "Interattività, Mappe & Grafica",
        description: "Integrazione di mappe dinamiche con Leaflet, animazioni fluide con Framer Motion e grafica vettoriale/Canvas client-side.",
        icon: Layers,
    },
];

export function Features() {
    return (
        <section id="competenze" className="w-full py-24 bg-muted/40 relative">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mx-auto max-w-2xl lg:text-center space-y-4 text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">Competenze</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        Tecnologie e Metodo di Lavoro
                    </p>
                    <p className="max-w-xl text-lg leading-8 text-muted-foreground mx-auto">
                        Gli strumenti e i principi che applico quotidianamente nello sviluppo dei miei progetti web e software.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col bg-background p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10">
                                        <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
