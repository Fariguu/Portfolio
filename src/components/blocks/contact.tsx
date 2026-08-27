"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Contatto Portfolio da ${firstName} ${lastName}`);
        const body = encodeURIComponent(`Nome: ${firstName} ${lastName}\nEmail: ${email}\n\nMessaggio:\n${message}`);
        window.location.href = `mailto:farigugabriele@gmail.com?subject=${subject}&body=${body}`;
        setIsSubmitted(true);
    };

    return (
        <section id="contatti" className="w-full py-24 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-12 lg:grid-cols-2 items-start">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                                Mettiamoci in contatto
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Hai una proposta, un progetto da discutere o vuoi semplicemente scambiare due chiacchiere? Scrivimi pure.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Email</h3>
                                    <a href="mailto:farigugabriele@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        farigugabriele@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Telefono</h3>
                                    <a href="tel:+393701157596" className="text-muted-foreground hover:text-primary transition-colors">
                                        +39 370 115 7596
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Linkedin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">LinkedIn</h3>
                                    <a 
                                        href="https://www.linkedin.com/in/gabriele-farigu-3863b1312/" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        linkedin.com/in/gabriele-farigu
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Posizione</h3>
                                    <p className="text-muted-foreground">Turi (BA), Italia (Disponibile da remoto)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="border-border/50 shadow-sm bg-background">
                        <CardHeader>
                            <CardTitle>Invia un messaggio</CardTitle>
                            <CardDescription>
                                Compila i campi per scrivermi direttamente via email.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isSubmitted ? (
                                <div className="p-6 rounded-lg bg-primary/10 border border-primary/20 text-center space-y-3">
                                    <div className="flex justify-center">
                                        <CheckCircle2 className="h-10 w-10 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-foreground text-lg">Client email aperto!</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Il tuo programma di posta è stato aperto con il messaggio pronto per l&apos;invio a <strong>farigugabriele@gmail.com</strong>.
                                    </p>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFirstName("");
                                            setLastName("");
                                            setEmail("");
                                            setMessage("");
                                        }}
                                    >
                                        Scrivi un altro messaggio
                                    </Button>
                                </div>
                            ) : (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="first-name" className="text-sm font-medium leading-none text-foreground">Nome</label>
                                            <input
                                                id="first-name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Mario"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="last-name" className="text-sm font-medium leading-none text-foreground">Cognome</label>
                                            <input
                                                id="last-name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Rossi"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium leading-none text-foreground">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="mario@esempio.it"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium leading-none text-foreground">Messaggio</label>
                                        <textarea
                                            id="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Raccontami del tuo progetto o della tua richiesta..."
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Invia Messaggio via Email
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
