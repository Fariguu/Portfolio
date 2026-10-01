import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";

/**
 * Structured Data JSON-LD conforme a Schema.org specifico per la pagina Curriculum Vitae.
 * Server Component: zero overhead JavaScript lato client.
 */
export function CvJsonLd() {
  const baseUrl = getBaseUrl();
  const currentUrl = `${baseUrl}/curriculum`;
  const ogImageUrl = `${baseUrl}/opengraph-image.png`;

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${currentUrl}/#profilepage`,
    url: currentUrl,
    name: "Curriculum Vitae — Gabriele Farigu",
    description:
      "Curriculum Vitae di Gabriele Farigu, sviluppatore web e software con sede a Bari. Specializzato in Next.js, React, TypeScript e Supabase. Disponibile per assunzioni, posizioni junior e stage.",
    inLanguage: "it-IT",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#primaryimage`,
      url: ogImageUrl,
      contentUrl: ogImageUrl,
      width: 1200,
      height: 630,
      caption: siteConfig.name,
    },
    mainEntity: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: siteConfig.name,
      jobTitle: "Junior Web & Software Developer",
      url: baseUrl,
      email: `mailto:${siteConfig.socials.email}`,
      sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Turi",
        addressRegion: "BA",
        addressCountry: "IT",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Università degli Studi di Bari Aldo Moro",
        },
        {
          "@type": "EducationalOrganization",
          name: 'I.I.S.S. "Pertini - Anelli - Pinto"',
        },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Junior Web & Software Developer",
        occupationalCategory: "15-1254.00",
        skills:
          "Next.js, React, TypeScript, Supabase, PostgreSQL, Tailwind CSS, Python, Java, REST APIs, Git",
      },
      seeks:
        "Disponibile per posizioni junior, assunzioni, stage e collaborazioni ingegneristiche",
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Tailwind CSS",
        "Full-Stack Web Development",
        "Cloudflare Turnstile",
        "Vercel",
        "Git",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
    />
  );
}
