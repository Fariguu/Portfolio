import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

interface JsonLdProps {
  locale?: Locale;
}

/**
 * Inietta gli structured data JSON-LD conformi a Schema.org nel documento.
 * È un Server Component: zero overhead JavaScript lato client.
 */
export function JsonLd({ locale = "it" }: JsonLdProps) {
  const baseUrl = getBaseUrl();
  const ogImageUrl = `${baseUrl}/opengraph-image.png`;
  const dict = getDictionary(locale);
  const inLanguage = locale === "en" ? "en-US" : "it-IT";
  const currentUrl = locale === "en" ? `${baseUrl}/en` : baseUrl;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: siteConfig.name,
    url: baseUrl,
    description: dict.meta.description,
    image: ogImageUrl,
    inLanguage,
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: siteConfig.name,
      image: ogImageUrl,
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: siteConfig.name,
    url: baseUrl,
    image: ogImageUrl,
    email: `mailto:${siteConfig.socials.email}`,
    jobTitle:
      locale === "en"
        ? "Web & Software Developer"
        : "Sviluppatore Web & Software",
    sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Full-Stack Web Development",
      "REST APIs",
      "Serverless Architecture",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name:
        locale === "en"
          ? "University of Bari Aldo Moro"
          : "Università degli Studi di Bari Aldo Moro",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Turi",
      addressRegion: "BA",
      addressCountry: "IT",
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${currentUrl}/#profilepage`,
    url: currentUrl,
    name: dict.meta.title,
    description: dict.meta.description,
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#primaryimage`,
      url: ogImageUrl,
      contentUrl: ogImageUrl,
      width: 1200,
      height: 630,
      caption: siteConfig.name,
    },
    image: ogImageUrl,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
    },
    mainEntity: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
    },
    inLanguage,
    datePublished: "2026-09-02T00:00:00.000Z",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
