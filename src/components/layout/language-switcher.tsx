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
  const [isPending, startTransition] = React.useTransition();

  const handleSwitch = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) return;

    // Set persistence cookie (1 year duration)
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Compute target path
    let newPath = pathname;

    if (targetLocale === "en") {
      if (pathname === "/") {
        newPath = "/en";
      } else if (!pathname.startsWith("/en")) {
        newPath = `/en${pathname}`;
      }
    } else {
      // targetLocale === "it"
      if (pathname === "/en") {
        newPath = "/";
      } else if (pathname.startsWith("/en/")) {
        newPath = pathname.replace(/^\/en/, "");
      }
    }

    // Preserve hash if present
    const hash = window.location.hash;
    const finalUrl = hash ? `${newPath}${hash}` : newPath;

    startTransition(() => {
      router.push(finalUrl);
      router.refresh();
    });
  };

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-full border border-border/60 bg-muted/40 p-0.5 text-xs font-medium backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center pl-2 pr-1 text-muted-foreground" aria-hidden="true">
        <Globe className="h-3.5 w-3.5" />
      </div>
      <button
        type="button"
        onClick={() => handleSwitch("it")}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
          currentLocale === "it"
            ? "bg-background text-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={currentLocale === "it"}
        aria-label="Passa all'italiano"
      >
        IT
      </button>
      <span className="text-border text-[10px] select-none">|</span>
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
          currentLocale === "en"
            ? "bg-background text-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={currentLocale === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
