import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import type { CaseStudy } from "@/lib/data/case-studies";
import type { Locale } from "@/lib/i18n/config";

interface ProjectJsonLdProps {
  readonly caseStudy?: CaseStudy | null;
  readonly project?: {
    title: string;
    title_en?: string | null;
    description: string;
    description_en?: string | null;
    image_url?: string | null;
    slug?: string | null;
    tags?: string[];
    demo_url?: string | null;
  } | null;
  readonly locale: Locale;
}

/**
 * Inietta gli structured data JSON-LD conformi a Schema.org per il singolo Case Study.
 * Genera lo schema SoftwareApplication / CreativeWork per Google Rich Snippets.
 */
export function ProjectJsonLd({ caseStudy, project, locale }: Readonly<ProjectJsonLdProps>) {
  const baseUrl = getBaseUrl();
  const slug = project?.slug || caseStudy?.slug || "";
  const currentUrl = `${baseUrl}${locale === "en" ? "/en" : ""}/progetti/${slug}`;
  const inLanguage = locale === "en" ? "en-US" : "it-IT";

  const isEn = locale === "en";
  const name = project
    ? (isEn && project.title_en ? project.title_en : project.title)
    : caseStudy?.title[locale] || "";
  const headline = project
    ? (isEn && project.description_en ? project.description_en : project.description)
    : caseStudy?.subtitle[locale] || "";
  const description = project
    ? (isEn && project.description_en ? project.description_en : project.description)
    : caseStudy?.metaDescription[locale] || "";
  const image = project?.image_url || caseStudy?.coverImage || "";
  const demoUrl = project?.demo_url || caseStudy?.demoUrl;
  const tags = project?.tags || caseStudy?.tags || [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${currentUrl}#software`,
    name,
    headline,
    description,
    applicationCategory: caseStudy?.schemaOrg?.applicationCategory || "WebApplication",
    operatingSystem: caseStudy?.schemaOrg?.operatingSystem || "Any (Web Browser)",
    url: currentUrl,
    image,
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
    featureList: caseStudy?.features?.[locale]?.join(", ") || tags.join(", "),
    softwareRequirements: caseStudy?.stack?.map((s) => s.name).join(", ") || tags.join(", "),
    ...(demoUrl ? { installUrl: demoUrl } : {}),
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
