"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Menu, Code2 } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

const MobileMenu = dynamic(
  () => import("./mobile-menu").then((mod) => mod.MobileMenu),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 md:w-auto md:h-9 px-0 md:px-3.5 md:rounded-full md:border md:border-border/80 text-foreground"
        aria-label="Menu"
      >
        <Menu className="h-5 w-5 md:h-4 md:w-4" />
        <span className="hidden md:inline-block ml-1.5 text-xs font-medium">Menu</span>
      </Button>
    ),
  }
);

interface NavbarProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
}

export function Navbar({ dict, locale }: Readonly<NavbarProps>) {
  const homeHref = locale === "en" ? "/en" : "/";
  const prefix = locale === "en" ? "/en" : "";

  // Desktop drawer: all other options (Home is kept centered in the desktop navbar)
  const desktopNavigations = [
    { title: dict.nav.about, href: `${prefix}/chi-sono` },
    { title: dict.nav.skills, href: `${prefix}/competenze` },
    { title: dict.nav.projects, href: `${prefix}/progetti` },
    { title: dict.nav.contact, href: `${prefix}/contatti` },
  ];

  // Mobile drawer: all options including Home
  const mobileNavigations = [
    { title: dict.nav.home, href: homeHref },
    { title: dict.nav.about, href: `${prefix}/chi-sono` },
    { title: dict.nav.skills, href: `${prefix}/competenze` },
    { title: dict.nav.projects, href: `${prefix}/progetti` },
    { title: dict.nav.contact, href: `${prefix}/contatti` },
  ];

  // Dynamic show/hide on scroll:
  // When scrolling down, hide navbar; when scrolling up, reveal immediately!
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

      // Always visible near top of page (first 60px)
      if (currentScrollY <= 60) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // If scrolling UP: reveal immediately at any scroll position on the page!
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // If scrolling DOWN by more than 6px: hide
      else if (currentScrollY > lastScrollY + 6) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container relative flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
          {/* Left: Brand Logo & Name */}
          <div className="flex items-center gap-2 z-10">
            <Link href={homeHref} className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-brand-accent transition-colors" />
              <span className="font-bold inline-block">Gabriele Farigu</span>
            </Link>
          </div>

          {/* Center: Desktop Nav - Mantieni solo il pulsante Home al centro della barra */}
          <nav
            aria-label="Desktop Navigation"
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center text-sm font-medium select-none pointer-events-auto"
          >
            <Link
              href={homeHref}
              className="px-2.5 lg:px-3 text-center py-1.5 transition-colors hover:text-brand-accent text-muted-foreground whitespace-nowrap text-xs lg:text-sm"
            >
              {dict.nav.home}
            </Link>
          </nav>

          {/* Right: Actions & Side Menu Trigger */}
          <div className="flex items-center justify-end space-x-2 md:space-x-3 z-10">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />
            <MobileMenu
              desktopNavigations={desktopNavigations}
              mobileNavigations={mobileNavigations}
              contactCta={dict.nav.contactCta}
              contactHref={`${prefix}/contatti`}
              toggleMenuLabel={dict.nav.toggleMenu}
              locale={locale}
            />
          </div>
        </div>
      </header>

      {/* Spacer to prevent layout shift with fixed header */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />
    </>
  );
}
