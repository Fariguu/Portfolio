"use client";

import * as React from "react";
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

  // Calcolo deterministico della lingua corrente direttamente dal pathname della rotta attiva
  const derivedLocale: Locale =
    pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";

  // Stato visivo locale reattivo per far scorrere la pillola istantaneamente
  const [activeLocale, setActiveLocale] = React.useState<Locale>(
    derivedLocale || currentLocale
  );
  const [isPending, startTransition] = React.useTransition();
  const isSwitchingRef = React.useRef(false);
  const finishTimerRef = React.useRef<number | null>(null);
  const safetyTimerRef = React.useRef<number | null>(null);

  // Sincronizzazione automatica al cambio di rotta/pathname
  React.useEffect(() => {
    setActiveLocale(derivedLocale);

    if (typeof document !== "undefined") {
      if (document.documentElement.dataset.langState === "switching") {
        // La nuova rotta è montata: avvia la transizione d'ingresso morbida
        document.documentElement.dataset.langState = "entering";

        if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current);
        finishTimerRef.current = window.setTimeout(() => {
          if (typeof document !== "undefined") {
            delete document.documentElement.dataset.langState;
          }
          isSwitchingRef.current = false;
        }, 300);
      }
    }
  }, [pathname, derivedLocale]);

  // Pulizia dei timer e dei dataset allo smontaggio del componente
  React.useEffect(() => {
    return () => {
      if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current);
      if (safetyTimerRef.current) window.clearTimeout(safetyTimerRef.current);
      if (typeof document !== "undefined") {
        delete document.documentElement.dataset.langState;
      }
    };
  }, []);

  const handleToggle = () => {
    if (isSwitchingRef.current || isPending) return;

    // Determina la lingua target invertendo quella attualmente attiva
    const nextLocale: Locale = activeLocale === "it" ? "en" : "it";

    // 1. Scorrimento immediato della pillola grafica (feedback tattile a 0ms)
    setActiveLocale(nextLocale);
    isSwitchingRef.current = true;

    // 2. Aggiornamento sincrono immediato dei cookie e dell'attributo lang del documento
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    if (typeof document !== "undefined") {
      document.documentElement.lang = nextLocale;
    }

    // 3. Calcolo deterministico dell'URL target preservando query string e hash
    const cleanPath = pathname.replace(/^\/(it|en)(\/|$)/, "/") || "/";
    const targetPath =
      nextLocale === "en"
        ? cleanPath === "/"
          ? "/en"
          : `/en${cleanPath}`
        : cleanPath;

    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const finalUrl = `${targetPath}${search}${hash}`;

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Se l'utente ha impostato preferenze di movimento ridotto, naviga senza animazione
    if (isReducedMotion) {
      startTransition(() => {
        router.push(finalUrl);
        router.refresh();
      });
      isSwitchingRef.current = false;
      return;
    }

    // 4. Avvio transizione fluida (softening / cross-dissolve senza scatti o evidenziazioni)
    if (typeof document !== "undefined") {
      document.documentElement.dataset.langState = "switching";
    }

    // Breve pausa (120ms) per permettere al blur/opacità morbida di ammorbidire il testo
    window.setTimeout(() => {
      startTransition(() => {
        router.push(finalUrl);
        router.refresh();
      });
    }, 120);

    // Timer di sicurezza (1200ms) nel caso di lentezza o se il pathname non subisce variazioni
    if (safetyTimerRef.current) window.clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = window.setTimeout(() => {
      if (typeof document !== "undefined") {
        if (document.documentElement.dataset.langState === "switching") {
          document.documentElement.dataset.langState = "entering";
          window.setTimeout(() => {
            if (typeof document !== "undefined") {
              delete document.documentElement.dataset.langState;
            }
          }, 300);
        }
      }
      isSwitchingRef.current = false;
    }, 1200);
  };

  const ariaLabel =
    activeLocale === "it"
      ? "Lingua corrente Italiano. Clicca per passare all'Inglese"
      : "Current language English. Click to switch to Italian";

  const titleTooltip =
    activeLocale === "it"
      ? "Clicca per passare all'Inglese (EN)"
      : "Click to switch to Italian (IT)";

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={ariaLabel}
      title={titleTooltip}
      className={`group relative inline-flex items-center justify-between w-[86px] rounded-full border border-border/60 bg-muted/40 p-1 text-xs font-medium backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-muted/70 active:scale-95 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-80 disabled:cursor-wait ${className}`}
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
  );
}
