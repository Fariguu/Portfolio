"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  readonly currentLocale: Locale;
  readonly className?: string;
}

export function LanguageSwitcher({
  currentLocale,
  className = "",
}: Readonly<LanguageSwitcherProps>) {
  const pathname = usePathname();
  const router = useRouter();

  // Stato ottimistico locale per far scorrere la pillola istantaneamente a 0ms
  const [activeLocale, setActiveLocale] = React.useState<Locale>(currentLocale);
  const [transitionStage, setTransitionStage] = React.useState<"idle" | "sweeping" | "revealing">("idle");
  const isTransitioningRef = React.useRef(false);
  const sweepTimerRef = React.useRef<number | null>(null);
  const revealTimerRef = React.useRef<number | null>(null);

  // Sincronizza se il server o la rotta cambiano
  React.useEffect(() => {
    setActiveLocale(currentLocale);
  }, [currentLocale]);

  // Pulizia dei timer allo smontaggio
  React.useEffect(() => {
    return () => {
      if (sweepTimerRef.current) window.clearTimeout(sweepTimerRef.current);
      if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current);
    };
  }, []);

  // Calcolo deterministico del percorso senza accedere a window durante il rendering
  const getTargetUrl = React.useCallback(
    (targetLocale: Locale) => {
      const cleanPath = pathname.replace(/^\/(it|en)(\/|$)/, "/") || "/";
      if (targetLocale === "en") {
        return cleanPath === "/" ? "/en" : `/en${cleanPath}`;
      }
      return cleanPath;
    },
    [pathname]
  );

  const nextLocale: Locale = currentLocale === "it" ? "en" : "it";
  const targetUrl = getTargetUrl(nextLocale);

  const handleToggle = () => {
    if (isTransitioningRef.current) return;

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fallback immediato se l'utente ha impostato preferenze di movimento ridotto
    if (isReducedMotion) {
      setActiveLocale(nextLocale);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== "undefined") {
        document.documentElement.lang = nextLocale;
      }
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const finalUrl = hash ? `${targetUrl}${hash}` : targetUrl;
      React.startTransition(() => {
        router.push(finalUrl);
      });
      return;
    }

    isTransitioningRef.current = true;

    // 1. Scorrimento immediato della pillola grafica IT/EN
    setActiveLocale(nextLocale);

    // 2. Avvio passaggio evidenziatore (sweeping da sinistra a destra)
    setTransitionStage("sweeping");

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const finalUrl = hash ? `${targetUrl}${hash}` : targetUrl;

    // 3. Quando l'evidenziatore ha completato il passaggio ed è completamente opacizzato (~360ms)
    sweepTimerRef.current = window.setTimeout(() => {
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== "undefined") {
        document.documentElement.lang = nextLocale;
      }

      // Applica la nuova rotta mentre la schermata è coperta dall'evidenziatore
      React.startTransition(() => {
        router.push(finalUrl);
      });

      // 4. L'evidenziazione scompare gradualmente rivelando il testo tradotto
      setTransitionStage("revealing");

      revealTimerRef.current = window.setTimeout(() => {
        setTransitionStage("idle");
        isTransitioningRef.current = false;
      }, 350);
    }, 360);
  };

  const ariaLabel =
    currentLocale === "it"
      ? "Lingua corrente Italiano. Clicca per passare all'Inglese"
      : "Current language English. Click to switch to Italian";

  const titleTooltip =
    currentLocale === "it"
      ? "Clicca per passare all'Inglese (EN)"
      : "Click to switch to Italian (IT)";

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => router.prefetch(targetUrl)}
        onTouchStart={() => router.prefetch(targetUrl)}
        aria-label={ariaLabel}
        title={titleTooltip}
        className={`group relative inline-flex items-center justify-between w-[86px] rounded-full border border-border/60 bg-muted/40 p-1 text-xs font-medium backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-muted/70 active:scale-95 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      >
        <div
          className="flex items-center pl-1 text-muted-foreground group-hover:text-primary transition-colors"
          aria-hidden="true"
        >
          <Globe className="h-3.5 w-3.5" />
        </div>

        <div className="relative flex items-center bg-background/60 rounded-full p-0.5 border border-border/40">
          {/* Indicatore a scorrimento animato fluido */}
          <div
            className={`absolute top-0.5 bottom-0.5 w-[26px] rounded-full bg-background shadow-xs border border-border/50 transition-transform duration-200 ease-out ${
              activeLocale === "en" ? "translate-x-[26px]" : "translate-x-0"
            }`}
          />

          <span
            className={`relative z-10 w-[26px] py-0.5 text-center text-[11px] font-semibold transition-colors duration-200 ${
              activeLocale === "it"
                ? "text-foreground font-bold"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            IT
          </span>

          <span
            className={`relative z-10 w-[26px] py-0.5 text-center text-[11px] font-semibold transition-colors duration-200 ${
              activeLocale === "en"
                ? "text-foreground font-bold"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            EN
          </span>
        </div>
      </button>

      {/* Overlay dinamico effetto evidenziatore: passa da sinistra a destra e poi si dissolve rivelando la traduzione */}
      {transitionStage !== "idle" &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden transition-opacity duration-350 ease-out"
            style={{
              opacity: transitionStage === "revealing" ? 0 : 1,
            }}
            aria-hidden="true"
          >
            {/* Il corpo dell'evidenziatore che scorre fisicamente su tutti i testi */}
            <div className="absolute inset-0 w-full h-full animate-highlighter-sweep">
              {/* Blocco coprente opaco dell'evidenziatore */}
              <div className="absolute inset-0 right-3 sm:right-6 bg-emerald-700/98 dark:bg-[#03261c]/98 backdrop-blur-xs">
                {/* Sfumatura e gradiente dell'inchiostro dell'evidenziatore */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-500 dark:from-[#011711] dark:via-[#033628] dark:to-[#044c38] opacity-95" />

                {/* Trame orizzontali stile evidenziatore su linee di testo */}
                <div
                  className="absolute inset-0 opacity-15 dark:opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 32px, rgba(255,255,255,0.25) 32px, rgba(255,255,255,0.25) 36px)",
                  }}
                />
              </div>

              {/* Punta a scalpello luminosa (Chisel Tip) con bagliore neon che guida il passaggio dell'evidenziatore */}
              <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-14 -mr-2 sm:-mr-3 -skew-x-6 origin-top border-r-2 sm:border-r-4 border-emerald-300 dark:border-[#88fc9d] bg-gradient-to-r from-transparent via-emerald-400/40 to-emerald-200/90 dark:via-emerald-500/50 dark:to-[#88fc9d]/90 shadow-[0_0_40px_rgba(16,185,129,0.85),0_0_15px_rgba(136,252,157,0.9)] opacity-95" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
