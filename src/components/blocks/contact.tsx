"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Linkedin, Mail, MapPin, Phone, Loader2, AlertCircle, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";

export function Contact() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [turnstileToken, setTurnstileToken] = React.useState<string>("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [submittedEmail, setSubmittedEmail] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const result = await sendContactEmail({
                firstName,
                lastName,
                email,
                message,
                turnstileToken,
            });

            if (!result.success) {
                setErrorMessage(result.error || "Impossibile inviare il messaggio. Riprova.");
                setIsSubmitting(false);
                return;
            }

            setSubmittedEmail(email);
            setIsSubmitted(true);
        } catch (err: any) {
            setErrorMessage(err.message || "Si è verificato un errore imprevisto. Riprova.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setTurnstileToken("");
        setErrorMessage(null);
    };

    return (
        <section id="contatti" className="w-full py-24 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-12 lg:grid-cols-2 items-start">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <p className="text-base font-semibold leading-7 text-brand-accent">Contatti</p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                                Mettiamoci in Contatto
                            </h2>
                            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                Hai una proposta, un progetto da discutere o vuoi semplicemente scambiare due chiacchiere? Compila il modulo o scrivimi direttamente.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 dark:bg-brand-accent/15">
                                    <Mail className="h-6 w-6 text-brand-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Email</h3>
                                    <a href="mailto:farigugabriele@gmail.com" className="text-muted-foreground hover:text-brand-accent transition-colors">
                                        farigugabriele@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 dark:bg-brand-accent/15">
                                    <Phone className="h-6 w-6 text-brand-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Telefono</h3>
                                    <a href="tel:+393701157596" className="text-muted-foreground hover:text-brand-accent transition-colors">
                                        +39 370 115 7596
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 dark:bg-brand-accent/15">
                                    <Linkedin className="h-6 w-6 text-brand-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">LinkedIn</h3>
                                    <a 
                                        href="https://www.linkedin.com/in/gabriele-farigu-3863b1312/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-muted-foreground hover:text-brand-accent transition-colors"
                                    >
                                        linkedin.com/in/gabriele-farigu
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 dark:bg-brand-accent/15">
                                    <MapPin className="h-6 w-6 text-brand-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Posizione</h3>
                                    <p className="text-muted-foreground">Turi (BA), Italia (Disponibile da remoto)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="border-border/50 hover:border-brand-accent/30 shadow-sm bg-background transition-colors">
                        <CardHeader>
                            <CardTitle>Invia un messaggio</CardTitle>
                            <CardDescription>
                                Compila i campi sottostanti. Riceverai un&apos;email automatica di conferma e ti ricontatterò al più presto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isSubmitted ? (
                                <div className="p-8 rounded-xl bg-primary/5 border border-primary/20 text-center space-y-4 animate-fade-in">
                                    <div className="flex justify-center">
                                        <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-foreground text-xl">Messaggio Inviato!</h4>
                                        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                                            Grazie per avermi scritto! Ho preso in carico la tua richiesta e ti risponderò a breve all&apos;indirizzo <strong>{submittedEmail}</strong>.
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={handleReset}
                                            className="rounded-full"
                                        >
                                            Invia un altro messaggio
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {errorMessage && (
                                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2 animate-fade-in">
                                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="first-name" className="text-sm font-medium leading-none text-foreground">Nome *</label>
                                            <input
                                                id="first-name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                disabled={isSubmitting}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Mario"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="last-name" className="text-sm font-medium leading-none text-foreground">Cognome *</label>
                                            <input
                                                id="last-name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                disabled={isSubmitting}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Rossi"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium leading-none text-foreground">Email *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={isSubmitting}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="mario@esempio.it"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium leading-none text-foreground">Messaggio *</label>
                                        <textarea
                                            id="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            disabled={isSubmitting}
                                            rows={4}
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                            placeholder="Descrivi brevemente la tua richiesta o proposta..."
                                            required
                                        />
                                    </div>

                                    {/* Cloudflare Turnstile anti-bot widget (attivo se site key presente) */}
                                    {turnstileSiteKey && (
                                        <div className="pt-1 flex justify-center sm:justify-start">
                                            <Turnstile
                                                siteKey={turnstileSiteKey}
                                                onSuccess={(token) => setTurnstileToken(token)}
                                                onError={() => setErrorMessage("Errore di caricamento del controllo anti-bot. Ricarica la pagina.")}
                                                onExpire={() => setTurnstileToken("")}
                                                options={{
                                                    theme: "auto",
                                                    size: "flexible",
                                                }}
                                            />
                                        </div>
                                    )}

                                    <Button type="submit" className="w-full h-11 font-medium" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Invio del messaggio in corso...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                Invia Messaggio
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-xs text-muted-foreground text-center pt-1">
                                        Inviando il messaggio accetti il trattamento dei dati personali per la gestione della richiesta. Leggi la{" "}
                                        <Link href="/privacy" className="underline hover:text-primary transition-colors">
                                            Privacy Policy
                                        </Link>.
                                    </p>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
