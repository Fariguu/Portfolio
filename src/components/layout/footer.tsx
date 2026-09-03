import { Code2, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  const privacyHref = locale === "en" ? "/en/privacy" : "/privacy";

  return (
    <footer className="w-full border-t border-border/40 bg-background py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-brand-accent" />
            <span className="text-xl font-bold tracking-tight">
              Gabriele Farigu
            </span>
          </div>

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

          <div className="flex flex-col md:items-end space-y-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gabriele Farigu. {dict.footer.creatorTagline}
            </p>
            <Link
              href={privacyHref}
              className="text-xs text-muted-foreground hover:text-brand-accent transition-colors underline-offset-4 hover:underline"
            >
              {dict.footer.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
