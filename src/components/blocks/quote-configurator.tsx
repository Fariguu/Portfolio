"use client";

import * as React from "react";
import Link from "next/link";
import {
  Code2,
  Globe,
  CalendarDays,
  Zap,
  ShieldCheck,
  Database,
  CreditCard,
  MapPin,
  Languages,
  SlidersHorizontal,
  Clock,
  FileCheck2,
  Coins,
  Send,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LazyTurnstile } from "@/components/blocks/lazy-turnstile";
import { submitQuoteRequestAction } from "@/app/actions/quote";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import type {
  ProjectType,
  FeatureOption,
  TimelineOption,
  MaterialOption,
  BudgetOption,
} from "@/lib/quote-schema";

interface QuoteConfiguratorProps {
  readonly dict: Dictionary;
  readonly locale: Locale;
  readonly turnstileSiteKey?: string;
}

export function QuoteConfigurator({
  dict,
  locale,
  turnstileSiteKey,
}: Readonly<QuoteConfiguratorProps>) {
  const [currentStep, setCurrentStep] = React.useState<number>(1);

  // Form State
  const [projectType, setProjectType] = React.useState<ProjectType>("web-app");
  const [features, setFeatures] = React.useState<FeatureOption[]>([
    "auth",
    "database",
  ]);
  const [timeline, setTimeline] = React.useState<TimelineOption>("standard");
  const [materials, setMaterials] = React.useState<MaterialOption>("in-progress");
  const [budget, setBudget] = React.useState<BudgetOption>("tier-2");

  // Step 4 fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");

  // Feedback State
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});
  const [isSuccess, setIsSuccess] = React.useState(false);

  const homeHref = locale === "en" ? "/en" : "/";

  // Toggle multi-select features
  const toggleFeature = (feat: FeatureOption) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  // Step navigation
  const handleNext = () => {
    setErrorMessage(null);
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    // Client-side quick validation
    if (!firstName.trim() || firstName.trim().length < 2) {
      setErrorMessage(
        locale === "en"
          ? "Please enter your first name (min 2 characters)"
          : "Inserisci il tuo nome (almeno 2 caratteri)"
      );
      return;
    }
    if (!lastName.trim() || lastName.trim().length < 2) {
      setErrorMessage(
        locale === "en"
          ? "Please enter your last name (min 2 characters)"
          : "Inserisci il tuo cognome (almeno 2 caratteri)"
      );
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage(
        locale === "en"
          ? "Please enter a valid email address"
          : "Inserisci un indirizzo email valido"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitQuoteRequestAction({
        projectType,
        features,
        timeline,
        materials,
        budget,
        firstName,
        lastName,
        email,
        phone,
        notes,
        turnstileToken,
        locale,
      });

      if (response.success) {
        setIsSuccess(true);
        setCurrentStep(5);
        window.scrollTo({ top: 100, behavior: "smooth" });
      } else {
        setErrorMessage(response.error || dict.quote.genericError);
        if (response.fieldErrors) {
          setFieldErrors(response.fieldErrors);
        }
      }
    } catch {
      setErrorMessage(dict.quote.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Project Types definition with Icons
  const projectTypesList: Array<{
    id: ProjectType;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }> = [
    {
      id: "web-app",
      icon: Code2,
      title: dict.quote.step1.types.webApp.title,
      description: dict.quote.step1.types.webApp.description,
    },
    {
      id: "showcase-site",
      icon: Globe,
      title: dict.quote.step1.types.showcaseSite.title,
      description: dict.quote.step1.types.showcaseSite.description,
    },
    {
      id: "booking-system",
      icon: CalendarDays,
      title: dict.quote.step1.types.bookingSystem.title,
      description: dict.quote.step1.types.bookingSystem.description,
    },
    {
      id: "restyling-speed",
      icon: Zap,
      title: dict.quote.step1.types.restylingSpeed.title,
      description: dict.quote.step1.types.restylingSpeed.description,
    },
  ];

  // Features definition with Icons
  const featuresList: Array<{
    id: FeatureOption;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }> = [
    {
      id: "auth",
      icon: ShieldCheck,
      title: dict.quote.step2.features.auth.title,
      description: dict.quote.step2.features.auth.description,
    },
    {
      id: "database",
      icon: Database,
      title: dict.quote.step2.features.database.title,
      description: dict.quote.step2.features.database.description,
    },
    {
      id: "payments",
      icon: CreditCard,
      title: dict.quote.step2.features.payments.title,
      description: dict.quote.step2.features.payments.description,
    },
    {
      id: "maps",
      icon: MapPin,
      title: dict.quote.step2.features.maps.title,
      description: dict.quote.step2.features.maps.description,
    },
    {
      id: "multilang",
      icon: Languages,
      title: dict.quote.step2.features.multilang.title,
      description: dict.quote.step2.features.multilang.description,
    },
    {
      id: "cms",
      icon: SlidersHorizontal,
      title: dict.quote.step2.features.cms.title,
      description: dict.quote.step2.features.cms.description,
    },
  ];

  // Step 3 options
  const timelineList: Array<{
    id: TimelineOption;
    title: string;
    description: string;
  }> = [
    {
      id: "urgent",
      title: dict.quote.step3.timelineOptions.urgent.title,
      description: dict.quote.step3.timelineOptions.urgent.description,
    },
    {
      id: "standard",
      title: dict.quote.step3.timelineOptions.standard.title,
      description: dict.quote.step3.timelineOptions.standard.description,
    },
    {
      id: "flexible",
      title: dict.quote.step3.timelineOptions.flexible.title,
      description: dict.quote.step3.timelineOptions.flexible.description,
    },
  ];

  const materialsList: Array<{
    id: MaterialOption;
    title: string;
    description: string;
  }> = [
    {
      id: "ready",
      title: dict.quote.step3.materialsOptions.ready.title,
      description: dict.quote.step3.materialsOptions.ready.description,
    },
    {
      id: "in-progress",
      title: dict.quote.step3.materialsOptions.inProgress.title,
      description: dict.quote.step3.materialsOptions.inProgress.description,
    },
    {
      id: "none",
      title: dict.quote.step3.materialsOptions.none.title,
      description: dict.quote.step3.materialsOptions.none.description,
    },
  ];

  const budgetList: Array<{
    id: BudgetOption;
    title: string;
    description: string;
  }> = [
    {
      id: "tier-1",
      title: dict.quote.step3.budgetOptions.tier1.title,
      description: dict.quote.step3.budgetOptions.tier1.description,
    },
    {
      id: "tier-2",
      title: dict.quote.step3.budgetOptions.tier2.title,
      description: dict.quote.step3.budgetOptions.tier2.description,
    },
    {
      id: "tier-3",
      title: dict.quote.step3.budgetOptions.tier3.title,
      description: dict.quote.step3.budgetOptions.tier3.description,
    },
    {
      id: "tier-4",
      title: dict.quote.step3.budgetOptions.tier4.title,
      description: dict.quote.step3.budgetOptions.tier4.description,
    },
    {
      id: "undecided",
      title: dict.quote.step3.budgetOptions.undecided.title,
      description: dict.quote.step3.budgetOptions.undecided.description,
    },
  ];

  // Success screen
  if (isSuccess && currentStep === 5) {
    const selectedProj = projectTypesList.find((p) => p.id === projectType);

    return (
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 animate-fade-in text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-brand-accent flex items-center justify-center mb-6 shadow-xs">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
          {dict.quote.success.title}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
          {dict.quote.success.message}
        </p>

        <Card className="p-5 sm:p-6 text-left bg-muted/30 border-border/70 mb-8 max-w-lg mx-auto shadow-2xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {dict.quote.success.recapTitle}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Soluzione:</span>
              <span className="font-medium text-foreground">{selectedProj?.title}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Funzionalità:</span>
              <span className="font-medium text-foreground">{features.length} selezionate</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Budget:</span>
              <span className="font-medium text-foreground">
                {budgetList.find((b) => b.id === budget)?.title}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium text-foreground">{email}</span>
            </div>
          </div>
        </Card>

        <Button asChild size="lg" className="rounded-full h-12 px-8 font-medium">
          <Link href={homeHref}>
            <span>{dict.quote.success.backHome}</span>
          </Link>
        </Button>
      </div>
    );
  }

  const progressPercent = (currentStep / 4) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto" data-nosnippet>
      {/* Sticky Progress Indicator on Mobile */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur py-3 mb-6 border-b border-border/40 px-2 sm:px-4">
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-muted-foreground mb-2">
          <span>
            {dict.quote.stepIndicator
              .replace("{current}", String(currentStep))
              .replace("{total}", "4")}
          </span>
          <span className="text-brand-accent font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Error notification */}
      {errorMessage && (
        <div className="p-3.5 mb-6 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2.5 animate-fade-in">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ================= STEP 1: TIPOLOGIA SOLUZIONE ================= */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {dict.quote.step1.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {dict.quote.step1.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {projectTypesList.map((item) => {
              const Icon = item.icon;
              const isSelected = projectType === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setProjectType(item.id)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between active:scale-[0.99] min-h-[140px] ${
                    isSelected
                      ? "border-brand-accent bg-brand-accent/5 dark:bg-emerald-500/10 ring-2 ring-brand-accent shadow-xs"
                      : "border-border/70 bg-card/60 hover:border-brand-accent/40 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? "bg-brand-accent text-white dark:text-zinc-900"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-brand-accent bg-brand-accent text-white dark:text-zinc-900"
                          : "border-border/70"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 2: FUNZIONALITÀ CHIAVE ================= */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {dict.quote.step2.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {dict.quote.step2.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {featuresList.map((item) => {
              const Icon = item.icon;
              const isSelected = features.includes(item.id);

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleFeature(item.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 active:scale-[0.99] ${
                    isSelected
                      ? "border-brand-accent bg-brand-accent/5 dark:bg-emerald-500/10 ring-1 ring-brand-accent shadow-xs"
                      : "border-border/70 bg-card/60 hover:border-brand-accent/40 hover:bg-muted/40"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-brand-accent text-white dark:text-zinc-900"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-foreground truncate pr-2">
                        {item.title}
                      </h3>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-brand-accent bg-brand-accent text-white dark:text-zinc-900"
                            : "border-border/70"
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 3: TEMPISTICHE, MATERIALI & BUDGET ================= */}
      {currentStep === 3 && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {dict.quote.step3.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {dict.quote.step3.subtitle}
            </p>
          </div>

          {/* 3A: Tempistiche */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-accent" />
              <span>{dict.quote.step3.timelineLabel}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {timelineList.map((item) => {
                const isSelected = timeline === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setTimeline(item.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-brand-accent bg-brand-accent/5 dark:bg-emerald-500/10 ring-1 ring-brand-accent"
                        : "border-border/70 bg-card/60 hover:border-brand-accent/40"
                    }`}
                  >
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3B: Materiali */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-brand-accent" />
              <span>{dict.quote.step3.materialsLabel}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {materialsList.map((item) => {
                const isSelected = materials === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setMaterials(item.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-brand-accent bg-brand-accent/5 dark:bg-emerald-500/10 ring-1 ring-brand-accent"
                        : "border-border/70 bg-card/60 hover:border-brand-accent/40"
                    }`}
                  >
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3C: Budget Indicativo */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Coins className="w-4 h-4 text-brand-accent" />
              <span>{dict.quote.step3.budgetLabel}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {budgetList.map((item) => {
                const isSelected = budget === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setBudget(item.id)}
                    className={`text-center py-3 px-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center min-h-[48px] active:scale-[0.98] ${
                      isSelected
                        ? "border-brand-accent bg-brand-accent/10 dark:bg-emerald-500/20 ring-1 ring-brand-accent text-brand-accent font-semibold shadow-2xs"
                        : "border-border/70 bg-card/60 hover:border-brand-accent/40 text-foreground font-medium hover:bg-muted/40"
                    }`}
                  >
                    <span className="text-sm font-semibold truncate">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 4: CONTATTO & INVIO ================= */}
      {currentStep === 4 && (
        <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {dict.quote.step4.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {dict.quote.step4.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="quote-fn" className="text-sm font-medium text-foreground">
                {dict.quote.step4.firstNameLabel} <span className="text-destructive">*</span>
              </label>
              <input
                id="quote-fn"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isSubmitting}
                placeholder={dict.quote.step4.firstNamePlaceholder}
                className="flex h-11 sm:h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                required
              />
              {fieldErrors.firstName && (
                <p className="text-xs text-destructive">{fieldErrors.firstName[0]}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="quote-ln" className="text-sm font-medium text-foreground">
                {dict.quote.step4.lastNameLabel} <span className="text-destructive">*</span>
              </label>
              <input
                id="quote-ln"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isSubmitting}
                placeholder={dict.quote.step4.lastNamePlaceholder}
                className="flex h-11 sm:h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                required
              />
              {fieldErrors.lastName && (
                <p className="text-xs text-destructive">{fieldErrors.lastName[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="quote-email" className="text-sm font-medium text-foreground">
                {dict.quote.step4.emailLabel} <span className="text-destructive">*</span>
              </label>
              <input
                id="quote-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                placeholder={dict.quote.step4.emailPlaceholder}
                className="flex h-11 sm:h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                required
              />
              {fieldErrors.email && (
                <p className="text-xs text-destructive">{fieldErrors.email[0]}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="quote-phone" className="text-sm font-medium text-foreground">
                {dict.quote.step4.phoneLabel}
              </label>
              <input
                id="quote-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
                placeholder={dict.quote.step4.phonePlaceholder}
                className="flex h-11 sm:h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="quote-notes" className="text-sm font-medium text-foreground">
              {dict.quote.step4.notesLabel}
            </label>
            <textarea
              id="quote-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
              placeholder={dict.quote.step4.notesPlaceholder}
              className="flex min-h-[90px] w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 resize-y"
            />
          </div>

          {turnstileSiteKey && (
            <LazyTurnstile
              siteKey={turnstileSiteKey}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setErrorMessage(dict.quote.turnstileError)}
              onExpire={() => setTurnstileToken("")}
            />
          )}

          <p className="text-[11px] text-muted-foreground leading-tight pt-1">
            {dict.quote.step4.privacyNotice}
          </p>

          {/* Sticky Bottom Actions on Mobile / In-flow on Desktop */}
          <div className="sticky bottom-0 z-20 bg-background/95 backdrop-blur pt-3 pb-4 sm:pt-4 sm:pb-0 sm:relative sm:bg-transparent border-t border-border/40 sm:border-0 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isSubmitting}
              className="rounded-full h-12 px-6 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>{dict.quote.backButton}</span>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-full h-12 font-medium shadow-md shadow-brand-accent/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>{dict.quote.submitting}</span>
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  <span>{dict.quote.submitButton}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Navigation Bar for Steps 1, 2, 3 */}
      {currentStep < 4 && (
        <div className="sticky bottom-0 z-20 bg-background/95 backdrop-blur pt-3 pb-4 sm:pt-6 sm:pb-0 sm:relative sm:bg-transparent border-t border-border/40 sm:border-0 flex items-center justify-between gap-3 mt-8">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="rounded-full h-12 px-6 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>{dict.quote.backButton}</span>
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="button"
            onClick={handleNext}
            className="flex-1 sm:flex-initial rounded-full h-12 px-8 font-medium sm:min-w-[180px]"
          >
            <span>{dict.quote.nextButton}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
