import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-background py-24 lg:py-32 flex items-center min-h-[90vh]">
            {/* Background gradients for stunning aesthetic */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className="container px-4 md:px-6 relative z-10 mx-auto">
                <div className="flex flex-col items-center justify-center text-center space-y-8">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20 backdrop-blur-sm cursor-pointer animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                        Studente & Sviluppatore Web
                    </div>

                    <div className="space-y-4 max-w-4xl animate-fade-in-up">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-gray-100 dark:to-gray-500 pb-2">
                           <br className="hidden sm:block" /> Gabriele Farigu
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Sviluppatore web con la passione per le tecnologie moderne. Creo applicazioni full-stack reattive e funzionali con Next.js, React, TypeScript e Supabase, focalizzandomi su codice pulito, privacy e buone performance.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up animation-delay-200">
                        <Button size="lg" className="rounded-full shadow-lg h-12 px-8 group font-medium" asChild>
                            <a href="#progetti">
                                Guarda i miei progetti
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full h-12 px-8 font-medium bg-background/50 backdrop-blur-sm" asChild>
                            <a href="#contatti">Contattami</a>
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 pt-8 text-muted-foreground animate-fade-in-up animation-delay-300">
                        <a href="https://github.com/Fariguu" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <Github className="h-6 w-6" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/gabriele-farigu-3863b1312/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <Linkedin className="h-6 w-6" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="mailto:farigugabriele@gmail.com" className="hover:text-primary transition-colors">
                            <Mail className="h-6 w-6" />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
