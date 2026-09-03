"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Menu, Code2 } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

const MobileMenu = dynamic(
  () => import("./mobile-menu").then((mod) => mod.MobileMenu),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="ghost"
        className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </Button>
    ),
  }
);

interface NavbarProps {
  dict: Dictionary;
  locale: Locale;
}

export function Navbar({ dict, locale }: NavbarProps) {

  const homeHref = locale === "en" ? "/en" : "/";

  const navigations = [
    { title: dict.nav.home, href: homeHref },
    { title: dict.nav.skills, href: "#competenze" },
    { title: dict.nav.journey, href: "#percorso" },
    { title: dict.nav.projects, href: "#progetti" },
    { title: dict.nav.contact, href: "#contatti" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Left: Brand Logo & Name */}
        <div className="flex items-center gap-2 z-10">
          <Link href={homeHref} className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block">Gabriele Farigu</span>
          </Link>
        </div>

        {/* Center: Desktop Nav - Absolute center relative to the entire page */}
        <nav
          aria-label="Desktop Navigation"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center text-sm font-medium select-none pointer-events-auto"
        >
          <div className="flex items-center space-x-1">
            {navigations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-[94px] text-center py-1.5 transition-colors hover:text-primary text-muted-foreground whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right: Actions with fixed dimensions to guarantee zero layout shift */}
        <div className="hidden md:flex items-center justify-end space-x-3 z-10 w-[220px]">
          <LanguageSwitcher currentLocale={locale} />
          <Button
            asChild
            variant="default"
            className="rounded-full w-[120px] justify-center text-center font-medium"
          >
            <Link href="#contatti">{dict.nav.contactCta}</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          <MobileMenu
            navigations={navigations}
            contactCta={dict.nav.contactCta}
            toggleMenuLabel={dict.nav.toggleMenu}
          />
        </div>
      </div>
    </header>
  );
}
