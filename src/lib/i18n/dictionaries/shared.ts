import type { Dictionary } from "../types";

export const SHARED_AUTHOR = {
  name: "Gabriele Farigu",
  email: "farigugabriele@gmail.com",
} as const;

export const SHARED_COMMON_KEYWORDS = [
  "full-stack developer",
  "software engineer",
  "portfolio developer",
  "Next.js developer",
  "React",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
] as const;

export function createKeywords(role: string, geo: string): string[] {
  return [
    SHARED_AUTHOR.name,
    role,
    ...SHARED_COMMON_KEYWORDS,
    geo,
    "Bari",
  ];
}

export const SHARED_SKILLS_DATA = [
  { icon_name: "MonitorSmartphone" },
  { icon_name: "Database" },
  { icon_name: "ShieldCheck" },
  { icon_name: "Layers" },
] as const;

export const SHARED_JOURNEY_DATA = [
  {
    period: "2019 — 2024",
    institution: 'I.I.S.S. "Pertini - Anelli - Pinto"',
    type: "education" as const,
    isCurrent: false,
    linkUrl: "https://www.pertinianellipinto.edu.it/",
  },
  {
    type: "education" as const,
    isCurrent: true,
    linkUrl:
      "https://www.uniba.it/it/corsi/cdl-informatica-tecnologie-produzione-software",
  },
] as const;

export const SHARED_PROJECTS_DATA = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Leaflet",
    ],
    github: "https://github.com/Fariguu/Impresa-Edile",
    isPrivate: true,
    featured: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Resend",
    ],
    github: "https://github.com/Fariguu/Educational-Booking-WebSite",
    isPrivate: true,
    featured: false,
  },
  {
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=800",
    tags: [
      "JavaScript ES6+",
      "HTML5",
      "CSS3",
      "Canvas API",
      "SVG Export",
    ],
    github: "https://github.com/Fariguu/QR-Code-Creator",
    isPrivate: false,
    featured: false,
  },
] as const;

export interface LocalizedSkillItem {
  name: string;
  description: string;
}

export interface LocalizedHighSchoolItem {
  title: string;
  description: string;
  tags: string[];
  linkLabel: string;
}

export interface LocalizedUniversityItem {
  period: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
  linkLabel: string;
}

export interface LocalizedProjectItem {
  title: string;
  statusBadge?: string;
  description: string;
  githubLabel?: string;
  demo?: string;
}

export interface DictionaryInput {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    localeCode: string;
  };
  nav: Dictionary["nav"];
  hero: {
    badge: string;
    name?: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
  };
  skills: {
    badge: string;
    title: string;
    description: string;
    fallbackList: LocalizedSkillItem[];
  };
  journey: {
    badge: string;
    title: string;
    description: string;
    presentLabel: string;
    detailsLabel: string;
    fallbackList: [LocalizedHighSchoolItem, LocalizedUniversityItem];
  };
  portfolio: {
    badge: string;
    title: string;
    description: string;
    privateRepo: string;
    codeLabel: string;
    liveDemo: string;
    exploreAllGithub: string;
    previewAltPrefix: string;
    fallbackList: LocalizedProjectItem[];
  };
  contact: Dictionary["contact"];
  footer: Dictionary["footer"];
  privacy: Dictionary["privacy"];
  notFound: Dictionary["notFound"];
  languageSwitcher: Dictionary["languageSwitcher"];
}

export function createDictionary(input: DictionaryInput): Dictionary {
  return {
    meta: input.meta,
    nav: input.nav,
    hero: {
      name: input.hero.name ?? SHARED_AUTHOR.name,
      badge: input.hero.badge,
      tagline: input.hero.tagline,
      ctaProjects: input.hero.ctaProjects,
      ctaContact: input.hero.ctaContact,
    },
    skills: {
      badge: input.skills.badge,
      title: input.skills.title,
      description: input.skills.description,
      fallbackList: input.skills.fallbackList.map((item, index) => ({
        name: item.name,
        description: item.description,
        icon_name: SHARED_SKILLS_DATA[index]?.icon_name ?? "",
      })),
    },
    journey: {
      badge: input.journey.badge,
      title: input.journey.title,
      description: input.journey.description,
      presentLabel: input.journey.presentLabel,
      detailsLabel: input.journey.detailsLabel,
      fallbackList: [
        {
          period: SHARED_JOURNEY_DATA[0].period,
          title: input.journey.fallbackList[0].title,
          institution: SHARED_JOURNEY_DATA[0].institution,
          description: input.journey.fallbackList[0].description,
          type: SHARED_JOURNEY_DATA[0].type,
          isCurrent: SHARED_JOURNEY_DATA[0].isCurrent,
          tags: input.journey.fallbackList[0].tags,
          linkLabel: input.journey.fallbackList[0].linkLabel,
          linkUrl: SHARED_JOURNEY_DATA[0].linkUrl,
        },
        {
          period: input.journey.fallbackList[1].period,
          title: input.journey.fallbackList[1].title,
          institution: input.journey.fallbackList[1].institution,
          description: input.journey.fallbackList[1].description,
          type: SHARED_JOURNEY_DATA[1].type,
          isCurrent: SHARED_JOURNEY_DATA[1].isCurrent,
          tags: input.journey.fallbackList[1].tags,
          linkLabel: input.journey.fallbackList[1].linkLabel,
          linkUrl: SHARED_JOURNEY_DATA[1].linkUrl,
        },
      ],
    },
    portfolio: {
      badge: input.portfolio.badge,
      title: input.portfolio.title,
      description: input.portfolio.description,
      privateRepo: input.portfolio.privateRepo,
      codeLabel: input.portfolio.codeLabel,
      liveDemo: input.portfolio.liveDemo,
      exploreAllGithub: input.portfolio.exploreAllGithub,
      previewAltPrefix: input.portfolio.previewAltPrefix,
      fallbackList: input.portfolio.fallbackList.map((item, index) => {
        const shared = SHARED_PROJECTS_DATA[index];
        return {
          title: item.title,
          statusBadge: item.statusBadge,
          description: item.description,
          githubLabel: item.githubLabel,
          demo: item.demo,
          image: shared?.image ?? "",
          tags: shared?.tags ? [...shared.tags] : [],
          github: shared?.github,
          isPrivate: shared?.isPrivate,
          featured: shared?.featured,
        };
      }),
    },
    contact: input.contact,
    footer: input.footer,
    privacy: input.privacy,
    notFound: input.notFound,
    languageSwitcher: input.languageSwitcher,
  };
}
