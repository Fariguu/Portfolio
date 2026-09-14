"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

interface LazyContactFormProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
}

export function LazyContactForm({ dict, locale }: LazyContactFormProps) {
  const [FormComp, setFormComp] = React.useState<React.ComponentType<LazyContactFormProps> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Se IntersectionObserver non è supportato, carica immediatamente
    if (!("IntersectionObserver" in window)) {
      import("./contact-form").then((mod) => setFormComp(() => mod.ContactForm));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          import("./contact-form").then((mod) => {
            setFormComp(() => mod.ContactForm);
          });
          observer.disconnect();
        }
      },
      { rootMargin: "450px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (FormComp) {
    return <FormComp dict={dict} locale={locale} />;
  }

  return (
    <div ref={containerRef} className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 h-full">
      <Card className="border-border/50 shadow-xs bg-background h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>{dict.contact.cardTitle}</CardTitle>
          <CardDescription>{dict.contact.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-muted/70 rounded" />
                <div className="h-11 sm:h-10 rounded-md border border-input bg-background/50" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-muted/70 rounded" />
                <div className="h-11 sm:h-10 rounded-md border border-input bg-background/50" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-muted/70 rounded" />
              <div className="h-11 sm:h-10 rounded-md border border-input bg-background/50" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted/70 rounded" />
              <div className="h-[120px] rounded-md border border-input bg-background/50" />
            </div>
            <div className="h-11 rounded-md bg-primary/20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
