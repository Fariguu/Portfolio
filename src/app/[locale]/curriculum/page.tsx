import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToHomeButton } from "@/components/ui/back-to-home-button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import { Button } from "@/components/ui/button";
import { getCvInfo } from "@/app/admin/actions/cv";
import { CvJsonLd } from "@/components/seo/cv-json-ld";
import { redirect } from "next/navigation";
import {
  FileText,
  Download,
  ExternalLink,
  Mail,
  AlertCircle,
  CheckCircle2,
  Calendar,
  HardDrive,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface CurriculumPageProps {
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: CurriculumPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/curriculum`;

  return {
    title: dict.curriculum.meta.title,
    description: dict.curriculum.meta.description,
    keywords: dict.curriculum.meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: dict.curriculum.meta.title,
      description: dict.curriculum.meta.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "it_IT",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.curriculum.meta.title,
      description: dict.curriculum.meta.description,
      creator: siteConfig.creator,
    },
  };
}

export default async function CurriculumPage({ params }: CurriculumPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  // Se l'utente visita /en/curriculum, reindirizza alla versione canonica /curriculum
  if (locale === "en") {
    redirect("/curriculum");
  }

  const dict = getDictionary(locale);
  const cvInfo = await getCvInfo();

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return null;
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (isoString: string | null) => {
    if (!isoString) return null;
    try {
      return new Date(isoString).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  const formattedDate = formatDate(cvInfo.updatedAt);
  const formattedSize = formatFileSize(cvInfo.size);

  return (
    <>
      <CvJsonLd />
      <Navbar dict={dict} locale={locale} />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-8">
          {/* Top Bar: Torna alla home + Azione Download Primaria */}
          <div className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost" size="sm" className="rounded-full text-xs sm:text-sm text-muted-foreground hover:text-foreground">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-1.5 text-primary" />
                <span>{dict.curriculum.backHome}</span>
              </Link>
            </Button>

            {cvInfo.exists && cvInfo.url && (
              <Button asChild size="sm" className="rounded-full shadow-xs gap-1.5 text-xs sm:text-sm">
                <a
                  href={cvInfo.url}
                  download="Curriculum_Vitae_Gabriele_Farigu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  <span>{dict.curriculum.downloadButton}</span>
                </a>
              </Button>
            )}
          </div>

          {/* Header Titolo */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <FileText className="h-3.5 w-3.5" />
              <span>{dict.curriculum.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {dict.curriculum.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {dict.curriculum.description}
            </p>

            {/* Metadati file */}
            {cvInfo.exists && (
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Disponibile per il download
                </span>
                {formattedDate && (
                  <span className="flex items-center gap-1">
                    • <Calendar className="h-3.5 w-3.5 ml-1" /> Aggiornato a {formattedDate}
                  </span>
                )}
                {formattedSize && (
                  <span className="flex items-center gap-1">
                    • <HardDrive className="h-3.5 w-3.5 ml-1" /> PDF ({formattedSize})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* PDF Viewer Container */}
          {cvInfo.exists && cvInfo.url ? (
            <div className="space-y-4">
              <div className="w-full h-[72vh] md:h-[82vh] rounded-2xl overflow-hidden border border-border/80 bg-muted/20 shadow-md relative">
                <object
                  data={cvInfo.url}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  {/* Fallback iframe per browser desktop/mobile alternativi */}
                  <iframe
                    src={cvInfo.url}
                    className="w-full h-full"
                    title="Curriculum Vitae di Gabriele Farigu"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                      <AlertCircle className="h-10 w-10 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground max-w-md">
                        {dict.curriculum.fallbackNotice}
                      </p>
                      <Button asChild>
                        <a
                          href={cvInfo.url}
                          download="Curriculum_Vitae_Gabriele_Farigu.pdf"
                        >
                          <Download className="h-4 w-4 mr-1.5" />
                          <span>{dict.curriculum.fallbackDownload}</span>
                        </a>
                      </Button>
                    </div>
                  </iframe>
                </object>
              </div>

              {/* Informazione Fallback Mobile */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>
                    Visualizzazione ottimizzata per desktop. Su dispositivi mobili puoi scaricare il file o aprirlo a schermo intero.
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Button asChild size="sm" variant="ghost" className="h-8 text-xs gap-1">
                    <a href={cvInfo.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>{dict.curriculum.openNewTab}</span>
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="h-8 text-xs gap-1">
                    <a
                      href={cvInfo.url}
                      download="Curriculum_Vitae_Gabriele_Farigu.pdf"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Scarica</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12 rounded-2xl border border-dashed border-border bg-card text-center space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <FileText className="h-7 w-7" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-foreground">
                  Documento in Aggiornamento
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {dict.curriculum.noCvNotice}
                </p>
              </div>
              <div className="pt-2">
                <Button asChild className="rounded-full">
                  <Link href="/contatti">
                    <Mail className="h-4 w-4 mr-1.5" />
                    <span>{dict.curriculum.contactCta}</span>
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Bottom Actions Banner */}
          <div className="p-6 md:p-8 rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Sei interessato al mio profilo?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Sono aperto a posizioni junior, opportunità lavorative, tirocini e collaborazioni tecniche.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {cvInfo.exists && cvInfo.url && (
                <Button asChild variant="outline" className="rounded-full gap-1.5 text-xs sm:text-sm">
                  <a
                    href={cvInfo.url}
                    download="Curriculum_Vitae_Gabriele_Farigu.pdf"
                  >
                    <Download className="h-4 w-4" />
                    <span>Scarica PDF</span>
                  </a>
                </Button>
              )}
              <Button asChild className="rounded-full gap-1.5 text-xs sm:text-sm">
                <Link href="/contatti">
                  <Mail className="h-4 w-4" />
                  <span>{dict.curriculum.contactCta}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <BackToHomeButton href="/" label={dict.curriculum.backHome} />
      </main>

      <Footer dict={dict} locale={locale} />
    </>
  );
}
