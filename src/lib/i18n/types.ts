export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    localeCode: string;
  };
  nav: {
    home: string;
    skills: string;
    journey: string;
    projects: string;
    contact: string;
    contactCta: string;
    toggleMenu: string;
  };
  hero: {
    badge: string;
    name: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
  };
  skills: {
    badge: string;
    title: string;
    description: string;
    fallbackList: Array<{
      name: string;
      description: string;
      icon_name: string;
    }>;
  };
  journey: {
    badge: string;
    title: string;
    description: string;
    presentLabel: string;
    detailsLabel: string;
    fallbackList: Array<{
      period: string;
      title: string;
      institution: string;
      description: string;
      type: "education" | "certification" | "milestone";
      isCurrent: boolean;
      tags: string[];
      linkLabel: string;
      linkUrl: string;
    }>;
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
    fallbackList: Array<{
      title: string;
      statusBadge?: string;
      description: string;
      image: string;
      tags: string[];
      github?: string;
      githubLabel?: string;
      isPrivate?: boolean;
      featured?: boolean;
      demo?: string;
    }>;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationValue: string;
    cardTitle: string;
    cardDescription: string;
    fieldFirstName: string;
    fieldFirstNamePlaceholder: string;
    fieldLastName: string;
    fieldLastNamePlaceholder: string;
    fieldEmail: string;
    fieldEmailPlaceholder: string;
    fieldMessage: string;
    fieldMessagePlaceholder: string;
    turnstileError: string;
    submitting: string;
    submit: string;
    privacyConsentPrefix: string;
    privacyConsentLinkText: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    genericError: string;
  };
  footer: {
    creatorTagline: string;
    privacyPolicy: string;
  };
  privacy: {
    backToPortfolio: string;
    title: string;
    lastUpdated: string;
    section1Title: string;
    section1Content: string;
    section2Title: string;
    section2ProvidedDataTitle: string;
    section2ProvidedDataContent: string;
    section2MetricsTitle: string;
    section2MetricsContent: string;
    section2CookieTitle: string;
    section2CookieContent: string;
    section3Title: string;
    section3Content1: string;
    section3Content2: string;
    section4Title: string;
    section4Intro: string;
    section4Vercel: string;
    section4Supabase: string;
    section4Resend: string;
    section4Cloudflare: string;
    section5Title: string;
    section5Content: string;
    section6Title: string;
    section6Intro: string;
    section6Right1: string;
    section6Right2: string;
    section6Right3: string;
    section6Right4: string;
    section6ContactText: string;
    backToHome: string;
    allRightsReserved: string;
  };
  notFound: {
    badge: string;
    title: string;
    description: string;
    backHome: string;
    contactMe: string;
  };
  languageSwitcher: {
    selectLanguage: string;
    currentLanguage: string;
  };
}
