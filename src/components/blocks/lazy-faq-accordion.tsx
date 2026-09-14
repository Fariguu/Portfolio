"use client";

import * as React from "react";
import type { FaqItem } from "./faq-accordion";

interface LazyFaqAccordionProps {
  readonly items: ReadonlyArray<FaqItem>;
}

export function LazyFaqAccordion({ items }: LazyFaqAccordionProps) {
  const [AccordionComp, setAccordionComp] = React.useState<React.ComponentType<LazyFaqAccordionProps> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    if (!("IntersectionObserver" in window)) {
      import("./faq-accordion").then((mod) => setAccordionComp(() => mod.FaqAccordion));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          import("./faq-accordion").then((mod) => {
            setAccordionComp(() => mod.FaqAccordion);
          });
          observer.disconnect();
        }
      },
      { rootMargin: "450px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (AccordionComp) {
    return <AccordionComp items={items} />;
  }

  return (
    <div ref={containerRef} className="w-full space-y-2 divide-y divide-border/40">
      {items.map((item, idx) => (
        <div key={idx} className="py-4 flex items-center justify-between text-left">
          <span className="font-medium text-foreground text-sm sm:text-base pr-4">
            {item.question}
          </span>
          <span className="text-muted-foreground/60 text-lg shrink-0 font-light select-none">
            +
          </span>
        </div>
      ))}
    </div>
  );
}
