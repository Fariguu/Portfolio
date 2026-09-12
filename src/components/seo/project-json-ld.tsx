import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import type { CaseStudy } from "@/lib/data/case-studies";
import type { Locale } from "@/lib/i18n/config";

interface ProjectJsonLdProps {
  readonly caseStudy: CaseStudy;
  readonly locale: Locale;
}

/**
 * Inietta gli structured data JSON-LD conformi a Schema.org per il singolo Case Study.
 * Genera lo schema SoftwareApplication / CreativeWork per Google Rich Snippets.
 */
export function ProjectJsonLd({ caseStudy, locale }: Readonly<ProjectJsonLdProps>) {
  const baseUrl = getBaseUrl();
  const currentUrl = `${baseUrl}${locale === "en" ? "/en" : ""}/progetti/${caseStudy.slug}`;
  const inLanguage = locale === "en" ? "en-US" : "it-IT";

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${currentUrl}#software`,
    name: caseStudy.title[locale],
    headline: caseStudy.subtitle[locale],
    description: caseStudy.metaDescription[locale],
    applicationCategory: caseStudy.schemaOrg.applicationCategory,
    operatingSystem: caseStudy.schemaOrg.operatingSystem,
    url: currentUrl,
    image: caseStudy.coverImage,
    inLanguage,
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: siteConfig.name,
      url: baseUrl,
    },
    creator: {
      "@type": "Person",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    featureList: caseStudy.features[locale].join(", "),
    softwareRequirements: caseStudy.stack.map((s) => s.name).join(", "),
    ...(caseStudy.demoUrl ? { installUrl: caseStudy.demoUrl } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
