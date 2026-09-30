"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileCollapsibleSectionProps {
  readonly id: string;
  readonly title: string;
  readonly badge?: string;
  readonly icon?: React.ReactNode;
  readonly defaultOpen?: boolean;
  readonly children: React.ReactNode;
}

export function MobileCollapsibleSection({
  id,
  title,
  badge,
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
      {/* Mobile Toggle Bar (< md) - Basata sullo sketch */}
      <div className="md:hidden border-y border-border/80 bg-muted/20 backdrop-blur-xs">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/40 active:bg-muted/60 group"
          aria-expanded={isOpen}
          aria-controls={`collapsible-content-${id}`}
        >
          <div className="flex items-center gap-3">
            {icon && (
              <span className="text-brand-accent transition-transform group-hover:scale-110">
                {icon}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-wide uppercase text-foreground group-hover:text-brand-accent transition-colors">
                {title}
              </span>
              {badge && (
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent">
                  {badge}
                </span>
              )}
            </div>
          </div>

          <div
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
              isOpen
                ? "bg-brand-accent/15 text-brand-accent rotate-180"
                : "bg-muted text-muted-foreground group-hover:text-foreground"
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
