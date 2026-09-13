"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
        size="icon"
        className="h-10 w-10 text-foreground hover:bg-muted/80"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </Button>
    ),
  }
);

interface NavbarProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
}

export function Navbar({ dict, locale }: Readonly<NavbarProps>) {
  const pathname = usePathname();
  const isHomePage =
    !pathname || pathname === "/" || pathname === "/en" || pathname === "/it";

  const homeHref = locale === "en" ? "/en" : "/";
  const prefix = locale === "en" ? "/en" : "";

  const navigations = [
    { title: dict.nav.home, href: isHomePage ? "#chi-sono" : homeHref },
    {
      title: dict.nav.skills,
      href: isHomePage ? "#competenze" : `${prefix}/competenze`,
    },
    {
      title: dict.nav.journey,
      href: isHomePage ? "#percorso" : `${prefix}/percorso`,
    },
    {
      title: dict.nav.projects,
      href: isHomePage ? "#progetti" : `${prefix}/progetti`,
    },
    {
      title: dict.nav.contact,
      href: isHomePage ? "#contatti" : `${prefix}/contatti`,
    },
  ];

  const contactHref = isHomePage ? "#contatti" : `${prefix}/contatti`;

  // Dynamic show/hide on scroll:
  // When scrolling down, hide navbar; when scrolling up, reveal smoothly.
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY < 60) {
        // Always visible near top of page
        setIsVisible(true);
      } else if (diff > 8) {
        // Scrolling down -> hide
        setIsVisible(false);
      } else if (diff < -8) {
        // Scrolling up -> reveal dynamically
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out",
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

        {/* Center: Desktop Nav - Absolute center relative to the entire page */}
        <nav
          aria-label="Desktop Navigation"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center text-sm font-medium select-none pointer-events-auto"
        >
          <div className="flex items-center space-x-0.5">
            {navigations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2.5 lg:px-3 text-center py-1.5 transition-colors hover:text-brand-accent text-muted-foreground whitespace-nowrap text-xs lg:text-sm"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right: Actions with fixed dimensions to guarantee zero layout shift */}
        <div className="hidden md:flex items-center justify-end space-x-3 z-10 min-w-[240px]">
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} />
          <Button
            asChild
            variant="default"
            className="rounded-full w-[120px] justify-center text-center font-medium"
          >
            <Link href={contactHref}>{dict.nav.contactCta}</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} />
          <MobileMenu
            navigations={navigations}
            contactCta={dict.nav.contactCta}
            contactHref={contactHref}
            toggleMenuLabel={dict.nav.toggleMenu}
          />
        </div>
      </div>
    </header>
  );
}
