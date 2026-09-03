"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileMenuProps {
  navigations: Array<{ title: string; href: string }>;
  contactCta: string;
  toggleMenuLabel: string;
}

export function MobileMenu({ navigations, contactCta, toggleMenuLabel }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">{toggleMenuLabel}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] pr-0">
        <div className="flex flex-col gap-6 pt-8 px-4 text-lg font-medium">
          {navigations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <Button
            className="mt-4 w-full rounded-full"
            asChild
            onClick={() => setIsOpen(false)}
          >
            <Link href="#contatti">{contactCta}</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
