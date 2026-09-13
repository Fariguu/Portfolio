"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileMenuProps {
  readonly navigations: ReadonlyArray<{ readonly title: string; readonly href: string }>;
  readonly contactCta: string;
  readonly contactHref?: string;
  readonly toggleMenuLabel: string;
}

export function MobileMenu({
  navigations,
  contactCta,
  contactHref = "#contatti",
  toggleMenuLabel,
}: Readonly<MobileMenuProps>) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-foreground hover:bg-muted/80 focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">{toggleMenuLabel}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[340px] pr-0">
        <div className="flex flex-col gap-1 pt-10 px-4 text-base font-medium">
          {navigations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="py-3 px-2.5 rounded-lg transition-colors hover:bg-muted hover:text-brand-accent active:bg-muted/80 text-foreground/90"
            >
              {item.title}
            </Link>
          ))}
          <Button
            className="mt-6 w-full h-11 rounded-full font-medium shadow-xs"
            asChild
            onClick={() => setIsOpen(false)}
          >
            <Link href={contactHref}>{contactCta}</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
