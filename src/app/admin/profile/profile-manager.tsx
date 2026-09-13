"use client";

import { useState, useTransition } from "react";
import type { Profile } from "@/lib/database.types";
import { updateProfile } from "@/app/admin/actions/profile";
import { Button } from "@/components/ui/button";
import {
  User,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  Languages,
} from "lucide-react";
import Link from "next/link";

interface ProfileManagerProps {
  readonly initialProfile: Profile | null;
  readonly defaultHeadlineIt: string;
  readonly defaultHeadlineEn: string;
  readonly defaultBioIt: string;
  readonly defaultBioEn: string;
}

export function ProfileManager({
  initialProfile,
  defaultHeadlineIt,
  defaultHeadlineEn,
  defaultBioIt,
  defaultBioEn,
}: Readonly<ProfileManagerProps>) {
  const [headlineIt, setHeadlineIt] = useState(
    initialProfile?.headline_it || defaultHeadlineIt
  );
  const [headlineEn, setHeadlineEn] = useState(
    initialProfile?.headline_en || defaultHeadlineEn
  );
  const [bioIt, setBioIt] = useState(
    initialProfile?.bio_it || defaultBioIt
  );
  const [bioEn, setBioEn] = useState(
    initialProfile?.bio_en || defaultBioEn
  );

  const [activeTab, setActiveTab] = useState<"it" | "en">("it");
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const formData = new FormData();
    formData.set("headline_it", headlineIt);
    formData.set("headline_en", headlineEn);
    formData.set("bio_it", bioIt);
    formData.set("bio_en", bioEn);

    startTransition(async () => {
      const res = await updateProfile(formData);
      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setStatusMessage({
          type: "success",
          text: "Biografia aggiornata con successo! Le modifiche sono ora visibili su /chi-sono.",
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Alert di stato */}
      {statusMessage && (
        <div
          role="status"
          className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-destructive/10 border-destructive/30 text-destructive"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <span className="text-sm font-medium">{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Header del form */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Modifica Testo Biografia
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Questo contenuto viene visualizzato nella nuova pagina dedicata{" "}
                <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">/chi-sono</code>.
              </p>
            </div>

            {/* Language Switcher Tabs */}
            <div className="inline-flex rounded-lg bg-muted p-1 gap-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("it")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "it"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🇮🇹 Italiano
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "en"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          {/* Tab Italiano */}
          {activeTab === "it" && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="headline_it"
                  className="block text-sm font-semibold text-foreground"
                >
                  Sottotitolo / Headline (Italiano)
                </label>
                <input
                  id="headline_it"
                  type="text"
                  value={headlineIt}
                  onChange={(e) => setHeadlineIt(e.target.value)}
                  placeholder="Es. Sviluppatore Web & Software a Turi (Bari)"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="bio_it"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Biografia Narrativa (Italiano) *
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {bioIt.length} caratteri
                  </span>
                </div>
                <textarea
                  id="bio_it"
                  rows={10}
                  value={bioIt}
                  onChange={(e) => setBioIt(e.target.value)}
                  placeholder="Descrivi la tua storia, il tuo metodo, la tua formazione e la tua passione..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-primary font-mono text-xs sm:text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  I paragrafi separati da riga vuota verranno formattati come paragrafi distinti.
                </p>
              </div>
            </div>
          )}

          {/* Tab Inglese */}
          {activeTab === "en" && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="headline_en"
                  className="block text-sm font-semibold text-foreground"
                >
                  Subtitle / Headline (English)
                </label>
                <input
                  id="headline_en"
                  type="text"
                  value={headlineEn}
                  onChange={(e) => setHeadlineEn(e.target.value)}
                  placeholder="E.g. Web & Software Developer based in Bari, Italy"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="bio_en"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Narrative Biography (English)
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {bioEn.length} characters
                  </span>
                </div>
                <textarea
                  id="bio_en"
                  rows={10}
                  value={bioEn}
                  onChange={(e) => setBioEn(e.target.value)}
                  placeholder="Describe your journey, engineering approach, and academic background..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-primary font-mono text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* Actions bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              size="sm"
              asChild
              className="gap-1.5"
            >
              <Link href="/chi-sono" target="_blank">
                <Eye className="h-4 w-4" /> Anteprima Pagina Chi Sono
              </Link>
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="gap-2 rounded-xl font-semibold shadow-xs"
            >
              <Save className="h-4 w-4" />
              {isPending ? "Salvataggio in corso..." : "Salva Modifiche"}
            </Button>
          </div>
        </div>
      </form>

      {/* Box Anteprima testo */}
      <div className="bg-muted/30 border border-border/60 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Anteprima Rendering (
          {activeTab === "it" ? "Italiano" : "English"})
        </h3>
        <div className="prose dark:prose-invert max-w-none text-foreground space-y-3 text-sm sm:text-base leading-relaxed">
          <p className="font-bold text-lg text-primary">
            {activeTab === "it" ? headlineIt : headlineEn}
          </p>
          {(activeTab === "it" ? bioIt : bioEn)
            .split("\n\n")
            .filter((p) => p.trim().length > 0)
            .map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
