"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ArrowRight, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  readonly title: string;
  readonly href: string;
}

interface SideMenuProps {
  readonly desktopNavigations?: ReadonlyArray<NavItem>;
  readonly mobileNavigations?: ReadonlyArray<NavItem>;
  readonly navigations?: ReadonlyArray<NavItem>;
  readonly contactCta: string;
  readonly contactHref?: string;
  readonly toggleMenuLabel: string;
  readonly locale?: string;
}

export function MobileMenu({
  desktopNavigations,
  mobileNavigations,
  navigations,
  contactCta,
  contactHref = "/contatti",
  toggleMenuLabel,
  locale = "it",
}: Readonly<SideMenuProps>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  // Desktop links: use desktopNavigations if provided, otherwise fallback
  const dNavs = desktopNavigations ?? navigations ?? [];
  // Mobile links: use mobileNavigations if provided (includes Home), otherwise fallback
  const mNavs = mobileNavigations ?? navigations ?? [];

  const handleNavigate = () => {
    setIsOpen(false);
  };

  const isItemActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/" || href === "/en") {
      return pathname === "/" || pathname === "/en" || pathname === "/it";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 md:w-auto md:h-9 px-0 md:px-3.5 md:rounded-full md:border md:border-border/80 md:bg-background/80 hover:border-brand-accent/50 hover:bg-muted/60 transition-all text-foreground cursor-pointer"
          aria-label={toggleMenuLabel}
        >
          <Menu className="h-5 w-5 md:h-4 md:w-4 text-foreground md:text-brand-accent" />
          <span className="hidden md:inline-block ml-1.5 text-xs font-medium">Menu</span>
          <span className="sr-only md:hidden">{toggleMenuLabel}</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] sm:w-[360px] p-6 flex flex-col justify-between"
      >
        <div className="flex flex-col gap-6">
          <SheetHeader className="p-0 text-left">
            <SheetTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {locale === "en" ? "Navigation" : "Navigazione"}
            </SheetTitle>
          </SheetHeader>

          {/* Desktop view items: excludes Home since it is centered in the desktop bar */}
          <nav
            aria-label="Desktop drawer navigation"
            className="hidden md:flex flex-col gap-1.5"
          >
            {dNavs.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigate}
                  className={cn(
                    "flex items-center justify-between py-2.5 px-3.5 rounded-xl text-base font-medium transition-colors group",
                    active
                      ? "bg-brand-accent/10 text-brand-accent font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <span>{item.title}</span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-200 text-brand-accent",
                      active
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile view items: includes Home as requested */}
          <nav
            aria-label="Mobile drawer navigation"
            className="flex md:hidden flex-col gap-1.5"
          >
            {mNavs.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigate}
                  className={cn(
                    "flex items-center justify-between py-2.5 px-3.5 rounded-xl text-base font-medium transition-colors group",
                    active
                      ? "bg-brand-accent/10 text-brand-accent font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <span>{item.title}</span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-200 text-brand-accent",
                      active
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="flex flex-col gap-4 pt-6 border-t border-border/40">
          <Button
            className="w-full h-11 rounded-full font-medium shadow-xs"
            asChild
          >
            <Link href={contactHref} onClick={handleNavigate}>
              {contactCta}
            </Link>
          </Button>

          <div className="flex items-center justify-between px-2 pt-1 text-xs text-muted-foreground">
            <a
              href="mailto:farigugabriele@gmail.com"
              className="flex items-center gap-1.5 hover:text-brand-accent transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
            <a
              href="https://github.com/Fariguu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-accent transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export const SideMenu = MobileMenu;
