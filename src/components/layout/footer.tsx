import { Code2, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

interface FooterProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
}

export function Footer({ dict, locale }: Readonly<FooterProps>) {
  const prefix = locale === "en" ? "/en" : "";
  const privacyHref = locale === "en" ? "/en/privacy" : "/privacy";

  const footerLinks = [
    { title: dict.nav.about, href: `${prefix}/chi-sono` },
    { title: dict.nav.skills, href: `${prefix}/competenze` },
    { title: dict.nav.projects, href: `${prefix}/progetti` },
    { title: dict.nav.journey, href: `${prefix}/percorso` },
    { title: dict.nav.quote, href: `${prefix}/preventivo` },
    { title: dict.nav.contact, href: `${prefix}/contatti` },
    { title: dict.footer.privacyPolicy, href: privacyHref },
  ];

  return (
    <footer className="w-full border-t border-border/40 bg-background py-10">
      <div className="container px-4 md:px-6 mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-brand-accent" />
            <span className="text-xl font-bold tracking-tight">
              Gabriele Farigu
            </span>
          </div>

          {/* Crawlable Internal Links for Googlebot & Users */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted-foreground"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-brand-accent transition-colors underline-offset-4 hover:underline"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center space-x-4">
            <Link
              href="https://github.com/Fariguu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-accent transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/gabriele-farigu-3863b1312/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-accent transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:farigugabriele@gmail.com"
              className="text-muted-foreground hover:text-brand-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Gabriele Farigu. {dict.footer.creatorTagline}
          </p>
          <p className="text-[11px] text-muted-foreground/70">
            {locale === "en"
              ? "All rights reserved. Designed & built with Next.js."
              : "Tutti i diritti riservati. Progettato e sviluppato con Next.js."}
          </p>
        </div>
      </div>
    </footer>
  );
}
