"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileCollapsibleSectionProps {
  readonly id: string;
  readonly title: string;
  readonly icon?: React.ReactNode;
  readonly defaultOpen?: boolean;
  readonly children: React.ReactNode;
}

export function MobileCollapsibleSection({
  id,
  title,
  icon,
  defaultOpen = false,
  children,
}: Readonly<MobileCollapsibleSectionProps>) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  // Se l'utente clicca un'ancora (es. dal menu rapido #progetti), apriamo automaticamente la sezione
  React.useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash === `#${id}`) {
        setIsOpen(true);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [id]);

  return (
    <div id={id} className="w-full scroll-mt-20">
      {/* Mobile Toggle Bar (< md) - Pulita, senza doppie scritte né icone ridondanti */}
      <div className="md:hidden border-y border-border/80 bg-card/60 backdrop-blur-xs">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/40 active:bg-muted/60 group"
          aria-expanded={isOpen}
          aria-controls={`collapsible-content-${id}`}
        >
          <div className="flex items-center gap-2.5">
            {icon && <span className="text-brand-accent shrink-0">{icon}</span>}
            <span className="font-bold text-base tracking-wide uppercase text-foreground transition-colors group-hover:text-primary">
              {title}
            </span>
          </div>

          <div
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 bg-muted/60 text-muted-foreground group-hover:text-foreground",
              isOpen && "rotate-180 text-foreground bg-muted"
            )}
          >
            <ChevronDown className="h-4 w-4 transition-transform" />
          </div>
        </button>
      </div>

      {/* Contenuto: collassabile su mobile (< md), SEMPRE visibile su desktop (>= md) */}
      <div
        id={`collapsible-content-${id}`}
        className={cn(
          "transition-all duration-300 ease-in-out",
          "md:block md:opacity-100 md:h-auto md:overflow-visible",
          isOpen
            ? "block opacity-100 animate-in fade-in duration-300"
            : "hidden opacity-0 overflow-hidden"
        )}
      >
        {children}
      </div>
    </div>
  );
}
