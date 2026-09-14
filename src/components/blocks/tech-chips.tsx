import React from "react";
import { TECH_ITEMS } from "@/lib/tech-stack";

/**
 * Chip statici delle tecnologie per dispositivi mobile (< md).
 * È un Server Component puro: 0 KB di JavaScript client, 0 ms di idratazione.
 */
export function TechChips({ className = "" }: { readonly className?: string }) {
  return (
    <div className={`mt-8 w-full max-w-xl mx-auto md:hidden ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-2 px-2">
        {TECH_ITEMS.map((item) => (
          <div
            key={item.name}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/70 bg-card/90 text-xs font-medium text-foreground/85 shadow-2xs transition-colors hover:border-brand-accent/40 hover:text-brand-accent"
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
              {item.svg(`chip-${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`)}
            </div>
            <span className="whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
