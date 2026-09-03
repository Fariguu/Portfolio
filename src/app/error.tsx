"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: Readonly<ErrorProps>) {
  useEffect(() => {
    // Logga l'errore lato client per monitoraggio
    console.error("Errore runtime intercettato da error.tsx:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 py-16 text-center relative overflow-hidden">
      <div className="max-w-md w-full space-y-6 p-8 border border-border/60 rounded-3xl bg-card shadow-lg relative z-10 animate-fade-in">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
            <AlertTriangle className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Qualcosa è andato storto
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Si è verificato un errore imprevisto durante l&apos;esecuzione dell&apos;applicazione. Puoi provare a ricaricare o tornare alla schermata principale.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            size="default"
            className="w-full sm:w-auto rounded-full font-medium flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Riprova
          </Button>
          <Button
            asChild
            variant="outline"
            size="default"
            className="w-full sm:w-auto rounded-full font-medium"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Torna alla Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
