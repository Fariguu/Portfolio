import React from "react";
import { TECH_ITEMS } from "@/lib/tech-stack";

/**
 * Chip statici delle tecnologie per dispositivi mobile (< md).
 * È un Server Component puro: 0 KB di JavaScript client, 0 ms di idratazione.
 */
export function TechChips({ className = "" }: { readonly className?: string }) {
  return (
    <div className={`mt-3 sm:mt-5 w-full max-w-full md:hidden ${className}`}>
      {/* Nastro orizzontale a riga singola: compatto, ordinato e distanziato dalla dock */}
      <div className="relative w-full">
        <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden items-center justify-start sm:justify-center gap-2 px-4 py-1">
          {TECH_ITEMS.map((item) => (
            <div
              key={item.name}
              className="inline-flex shrink-0 snap-center items-center gap-1.5 px-3 py-1 rounded-full border border-border/70 bg-card/90 text-xs font-medium text-foreground/85 shadow-2xs transition-colors active:scale-95"
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                {item.svg(`chip-${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`)}
              </div>
              <span className="whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
