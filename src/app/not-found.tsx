import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Mail, Code2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 py-16 relative overflow-hidden text-center">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-25 dark:opacity-15 blur-3xl pointer-events-none">
        <div className="w-[450px] h-[450px] bg-primary rounded-full" />
      </div>

      <div className="max-w-md w-full space-y-8 p-8 border border-border/60 rounded-3xl bg-card shadow-lg relative z-10 animate-fade-in">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Code2 className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">
            Errore 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Pagina Non Trovata
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            L&apos;indirizzo a cui stai tentando di accedere non esiste, è stato rimosso o rinominato.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild size="default" className="w-full sm:w-auto rounded-full font-medium">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Torna alla Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="default" className="w-full sm:w-auto rounded-full font-medium">
            <Link href="/#contatti" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Contattami
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
