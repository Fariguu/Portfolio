import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBaseUrl } from "@/lib/url";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const baseUrl = getBaseUrl();

  const canonicalUrl =
    locale === "it" ? `${baseUrl}/privacy` : `${baseUrl}/en/privacy`;

  return {
    title: dict.privacy.title,
    description: dict.meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: `${baseUrl}/privacy`,
        en: `${baseUrl}/en/privacy`,
        "x-default": `${baseUrl}/privacy`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  const homeHref = locale === "en" ? "/en" : "/";

  return (
    <div className="min-h-screen bg-background py-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground hover:text-foreground"
          >
            <Link href={homeHref} className="flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> {dict.privacy.backToPortfolio}
            </Link>
          </Button>

          <LanguageSwitcher currentLocale={locale} />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {dict.privacy.title}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {dict.privacy.lastUpdated}
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {dict.privacy.section1Title}
            </h2>
            <p>{dict.privacy.section1Content}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {dict.privacy.section2Title}
            </h2>
            <div className="space-y-2">
              <p>
                <strong>{dict.privacy.section2ProvidedDataTitle}</strong>{" "}
                {dict.privacy.section2ProvidedDataContent}
              </p>
              <p>
                <strong>{dict.privacy.section2MetricsTitle}</strong>{" "}
                {dict.privacy.section2MetricsContent}
              </p>
              <p>
                <strong>{dict.privacy.section2CookieTitle}</strong>{" "}
                {dict.privacy.section2CookieContent}
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {dict.privacy.section3Title}
            </h2>
            <p>{dict.privacy.section3Content1}</p>
            <p>{dict.privacy.section3Content2}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {dict.privacy.section4Title}
            </h2>
            <p>{dict.privacy.section4Intro}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>{dict.privacy.section4Vercel}</li>
              <li>{dict.privacy.section4Supabase}</li>
              <li>{dict.privacy.section4Resend}</li>
              <li>{dict.privacy.section4Cloudflare}</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {dict.privacy.section5Title}
            </h2>
            <p>{dict.privacy.section5Content}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {dict.privacy.section6Title}
            </h2>
            <p>{dict.privacy.section6Intro}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{dict.privacy.section6Right1}</li>
              <li>{dict.privacy.section6Right2}</li>
              <li>{dict.privacy.section6Right3}</li>
              <li>{dict.privacy.section6Right4}</li>
            </ul>
            <p className="pt-2">{dict.privacy.section6ContactText}</p>
          </section>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gabriele Farigu •{" "}
            {dict.privacy.allRightsReserved}
          </p>
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link href={homeHref}>{dict.privacy.backToHome}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
