import { getBaseUrl } from '@/lib/url';
import { siteConfig } from '@/lib/seo.config';

/**
 * Inietta gli structured data JSON-LD conformi a Schema.org nel documento.
 * È un Server Component: zero overhead JavaScript lato client.
 */
export function JsonLd() {
  const baseUrl = getBaseUrl();
  const ogImageUrl = `${baseUrl}/opengraph-image.png`;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    image: ogImageUrl,
    inLanguage: 'it-IT',
    publisher: {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
      name: siteConfig.name,
      image: ogImageUrl,
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: siteConfig.name,
    url: baseUrl,
    image: ogImageUrl,
    email: `mailto:${siteConfig.socials.email}`,
    jobTitle: 'Sviluppatore Web & Software',
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'Full-Stack Web Development',
      'REST APIs',
      'Serverless Architecture',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Università degli Studi di Bari Aldo Moro',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Turi',
      addressRegion: 'BA',
      addressCountry: 'IT',
    },
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${baseUrl}/#profilepage`,
    url: baseUrl,
    name: siteConfig.title.default,
    description: siteConfig.description,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      '@id': `${baseUrl}/#primaryimage`,
      url: ogImageUrl,
      contentUrl: ogImageUrl,
      width: 1200,
      height: 630,
      caption: siteConfig.name,
    },
    image: ogImageUrl,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
    },
    mainEntity: {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
    },
    inLanguage: 'it-IT',
    datePublished: '2026-09-02T00:00:00.000Z',
    dateModified: new Date().toISOString().split('T')[0],
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
