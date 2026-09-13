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
    about: string;
    skills: string;
    journey: string;
    projects: string;
    contact: string;
    contactCta: string;
    toggleMenu: string;
    quote: string;
    backHome: string;
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
    viewCaseStudy: string;
    fallbackList: Array<{
      slug: string;
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
  caseStudy: {
    backToProjects: string;
    overviewTitle: string;
    challengesTitle: string;
    architectureTitle: string;
    featuresTitle: string;
    resultsTitle: string;
    stackTitle: string;
    linksTitle: string;
    roleLabel: string;
    clientLabel: string;
    periodLabel: string;
    prevProject: string;
    nextProject: string;
    allProjects: string;
    ctaBadge: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
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
  faq: {
    badge: string;
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
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
  quote: {
    meta: {
      title: string;
      description: string;
      keywords: string[];
    };
    badge: string;
    title: string;
    subtitle: string;
    stepIndicator: string;
    nextButton: string;
    backButton: string;
    submitButton: string;
    submitting: string;
    turnstileError: string;
    genericError: string;
    step1: {
      title: string;
      subtitle: string;
      types: {
        webApp: { title: string; description: string };
        showcaseSite: { title: string; description: string };
        bookingSystem: { title: string; description: string };
        restylingSpeed: { title: string; description: string };
      };
    };
    step2: {
      title: string;
      subtitle: string;
      features: {
        auth: { title: string; description: string };
        database: { title: string; description: string };
        payments: { title: string; description: string };
        maps: { title: string; description: string };
        multilang: { title: string; description: string };
        cms: { title: string; description: string };
      };
    };
    step3: {
      title: string;
      subtitle: string;
      timelineLabel: string;
      timelineOptions: {
        urgent: { title: string; description: string };
        standard: { title: string; description: string };
        flexible: { title: string; description: string };
      };
      materialsLabel: string;
      materialsOptions: {
        ready: { title: string; description: string };
        inProgress: { title: string; description: string };
        none: { title: string; description: string };
      };
      budgetLabel: string;
      budgetOptions: {
        tier1: { title: string; description: string };
        tier2: { title: string; description: string };
        tier3: { title: string; description: string };
        tier4: { title: string; description: string };
        undecided: { title: string; description: string };
      };
    };
    step4: {
      title: string;
      subtitle: string;
      firstNameLabel: string;
      firstNamePlaceholder: string;
      lastNameLabel: string;
      lastNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      notesLabel: string;
      notesPlaceholder: string;
      privacyNotice: string;
    };
    success: {
      title: string;
      message: string;
      recapTitle: string;
      backHome: string;
    };
    ctaBanner: {
      title: string;
      description: string;
      button: string;
    };
  };
  testimonials: {
    badge: string;
    title: string;
    description: string;
    verifiedReview: string;
    viewProject: string;
    swipeHint: string;
  };
  bio: {
    badge: string;
    title: string;
    fallbackHeadline: string;
    fallbackBio: string;
    studiesTitle: string;
    ctaContact: string;
    ctaProjects: string;
    adminNotice: string;
  };
  pages: {
    skills: {
      title: string;
      description: string;
      keywords: string[];
    };
    journey: {
      title: string;
      description: string;
      keywords: string[];
    };
    projects: {
      title: string;
      description: string;
      keywords: string[];
    };
    contact: {
      title: string;
      description: string;
      keywords: string[];
    };
    about: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
  explore: {
    about: string;
    skills: string;
    journey: string;
    projects: string;
  };
}
