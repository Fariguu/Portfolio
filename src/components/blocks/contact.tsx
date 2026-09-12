"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Loader2,
  AlertCircle,
  Send,
  Coins,
} from "lucide-react";
import { Linkedin } from "@/components/ui/icons";
import { sendContactEmail } from "@/app/actions/contact";
import { LazyTurnstile } from "./lazy-turnstile";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

interface ContactProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
}

export function Contact({ dict, locale }: Readonly<ContactProps>) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

  const privacyHref = locale === "en" ? "/en/privacy" : "/privacy";

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await sendContactEmail({
        firstName,
        lastName,
        email,
        message,
        turnstileToken,
        locale,
      });

      if (!result.success) {
        setErrorMessage(result.error || dict.contact.genericError);
        setIsSubmitting(false);
        return;
      }

      setSubmittedEmail(email);
      setIsSubmitted(true);
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : dict.contact.genericError;
      setErrorMessage(errMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    setTurnstileToken("");
    setErrorMessage(null);
  };

  return (
    <section id="contatti" className="w-full py-24 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Intestazione Sezione Contatti centrata */}
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
          {/* 1. Recapiti Contatto (1° su mobile; Colonna 1, Riga 1 su desktop) */}
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

          {/* 2. Card del Form di Contatto (2° su mobile prima della card preventivo; Colonna 2, Riga 1-2 su desktop) */}
          <Card className="order-2 lg:order-none border-border/50 shadow-xs bg-background h-full flex flex-col justify-between lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <CardHeader>
              <CardTitle>{dict.contact.cardTitle}</CardTitle>
              <CardDescription>
                {dict.contact.cardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="p-8 rounded-xl bg-brand-accent/5 border border-brand-accent/20 text-center space-y-4 animate-fade-in">
                  <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-brand-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-brand-accent" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground text-xl">
                      {dict.contact.successTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      {dict.contact.successMessage}{" "}
                      <strong>{submittedEmail}</strong>.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="rounded-full hover:text-brand-accent hover:border-brand-accent/40"
                    >
                      {dict.contact.sendAnother}
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2 animate-fade-in">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium leading-none text-foreground"
                      >
                        {dict.contact.fieldFirstName}
                      </label>
                      <input
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isSubmitting}
                        className="flex h-11 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        placeholder={dict.contact.fieldFirstNamePlaceholder}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium leading-none text-foreground"
                      >
                        {dict.contact.fieldLastName}
                      </label>
                      <input
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isSubmitting}
                        className="flex h-11 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        placeholder={dict.contact.fieldLastNamePlaceholder}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none text-foreground"
                    >
                      {dict.contact.fieldEmail}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="flex h-11 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                      placeholder={dict.contact.fieldEmailPlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none text-foreground"
                    >
                      {dict.contact.fieldMessage}
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                      rows={4}
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                      placeholder={dict.contact.fieldMessagePlaceholder}
                      required
                    />
                  </div>

                  {/* Cloudflare Turnstile anti-bot widget */}
                  {turnstileSiteKey && (
                    <LazyTurnstile
                      siteKey={turnstileSiteKey}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setErrorMessage(dict.contact.turnstileError)}
                      onExpire={() => setTurnstileToken("")}
                    />
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {dict.contact.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {dict.contact.submit}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center pt-1">
                    {dict.contact.privacyConsentPrefix}{" "}
                    <Link
                      href={privacyHref}
                      className="underline hover:text-brand-accent transition-colors"
                    >
                      {dict.contact.privacyConsentLinkText}
                    </Link>
                    .
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* 3. Card promozionale per il Preventivo (3° su mobile, sotto al form di contatto; Colonna 1, Riga 2 su desktop allineata in basso a filo) */}
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
              <Link href={locale === "en" ? "/en/preventivo" : "/preventivo"}>
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
