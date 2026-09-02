/**
 * Costanti SEO centralizzate per Gabriele Farigu Portfolio.
 * Modifiche a titoli, descrizioni, keyword o contatti vanno effettuate qui.
 */
export const siteConfig = {
  name: 'Gabriele Farigu',
  title: {
    default: 'Gabriele Farigu | Sviluppatore Web & Software',
    template: '%s | Gabriele Farigu',
  },
  description:
    'Portfolio di Gabriele Farigu, sviluppatore web e software specializzato in Next.js, React, TypeScript e Supabase. Progetti full-stack, architetture scalabili e codice pulito.',
  locale: 'it_IT',
  creator: 'Gabriele Farigu',
  keywords: [
    'Gabriele Farigu',
    'sviluppatore web',
    'full-stack developer',
    'software engineer',
    'portfolio developer',
    'Next.js developer',
    'React',
    'TypeScript',
    'Supabase',
    'Tailwind CSS',
    'web development Italia',
    'Bari',
  ],
  socials: {
    github: 'https://github.com/Fariguu',
    linkedin: 'https://www.linkedin.com/in/gabriele-farigu-3863b1312/',
    email: 'farigugabriele@gmail.com',
  },
} as const;
