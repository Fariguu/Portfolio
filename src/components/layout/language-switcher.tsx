"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSwitcher({
  currentLocale,
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Stato ottimistico locale per far scorrere la pillola istantaneamente a 0ms
  const [activeLocale, setActiveLocale] = React.useState<Locale>(currentLocale);

  // Sincronizza se il server o la rotta cambiano
  React.useEffect(() => {
    setActiveLocale(currentLocale);
  }, [currentLocale]);

  // Calcolo del percorso di destinazione
  const getTargetUrl = React.useCallback(
    (targetLocale: Locale) => {
      let newPath = pathname;

      if (targetLocale === "en") {
        if (pathname === "/") {
          newPath = "/en";
        } else if (!pathname.startsWith("/en")) {
          newPath = `/en${pathname}`;
        }
      } else {
        if (pathname === "/en") {
          newPath = "/";
        } else if (pathname.startsWith("/en/")) {
          newPath = pathname.replace(/^\/en/, "") || "/";
        }
      }

      const hash = typeof window !== "undefined" ? window.location.hash : "";
      return hash ? `${newPath}${hash}` : newPath;
    },
    [pathname]
  );

  const nextLocale: Locale = currentLocale === "it" ? "en" : "it";
  const targetUrl = getTargetUrl(nextLocale);

  // Prefetch automatico delle rotte per eliminare la latenza di rete
  React.useEffect(() => {
    router.prefetch(targetUrl);
    if (currentLocale === "it") {
      router.prefetch("/en");
      router.prefetch("/en/privacy");
    } else {
      router.prefetch("/");
      router.prefetch("/privacy");
    }
  }, [router, targetUrl, currentLocale]);

  const handleToggle = () => {
    // 1. Aggiornamento ottimistico dell'indicatore visivo
    setActiveLocale(nextLocale);

    // 2. Persistenza preferenza cookie
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // 3. Esecuzione con View Transitions API se supportata dal browser
    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      typeof (document as unknown as { startViewTransition: unknown }).startViewTransition === "function"
    ) {
      (document as unknown as { startViewTransition: (cb: () => Promise<void> | void) => void }).startViewTransition(() => {
        return new Promise<void>((resolve) => {
          React.startTransition(() => {
            router.push(targetUrl);
            setTimeout(resolve, 0);
          });
        });
      });
    } else {
      // Fallback per browser senza View Transitions (Safari/Firefox precedenti)
      React.startTransition(() => {
        router.push(targetUrl);
      });
    }
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
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => router.prefetch(targetUrl)}
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
  );
}
