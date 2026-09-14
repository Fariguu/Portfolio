import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

interface JsonLdProps {
  readonly locale?: Locale;
}

/**
 * Inietta gli structured data JSON-LD conformi a Schema.org nel documento.
 * È un Server Component: zero overhead JavaScript lato client.
 */
export function JsonLd({ locale = "it" }: Readonly<JsonLdProps>) {
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
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Open to Work",
    },
    hasOccupation: {
      "@type": "Occupation",
      name:
        locale === "en"
          ? "Web & Software Developer"
          : "Sviluppatore Web & Software",
      occupationalCategory: "15-1254.00",
      skills:
        "Next.js, React, TypeScript, Supabase, PostgreSQL, Tailwind CSS, REST APIs",
    },
    seeks:
      locale === "en"
        ? "Open to freelance projects, collaborations, and engineering opportunities"
        : "Disponibile per progetti freelance, collaborazioni e opportunità lavorative",
    sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Supabase",
      "PostgreSQL",
      "SQL",
      "Tailwind CSS",
      "REST APIs",
      "Server Actions",
      "Python",
      "Java",
      "C",
      "Leaflet",
      "Vercel",
      "Full-Stack Web Development",
      "Serverless Architecture",
      "Responsive Design",
      "UI/UX",
      "Git",
      "GitHub",
      "SEO",
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name:
      locale === "en"
        ? "Gabriele Farigu — Web & Software Development"
        : "Gabriele Farigu — Sviluppo Web & Software",
    provider: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
    },
    url: baseUrl,
    image: ogImageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Turi",
      addressRegion: "BA",
      addressCountry: "IT",
    },
    areaServed: [
      { "@type": "Country", name: "Italy" },
      { "@type": "AdministrativeArea", name: "Puglia" },
      { "@type": "City", name: "Bari" },
    ],
    serviceType: [
      "Web Development",
      "Web Application Development",
      "Website Design",
      "Booking System Development",
      "Website Redesign & Speed Optimization",
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${baseUrl}${locale === "en" ? "/en" : ""}/preventivo`,
    },
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${baseUrl}/#navigation`,
    name: locale === "en" ? "Main Navigation" : "Navigazione Principale",
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: locale === "en" ? "About" : "Chi Sono",
        description:
          locale === "en"
            ? "About Gabriele Farigu — Web and Software Developer"
            : "Chi sono — Gabriele Farigu, sviluppatore web e software",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/chi-sono`,
      },
      {
        "@type": "SiteNavigationElement",
        name: locale === "en" ? "Skills" : "Competenze",
        description:
          locale === "en"
            ? "Technologies and tools I use: Next.js, React, TypeScript, Supabase"
            : "Tecnologie e strumenti che uso: Next.js, React, TypeScript, Supabase",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/competenze`,
      },
      {
        "@type": "SiteNavigationElement",
        name: locale === "en" ? "Journey" : "Percorso",
        description:
          locale === "en"
            ? "Education and milestones: University of Bari, high school diploma"
            : "Formazione e traguardi: Università di Bari, diploma SIA",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/percorso`,
      },
      {
        "@type": "SiteNavigationElement",
        name: locale === "en" ? "Projects" : "Progetti",
        description:
          locale === "en"
            ? "Web applications and engineering case studies I've built"
            : "Applicazioni web e casi studio ingegneristici che ho realizzato",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/progetti`,
      },
      {
        "@type": "SiteNavigationElement",
        name: locale === "en" ? "Contact" : "Contatti",
        description:
          locale === "en"
            ? "Get in touch — send a direct message or inquiry"
            : "Scrivimi un messaggio diretto o richiedi informazioni",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/contatti`,
      },
      {
        "@type": "SiteNavigationElement",
        name: locale === "en" ? "Quote" : "Preventivo",
        description:
          locale === "en"
            ? "Online quote configurator — describe your project in 4 steps"
            : "Configuratore preventivo online — descrivi il tuo progetto in 4 passaggi",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/preventivo`,
      },
    ],
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
    hasPart: [
      {
        "@type": "WebPageElement",
        name: locale === "en" ? "About" : "Chi Sono",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/chi-sono`,
        description: dict.meta.description,
      },
      {
        "@type": "WebPageElement",
        name: locale === "en" ? "Skills" : "Competenze",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/competenze`,
        description: dict.skills.description,
      },
      {
        "@type": "WebPageElement",
        name: locale === "en" ? "Journey" : "Percorso",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/percorso`,
        description: dict.journey.description,
      },
      {
        "@type": "WebPageElement",
        name: locale === "en" ? "Projects" : "Progetti",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/progetti`,
        description: dict.portfolio.description,
      },
      {
        "@type": "WebPageElement",
        name: locale === "en" ? "Contact" : "Contatti",
        url: `${baseUrl}${locale === "en" ? "/en" : ""}/contatti`,
        description: dict.contact.description,
      },
      {
        "@type": "WebPageElement",
        name: "FAQ",
        url: `${currentUrl}#faq`,
        description: dict.faq.description,
      },
    ],
    inLanguage,
    datePublished: "2026-09-02T00:00:00.000Z",
    dateModified: new Date().toISOString().split("T")[0],
  };

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema,
      personSchema,
      serviceSchema,
      navigationSchema,
      profilePageSchema,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
    />
  );
}
