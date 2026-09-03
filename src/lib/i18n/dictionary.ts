import { type Locale, defaultLocale } from "./config";
import type { Dictionary } from "./types";

type Localized<T = string> = T | { it: T; en: T };

function t<T>(item: Localized<T>, locale: Locale): T {
  if (
    item !== null &&
    typeof item === "object" &&
    !Array.isArray(item) &&
    "it" in item &&
    "en" in item
  ) {
    return (item as { it: T; en: T })[locale];
  }
  return item as T;
}

const AUTHOR_NAME = "Gabriele Farigu";
const AUTHOR_EMAIL = "farigugabriele@gmail.com";

const SHARED_KEYWORDS = [
  "full-stack developer",
  "software engineer",
  "portfolio developer",
  "Next.js developer",
  "React",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
] as const;

const content = {
  meta: {
    title: {
      it: "Gabriele Farigu | Sviluppatore Web & Software",
      en: "Gabriele Farigu | Web & Software Developer",
    },
    description: {
      it: "Portfolio di Gabriele Farigu, sviluppatore web e software specializzato in Next.js, React, TypeScript e Supabase. Progetti full-stack, architetture scalabili e codice pulito.",
      en: "Portfolio of Gabriele Farigu, web and software developer specializing in Next.js, React, TypeScript, and Supabase. Full-stack projects, scalable architectures, and clean code.",
    },
    roleKeyword: {
      it: "sviluppatore web",
      en: "web developer",
    },
    geoKeyword: {
      it: "web development Italia",
      en: "web development Italy",
    },
    ogTitle: {
      it: "Gabriele Farigu | Sviluppatore Web & Software",
      en: "Gabriele Farigu | Web & Software Developer",
    },
    ogDescription: {
      it: "Progetto e realizzo soluzioni web moderne, veloci e su misura. Esplora il mio portfolio con progetti Next.js, React e Supabase.",
      en: "I design and build modern, fast, and bespoke web solutions. Explore my portfolio featuring Next.js, React, and Supabase projects.",
    },
    localeCode: {
      it: "it_IT",
      en: "en_US",
    },
  },
  nav: {
    home: "Home",
    skills: { it: "Competenze", en: "Skills" },
    journey: { it: "Percorso", en: "Journey" },
    projects: { it: "Progetti", en: "Projects" },
    contact: { it: "Contatti", en: "Contact" },
    contactCta: { it: "Contattami", en: "Contact Me" },
    toggleMenu: {
      it: "Apri menu di navigazione",
      en: "Toggle navigation menu",
    },
  },
  hero: {
    badge: {
      it: "Disponibile per nuovi progetti",
      en: "Available for new projects",
    },
    name: AUTHOR_NAME,
    tagline: {
      it: "Progetto e realizzo soluzioni web moderne, veloci e su misura. Aiuto progetti e attività a trasformare esigenze concrete in prodotti digitali intuitivi, affidabili e curati in ogni dettaglio.",
      en: "I design and build modern, fast, and tailored web solutions. I help projects and businesses transform concrete ideas into intuitive, reliable, and meticulously crafted digital products.",
    },
    ctaProjects: {
      it: "Guarda i miei progetti",
      en: "View My Projects",
    },
    ctaContact: {
      it: "Contattami",
      en: "Get in Touch",
    },
  },
  skills: {
    badge: { it: "Competenze", en: "Skills" },
    title: {
      it: "Tecnologie e Metodo di Lavoro",
      en: "Technologies & Engineering Approach",
    },
    description: {
      it: "Gli strumenti e i principi che applico quotidianamente nello sviluppo dei miei progetti web e software.",
      en: "The tools, patterns, and principles I apply daily in building modern web applications and software systems.",
    },
    fallbackList: [
      {
        icon_name: "MonitorSmartphone",
        name: {
          it: "Frontend Moderno con Next.js",
          en: "Modern Frontend with Next.js",
        },
        description: {
          it: "Realizzo interfacce utente reattive e veloci con Next.js (App Router), React, TypeScript e Tailwind CSS.",
          en: "Building responsive, high-performance user interfaces with Next.js (App Router), React, TypeScript, and Tailwind CSS.",
        },
      },
      {
        icon_name: "Database",
        name: {
          it: "Backend & Database Relazionali",
          en: "Backend & Relational Databases",
        },
        description: {
          it: "Gestione di database con Supabase (PostgreSQL) e SQLite, con query sicure, funzioni RPC e modellazione dei dati.",
          en: "Managing databases with Supabase (PostgreSQL) and SQLite, crafting secure queries, RPC functions, and data modeling.",
        },
      },
      {
        icon_name: "ShieldCheck",
        name: {
          it: "Sicurezza, Privacy & Validazione",
          en: "Security, Privacy & Validation",
        },
        description: {
          it: "Focus su buone pratiche: Row Level Security (RLS), validazione degli schemi con Zod e protezione anti-spam con Cloudflare Turnstile.",
          en: "Dedicated focus on best practices: Row Level Security (RLS), schema validation with Zod, and bot protection with Cloudflare Turnstile.",
        },
      },
      {
        icon_name: "Layers",
        name: {
          it: "Interattività, Mappe & Grafica",
          en: "Interactivity, Maps & Graphics",
        },
        description: {
          it: "Integrazione di mappe dinamiche con Leaflet, animazioni fluide con Framer Motion e grafica vettoriale/Canvas client-side.",
          en: "Integrating interactive maps with Leaflet, fluid animations with Framer Motion, and client-side vector/Canvas rendering.",
        },
      },
    ],
  },
  journey: {
    badge: { it: "Percorso", en: "Journey" },
    title: {
      it: "Formazione & Traguardi",
      en: "Education & Milestones",
    },
    description: {
      it: "Come ho costruito le mie competenze: il percorso scolastico, gli studi universitari e le tappe fondamentali della mia crescita.",
      en: "How I built my foundation: academic background, university studies, and key milestones in my technical growth.",
    },
    presentLabel: { it: "Presente", en: "Present" },
    detailsLabel: { it: "Vedi Dettagli", en: "View Details" },
    fallbackList: [
      {
        period: "2019 — 2024",
        institution: 'I.I.S.S. "Pertini - Anelli - Pinto"',
        type: "education" as const,
        isCurrent: false,
        linkUrl: "https://www.pertinianellipinto.edu.it/",
        title: {
          it: "Diploma di Scuola Secondaria di Secondo Grado — Sistemi Informativi Aziendali (SIA)",
          en: "High School Diploma — Business Information Systems (SIA)",
        },
        description: {
          it: "Diploma conseguito con specializzazione in Sistemi Informativi Aziendali (SIA). Formazione incentrata su programmazione e sviluppo software gestionale, progettazione e modellazione di database relazionali (SQL), reti informatiche, sicurezza dei dati aziendali ed economia d'impresa.",
          en: "Secondary school diploma with specialization in Business Information Systems. Coursework focused on business software development, relational database design and modeling (SQL), computer networks, cybersecurity, and business economics.",
        },
        tags: {
          it: [
            "Sistemi Informativi Aziendali",
            "Database SQL",
            "Programmazione",
            "Reti e Sicurezza Dati",
            "Economia Aziendale",
          ],
          en: [
            "Business Information Systems",
            "SQL Databases",
            "Programming",
            "Networking & Security",
            "Business Economics",
          ],
        },
        linkLabel: {
          it: "Sito Ufficiale Istituto",
          en: "Official Institute Website",
        },
      },
      {
        period: {
          it: "2024 — Presente",
          en: "2024 — Present",
        },
        institution: {
          it: "Università degli Studi di Bari Aldo Moro — Dipartimento di Informatica",
          en: "University of Bari Aldo Moro — Department of Computer Science",
        },
        type: "education" as const,
        isCurrent: true,
        linkUrl:
          "https://www.uniba.it/it/corsi/cdl-informatica-tecnologie-produzione-software",
        title: {
          it: "Laurea in Informatica e Tecnologie per la Produzione del Software (ITPS)",
          en: "B.Sc. in Computer Science & Software Production Technologies (ITPS)",
        },
        description: {
          it: "Percorso accademico focalizzato sui fondamenti teorici e metodologici della programmazione, dell'algoritmica e dell'ingegneria del software. Approfondimento dei modelli e tecniche per la produzione, verifica e manutenzione di sistemi software affidabili, gestione di basi di dati e sviluppo di interfacce utente efficaci.",
          en: "Academic program focused on the theoretical and methodological foundations of computer programming, algorithms, and software engineering. In-depth study of software design, testing, verification, database systems, and user interface ergonomics.",
        },
        tags: {
          it: [
            "Ingegneria del Software",
            "Algoritmi e Strutture Dati",
            "Programmazione",
            "Basi di Dati",
            "Architettura dei Sistemi",
            "UI/UX Design",
          ],
          en: [
            "Software Engineering",
            "Algorithms & Data Structures",
            "Programming",
            "Databases",
            "Systems Architecture",
            "UI/UX Design",
          ],
        },
        linkLabel: {
          it: "Scheda CdL UniBa ITPS",
          en: "Degree Program Info (UniBa)",
        },
      },
    ],
  },
  portfolio: {
    badge: { it: "Progetti", en: "Projects" },
    title: {
      it: "I Miei Lavori e Progetti",
      en: "Featured Works & Projects",
    },
    description: {
      it: "Una panoramica delle applicazioni che ho sviluppato: architetture reali, database relazionali, logica client-side e serverless.",
      en: "An overview of applications I have engineered: real-world architectures, relational schemas, client-side logic, and serverless workflows.",
    },
    privateRepo: { it: "Repo privato", en: "Private Repo" },
    codeLabel: { it: "Codice", en: "Code" },
    liveDemo: { it: "Demo Live", en: "Live Demo" },
    exploreAllGithub: {
      it: "Esplora tutti i progetti su GitHub",
      en: "Explore all repositories on GitHub",
    },
    previewAltPrefix: {
      it: "Anteprima del progetto",
      en: "Preview of project",
    },
    fallbackList: [
      {
        title: {
          it: "Impresa Edile",
          en: "Construction Firm Web Platform",
        },
        statusBadge: {
          it: "In Evidenza",
          en: "Featured",
        },
        description: {
          it: "Piattaforma web per un'impresa edile specializzata in costruzioni ex-novo e restauro conservativo di trulli e masserie storiche in Puglia. Integra calcolo preventivo interattivo, vetrina dei servizi chiavi in mano, mappa del territorio con Leaflet e animazioni fluide con Framer Motion.",
          en: "Web platform for a construction enterprise specializing in bespoke building and conservative restoration of historical trulli and masserie in Apulia. Features an interactive quote estimator, turnkey services showcase, Leaflet interactive map, and Framer Motion animations.",
        },
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
        githubLabel: {
          it: "Codice GitHub",
          en: "GitHub Code",
        },
        isPrivate: true,
        featured: true,
      },
      {
        title: "EduBook",
        statusBadge: {
          it: "In sviluppo attivo",
          en: "Active Development",
        },
        description: {
          it: "Piattaforma serverless per la gestione e prenotazione di lezioni private. Offre un'architettura multi-docente, calendario interattivo con partizionamento automatico degli slot orari, autenticazione sicura passwordless (OTP via Supabase), email transazionali con Resend e protezione bot con Cloudflare Turnstile.",
          en: "Serverless platform for managing and booking private tutoring sessions. Features a multi-tutor architecture, interactive calendar with automated slot partitioning, secure passwordless authentication (Supabase OTP), transactional emails with Resend, and Cloudflare Turnstile bot protection.",
        },
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
        githubLabel: {
          it: "Bozza Architettura",
          en: "Architecture Draft",
        },
        isPrivate: true,
        featured: false,
      },
      {
        title: "QR-Code Creator",
        description: {
          it: "Applicazione web client-side per la generazione di codici QR statici ad alta risoluzione (100% privati, non scadono mai). Supporta personalizzazione dei colori, inserimento logo con calcolo intelligente della safe-zone circolare ed esportazione sia in formato PNG HD (fino a 2048px) sia in SVG vettoriale puro.",
          en: "Client-side web application for generating high-resolution static QR codes (100% private, never expire). Supports full color customization, logo embedding with circular safe-zone calculation, and export in both HD PNG (up to 2048px) and pure vector SVG.",
        },
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
        githubLabel: {
          it: "Codice GitHub",
          en: "GitHub Code",
        },
        isPrivate: false,
        featured: false,
      },
    ],
  },
  contact: {
    badge: { it: "Contatti", en: "Contact" },
    title: {
      it: "Mettiamoci in Contatto",
      en: "Let's Get in Touch",
    },
    description: {
      it: "Hai una proposta, un progetto da discutere o vuoi semplicemente scambiare due chiacchiere? Compila il modulo o scrivimi direttamente.",
      en: "Have a proposal, a project in mind, or simply want to connect? Send me a message using the form below or reach out directly.",
    },
    emailLabel: "Email",
    phoneLabel: { it: "Telefono", en: "Phone" },
    locationLabel: { it: "Posizione", en: "Location" },
    locationValue: {
      it: "Turi (BA), Italia (Disponibile da remoto)",
      en: "Turi (BA), Italy (Available remotely)",
    },
    cardTitle: {
      it: "Invia un messaggio",
      en: "Send a Message",
    },
    cardDescription: {
      it: "Compila i campi sottostanti. Riceverai un'email automatica di conferma e ti ricontatterò al più presto.",
      en: "Fill out the fields below. You will receive an automated confirmation email, and I will get back to you shortly.",
    },
    fieldFirstName: { it: "Nome *", en: "First Name *" },
    fieldFirstNamePlaceholder: { it: "Mario", en: "John" },
    fieldLastName: { it: "Cognome *", en: "Last Name *" },
    fieldLastNamePlaceholder: { it: "Rossi", en: "Doe" },
    fieldEmail: "Email *",
    fieldEmailPlaceholder: {
      it: "mario@esempio.it",
      en: "john@example.com",
    },
    fieldMessage: { it: "Messaggio *", en: "Message *" },
    fieldMessagePlaceholder: {
      it: "Descrivi brevemente la tua richiesta o proposta...",
      en: "Briefly describe your project, inquiry, or proposal...",
    },
    turnstileError: {
      it: "Errore di caricamento del controllo anti-bot. Ricarica la pagina.",
      en: "Security check failed to load. Please refresh the page.",
    },
    submitting: {
      it: "Invio del messaggio in corso...",
      en: "Sending message...",
    },
    submit: {
      it: "Invia Messaggio",
      en: "Send Message",
    },
    privacyConsentPrefix: {
      it: "Inviando il messaggio accetti il trattamento dei dati personali per la gestione della richiesta. Leggi la",
      en: "By sending this message, you consent to the processing of personal data for handling your inquiry. Read the",
    },
    privacyConsentLinkText: "Privacy Policy",
    successTitle: {
      it: "Messaggio Inviato!",
      en: "Message Sent!",
    },
    successMessage: {
      it: "Grazie per avermi scritto! Ho preso in carico la tua richiesta e ti risponderò a breve all'indirizzo",
      en: "Thank you for reaching out! Your message has been received, and I will respond to you shortly at",
    },
    sendAnother: {
      it: "Invia un altro messaggio",
      en: "Send Another Message",
    },
    genericError: {
      it: "Impossibile inviare il messaggio. Riprova.",
      en: "Unable to send the message. Please try again.",
    },
  },
  footer: {
    creatorTagline: {
      it: "Realizzato con Next.js e Tailwind CSS.",
      en: "Built with Next.js and Tailwind CSS.",
    },
    privacyPolicy: {
      it: "Informativa sulla Privacy",
      en: "Privacy Policy",
    },
  },
  privacy: {
    backToPortfolio: {
      it: "Torna al Portfolio",
      en: "Back to Portfolio",
    },
    title: {
      it: "Informativa sulla Privacy",
      en: "Privacy Policy",
    },
    lastUpdated: {
      it: "Ultimo aggiornamento: Settembre 2026 • Conforme al Regolamento Generale sulla Protezione dei Dati (GDPR - UE 2016/679)",
      en: "Last updated: September 2026 • Compliant with General Data Protection Regulation (GDPR - EU 2016/679)",
    },
    section1Title: {
      it: "1. Titolare del Trattamento",
      en: "1. Data Controller",
    },
    section1Content: {
      it: `Il Titolare del trattamento dei dati è Gabriele Farigu, sviluppatore web e software con sede a Turi (BA), Italia. Per qualsiasi chiarimento o per l'esercizio dei tuoi diritti in materia di privacy, puoi scrivermi all'indirizzo: ${AUTHOR_EMAIL}.`,
      en: `The Data Controller is Gabriele Farigu, web and software developer based in Turi (BA), Italy. For any inquiries or to exercise your privacy rights, you can reach me at: ${AUTHOR_EMAIL}.`,
    },
    section2Title: {
      it: "2. Tipologia di Dati Trattati",
      en: "2. Categories of Data Processed",
    },
    section2ProvidedDataTitle: {
      it: "Dati forniti volontariamente dall'utente:",
      en: "Data voluntarily provided by the user:",
    },
    section2ProvidedDataContent: {
      it: "Compilando il modulo di contatto presente sul sito, vengono raccolti nome, cognome, indirizzo email e il testo del messaggio inviato.",
      en: "When submitting the contact form on this website, your first name, last name, email address, and message content are collected.",
    },
    section2MetricsTitle: {
      it: "Dati di navigazione e metriche:",
      en: "Browsing data and metrics:",
    },
    section2MetricsContent: {
      it: "Il sito utilizza @vercel/analytics e @vercel/speed-insights, strumenti di analisi tecnica e misurazione delle prestazioni web nativamente cookieless. Non registrano indirizzi IP completi né tracciano gli utenti su altri siti web.",
      en: "This website uses @vercel/analytics and @vercel/speed-insights, web performance measurement tools that are natively cookieless. They do not store full IP addresses or track users across external sites.",
    },
    section2CookieTitle: "Cookie Policy:",
    section2CookieContent: {
      it: "Questo sito non fa uso di cookie di profilazione o pubblicitari. Non è pertanto necessario alcun banner di consenso preventivo ai sensi delle linee guida del Garante Privacy.",
      en: "This site does not use profiling or advertising cookies. Consequently, no prior cookie consent banner is required under European privacy directives.",
    },
    section3Title: {
      it: "3. Finalità e Base Giuridica del Trattamento",
      en: "3. Purposes and Legal Basis of Processing",
    },
    section3Content1: {
      it: "I dati forniti tramite il modulo di contatto vengono trattati esclusivamente per rispondere alla tua richiesta di informazione, proposta di lavoro o collaborazione tecnica.",
      en: "Data submitted via the contact form is processed exclusively to respond to your inquiry, business proposal, or technical collaboration request.",
    },
    section3Content2: {
      it: "La base giuridica del trattamento è l'esecuzione di misure precontrattuali adottate su richiesta dell'interessato (Art. 6, par. 1, lett. b GDPR). I tuoi dati non verranno ceduti a terzi per finalità commerciali né utilizzati per l'invio di newsletter non richieste.",
      en: "The legal basis for processing is the performance of pre-contractual measures taken at the request of the data subject (Art. 6(1)(b) GDPR). Your data will never be sold to third parties or used for unsolicited marketing.",
    },
    section4Title: {
      it: "4. Fornitori di Servizi Tecnologici (Sub-responsabili)",
      en: "4. Third-Party Service Providers (Sub-processors)",
    },
    section4Intro: {
      it: "Per garantire il funzionamento, l'affidabilità e la sicurezza dell'applicazione web, vengono impiegati i seguenti servizi terzi:",
      en: "To ensure high availability, security, and performance, the following third-party infrastructure services are utilized:",
    },
    section4Vercel: {
      it: "Vercel Inc.: Infrastruttura cloud di hosting, edge network e analisi prestazionale aggregata.",
      en: "Vercel Inc.: Cloud hosting infrastructure, edge network, and aggregated performance metrics.",
    },
    section4Supabase: {
      it: "Supabase Inc.: Gestione del database cloud PostgreSQL e storage delle risorse multimediali.",
      en: "Supabase Inc.: Cloud PostgreSQL database management and multimedia asset storage.",
    },
    section4Resend: {
      it: "Resend Inc.: Servizio di recapito email transazionali per l'inoltro dei messaggi e la conferma automatica.",
      en: "Resend Inc.: Transactional email delivery service for message routing and automated receipts.",
    },
    section4Cloudflare: {
      it: "Cloudflare Inc. (Turnstile): Sistema di protezione intelligente anti-bot e anti-spam a salvaguardia del modulo contatti, privo di profilazione pubblicitaria.",
      en: "Cloudflare Inc. (Turnstile): Privacy-conscious anti-bot verification securing the contact form without advertising profiling.",
    },
    section5Title: {
      it: "5. Conservazione dei Dati",
      en: "5. Data Retention",
    },
    section5Content: {
      it: "I dati scambiati tramite corrispondenza email saranno conservati per il tempo strettamente necessario a gestire la comunicazione o l'eventuale rapporto professionale instaurato, e comunque non oltre i termini di legge.",
      en: "Data exchanged via email correspondence is retained strictly for the duration necessary to handle the communication or resulting business relationship, and in no event beyond statutory limitation periods.",
    },
    section6Title: {
      it: "6. Diritti dell'Interessato",
      en: "6. Data Subject Rights",
    },
    section6Intro: {
      it: "Ai sensi degli articoli 15-22 del GDPR, hai il diritto in qualunque momento di:",
      en: "Under Articles 15–22 of the GDPR, you have the right at any time to:",
    },
    section6Right1: {
      it: "Richiedere la conferma dell'esistenza o meno dei tuoi dati personali.",
      en: "Request confirmation of whether your personal data is being processed.",
    },
    section6Right2: {
      it: "Accedere ai tuoi dati e richiederne la rettifica o l'aggiornamento.",
      en: "Access your personal data and request its rectification or updating.",
    },
    section6Right3: {
      it: "Richiederne la cancellazione immediata (diritto all'oblio).",
      en: "Request the immediate erasure of your data (right to be forgotten).",
    },
    section6Right4: {
      it: "Opporsi al trattamento o richiederne la limitazione.",
      en: "Object to processing or request restriction of processing.",
    },
    section6ContactText: {
      it: `Per esercitare tali diritti è sufficiente inviare un'email a ${AUTHOR_EMAIL}.`,
      en: `To exercise any of these rights, simply send an email to ${AUTHOR_EMAIL}.`,
    },
    backToHome: {
      it: "Torna alla Home",
      en: "Back to Home",
    },
    allRightsReserved: {
      it: "Tutti i diritti riservati.",
      en: "All rights reserved.",
    },
  },
  notFound: {
    badge: { it: "Errore 404", en: "Error 404" },
    title: { it: "Pagina Non Trovata", en: "Page Not Found" },
    description: {
      it: "L'indirizzo a cui stai tentando di accedere non esiste, è stato rimosso o rinominato.",
      en: "The page you are looking for does not exist, has been removed, or has been renamed.",
    },
    backHome: { it: "Torna alla Home", en: "Back to Home" },
    contactMe: { it: "Contattami", en: "Contact Me" },
  },
  languageSwitcher: {
    selectLanguage: {
      it: "Seleziona lingua",
      en: "Select language",
    },
    currentLanguage: {
      it: "Lingua corrente",
      en: "Current language",
    },
  },
};

function buildDictionary(locale: Locale): Dictionary {
  return {
    meta: {
      title: t(content.meta.title, locale),
      description: t(content.meta.description, locale),
      keywords: [
        AUTHOR_NAME,
        t(content.meta.roleKeyword, locale),
        ...SHARED_KEYWORDS,
        t(content.meta.geoKeyword, locale),
        "Bari",
      ],
      ogTitle: t(content.meta.ogTitle, locale),
      ogDescription: t(content.meta.ogDescription, locale),
      localeCode: t(content.meta.localeCode, locale),
    },
    nav: {
      home: t(content.nav.home, locale),
      skills: t(content.nav.skills, locale),
      journey: t(content.nav.journey, locale),
      projects: t(content.nav.projects, locale),
      contact: t(content.nav.contact, locale),
      contactCta: t(content.nav.contactCta, locale),
      toggleMenu: t(content.nav.toggleMenu, locale),
    },
    hero: {
      badge: t(content.hero.badge, locale),
      name: content.hero.name,
      tagline: t(content.hero.tagline, locale),
      ctaProjects: t(content.hero.ctaProjects, locale),
      ctaContact: t(content.hero.ctaContact, locale),
    },
    skills: {
      badge: t(content.skills.badge, locale),
      title: t(content.skills.title, locale),
      description: t(content.skills.description, locale),
      fallbackList: content.skills.fallbackList.map((skill) => ({
        name: t(skill.name, locale),
        description: t(skill.description, locale),
        icon_name: skill.icon_name,
      })),
    },
    journey: {
      badge: t(content.journey.badge, locale),
      title: t(content.journey.title, locale),
      description: t(content.journey.description, locale),
      presentLabel: t(content.journey.presentLabel, locale),
      detailsLabel: t(content.journey.detailsLabel, locale),
      fallbackList: content.journey.fallbackList.map((item) => ({
        period: t(item.period, locale),
        title: t(item.title, locale),
        institution: t(item.institution, locale),
        description: t(item.description, locale),
        type: item.type,
        isCurrent: item.isCurrent,
        tags: t(item.tags, locale),
        linkLabel: t(item.linkLabel, locale),
        linkUrl: item.linkUrl,
      })),
    },
    portfolio: {
      badge: t(content.portfolio.badge, locale),
      title: t(content.portfolio.title, locale),
      description: t(content.portfolio.description, locale),
      privateRepo: t(content.portfolio.privateRepo, locale),
      codeLabel: t(content.portfolio.codeLabel, locale),
      liveDemo: t(content.portfolio.liveDemo, locale),
      exploreAllGithub: t(content.portfolio.exploreAllGithub, locale),
      previewAltPrefix: t(content.portfolio.previewAltPrefix, locale),
      fallbackList: content.portfolio.fallbackList.map((project) => ({
        title: t(project.title, locale),
        statusBadge: project.statusBadge ? t(project.statusBadge, locale) : undefined,
        description: t(project.description, locale),
        image: project.image,
        tags: [...project.tags],
        github: project.github,
        githubLabel: project.githubLabel ? t(project.githubLabel, locale) : undefined,
        isPrivate: project.isPrivate,
        featured: project.featured,
      })),
    },
    contact: {
      badge: t(content.contact.badge, locale),
      title: t(content.contact.title, locale),
      description: t(content.contact.description, locale),
      emailLabel: t(content.contact.emailLabel, locale),
      phoneLabel: t(content.contact.phoneLabel, locale),
      locationLabel: t(content.contact.locationLabel, locale),
      locationValue: t(content.contact.locationValue, locale),
      cardTitle: t(content.contact.cardTitle, locale),
      cardDescription: t(content.contact.cardDescription, locale),
      fieldFirstName: t(content.contact.fieldFirstName, locale),
      fieldFirstNamePlaceholder: t(content.contact.fieldFirstNamePlaceholder, locale),
      fieldLastName: t(content.contact.fieldLastName, locale),
      fieldLastNamePlaceholder: t(content.contact.fieldLastNamePlaceholder, locale),
      fieldEmail: t(content.contact.fieldEmail, locale),
      fieldEmailPlaceholder: t(content.contact.fieldEmailPlaceholder, locale),
      fieldMessage: t(content.contact.fieldMessage, locale),
      fieldMessagePlaceholder: t(content.contact.fieldMessagePlaceholder, locale),
      turnstileError: t(content.contact.turnstileError, locale),
      submitting: t(content.contact.submitting, locale),
      submit: t(content.contact.submit, locale),
      privacyConsentPrefix: t(content.contact.privacyConsentPrefix, locale),
      privacyConsentLinkText: t(content.contact.privacyConsentLinkText, locale),
      successTitle: t(content.contact.successTitle, locale),
      successMessage: t(content.contact.successMessage, locale),
      sendAnother: t(content.contact.sendAnother, locale),
      genericError: t(content.contact.genericError, locale),
    },
    footer: {
      creatorTagline: t(content.footer.creatorTagline, locale),
      privacyPolicy: t(content.footer.privacyPolicy, locale),
    },
    privacy: {
      backToPortfolio: t(content.privacy.backToPortfolio, locale),
      title: t(content.privacy.title, locale),
      lastUpdated: t(content.privacy.lastUpdated, locale),
      section1Title: t(content.privacy.section1Title, locale),
      section1Content: t(content.privacy.section1Content, locale),
      section2Title: t(content.privacy.section2Title, locale),
      section2ProvidedDataTitle: t(content.privacy.section2ProvidedDataTitle, locale),
      section2ProvidedDataContent: t(content.privacy.section2ProvidedDataContent, locale),
      section2MetricsTitle: t(content.privacy.section2MetricsTitle, locale),
      section2MetricsContent: t(content.privacy.section2MetricsContent, locale),
      section2CookieTitle: t(content.privacy.section2CookieTitle, locale),
      section2CookieContent: t(content.privacy.section2CookieContent, locale),
      section3Title: t(content.privacy.section3Title, locale),
      section3Content1: t(content.privacy.section3Content1, locale),
      section3Content2: t(content.privacy.section3Content2, locale),
      section4Title: t(content.privacy.section4Title, locale),
      section4Intro: t(content.privacy.section4Intro, locale),
      section4Vercel: t(content.privacy.section4Vercel, locale),
      section4Supabase: t(content.privacy.section4Supabase, locale),
      section4Resend: t(content.privacy.section4Resend, locale),
      section4Cloudflare: t(content.privacy.section4Cloudflare, locale),
      section5Title: t(content.privacy.section5Title, locale),
      section5Content: t(content.privacy.section5Content, locale),
      section6Title: t(content.privacy.section6Title, locale),
      section6Intro: t(content.privacy.section6Intro, locale),
      section6Right1: t(content.privacy.section6Right1, locale),
      section6Right2: t(content.privacy.section6Right2, locale),
      section6Right3: t(content.privacy.section6Right3, locale),
      section6Right4: t(content.privacy.section6Right4, locale),
      section6ContactText: t(content.privacy.section6ContactText, locale),
      backToHome: t(content.privacy.backToHome, locale),
      allRightsReserved: t(content.privacy.allRightsReserved, locale),
    },
    notFound: {
      badge: t(content.notFound.badge, locale),
      title: t(content.notFound.title, locale),
      description: t(content.notFound.description, locale),
      backHome: t(content.notFound.backHome, locale),
      contactMe: t(content.notFound.contactMe, locale),
    },
    languageSwitcher: {
      selectLanguage: t(content.languageSwitcher.selectLanguage, locale),
      currentLanguage: t(content.languageSwitcher.currentLanguage, locale),
    },
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  it: buildDictionary("it"),
  en: buildDictionary("en"),
};

export function getDictionary(locale?: string): Dictionary {
  if (locale === "en") {
    return dictionaries.en;
  }
  return dictionaries[defaultLocale];
}
