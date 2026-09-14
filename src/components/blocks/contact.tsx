import * as React from "react";
import dynamic from "next/dynamic";
import { Mail, MapPin, Phone, Coins } from "lucide-react";
import { Linkedin } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

const ContactForm = dynamic(
  () => import("./contact-form").then((mod) => mod.ContactForm)
);

interface ContactProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
}

export function Contact({ dict, locale }: Readonly<ContactProps>) {
  return (
    <section id="contatti" className="w-full py-24 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Intestazione Sezione Contatti centrata: Server Component puro */}
        <div className="mx-auto max-w-2xl text-center space-y-4 mb-14">
          <p className="text-base font-semibold leading-7 text-primary dark:text-[#88fc9d]">
            {dict.contact.badge}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {dict.contact.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {dict.contact.description}
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr] items-stretch">
          {/* 1. Recapiti Contatto (1° su mobile; Colonna 1, Riga 1 su desktop): HTML statico a 0ms di idratazione */}
          <div className="order-1 lg:order-none space-y-4 lg:col-start-1 lg:row-start-1">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 dark:bg-brand-accent/15 shrink-0">
                <Mail className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {dict.contact.emailLabel}
                </h3>
                <a
                  href="mailto:farigugabriele@gmail.com"
                  className="text-muted-foreground hover:text-brand-accent transition-colors"
                >
                  farigugabriele@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 dark:bg-brand-accent/15 shrink-0">
                <Phone className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {dict.contact.phoneLabel}
                </h3>
                <a
                  href="tel:+393701157596"
                  className="text-muted-foreground hover:text-brand-accent transition-colors"
                >
                  +39 370 115 7596
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 dark:bg-brand-accent/15 shrink-0">
                <Linkedin className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/gabriele-farigu-3863b1312/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-brand-accent transition-colors"
                >
                  linkedin.com/in/gabriele-farigu
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 dark:bg-brand-accent/15 shrink-0">
                <MapPin className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {dict.contact.locationLabel}
                </h3>
                <p className="text-muted-foreground">
                  {dict.contact.locationValue}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Card del Form di Contatto (Client Component isolato caricato asincronamente) */}
          <ContactForm dict={dict} locale={locale} />

          {/* 3. Card promozionale per il Preventivo (3° su mobile; Colonna 1, Riga 2 su desktop): HTML statico puro */}
          <Card className="order-3 lg:order-none border-border/50 shadow-xs bg-background p-6 space-y-4 lg:col-start-1 lg:row-start-2 lg:self-end">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground shrink-0">
                <Coins className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug">
                {dict.quote.ctaBanner.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {dict.quote.ctaBanner.description}
            </p>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full sm:w-auto rounded-full font-medium h-10 px-5 border-border/80 hover:border-foreground/40 transition-colors"
            >
              <Link href={locale === "en" ? "/en/preventivo" : "/preventivo"} prefetch={false}>
                <Coins className="mr-2 h-4 w-4" />
                <span>{dict.quote.ctaBanner.button}</span>
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
