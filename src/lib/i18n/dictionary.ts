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
    viewCaseStudy: {
      it: "Leggi caso di studio ➔",
      en: "Read Case Study ➔",
    },
    fallbackList: [
      {
        slug: "impresa-edile",
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
        slug: "edubook",
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
        slug: "qr-code-creator",
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
  caseStudy: {
    backToProjects: {
      it: "Torna ai Progetti",
      en: "Back to Projects",
    },
    overviewTitle: {
      it: "La Genesi del Progetto (Perché è nato)",
      en: "Project Origins (Why it was built)",
    },
    challengesTitle: {
      it: "Sfide Tecniche & Soluzioni Ingegneristiche",
      en: "Technical Challenges & Engineering Solutions",
    },
    architectureTitle: {
      it: "Architettura & Scelte Tecniche",
      en: "Architecture & Technical Decisions",
    },
    featuresTitle: {
      it: "Funzionalità Chiave",
      en: "Key Features",
    },
    resultsTitle: {
      it: "Risultati & Impatto",
      en: "Results & Impact",
    },
    stackTitle: {
      it: "Stack Tecnologico & Strumenti",
      en: "Tech Stack & Tooling",
    },
    linksTitle: {
      it: "Risorse & Link",
      en: "Resources & Links",
    },
    roleLabel: {
      it: "Ruolo",
      en: "Role",
    },
    clientLabel: {
      it: "Committente / Ambito",
      en: "Client / Context",
    },
    periodLabel: {
      it: "Anno / Cronologia",
      en: "Year / Timeline",
    },
    prevProject: {
      it: "Progetto Precedente",
      en: "Previous Project",
    },
    nextProject: {
      it: "Prossimo Progetto",
      en: "Next Project",
    },
    allProjects: {
      it: "Tutti i Progetti",
      en: "All Projects",
    },
    ctaBadge: {
      it: "Inizia un Progetto",
      en: "Start a Project",
    },
    ctaTitle: {
      it: "Hai un'idea o una sfida tecnica da sviluppare?",
      en: "Have an idea or a technical challenge to solve?",
    },
    ctaDescription: {
      it: "Progetto e sviluppo applicazioni web moderne, piattaforme scalabili e architetture cloud su misura per le tue esigenze.",
      en: "I architect and engineer modern web applications, scalable platforms, and bespoke cloud workflows tailored to your requirements.",
    },
    ctaButton: {
      it: "Richiedi un Preventivo o Info",
      en: "Request a Quote or Consultation",
    },
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
  faq: {
    badge: {
      it: "FAQ",
      en: "FAQ",
    },
    title: {
      it: "Domande Frequenti",
      en: "Frequently Asked Questions",
    },
    description: {
      it: "Risposte rapide e trasparenti sui processi di lavoro, tempi, costi e gestione dei progetti.",
      en: "Clear, straightforward answers about my workflow, timelines, hosting, and project delivery.",
    },
    items: [
      {
        question: {
          it: "Cosa serve per iniziare a realizzare un progetto o sito web?",
          en: "What is needed to start building a project or website?",
        },
        answer: {
          it: "Basta un'idea chiara dell'obiettivo che vuoi raggiungere. Se hai già testi, logo o riferimenti grafici bene, altrimenti definiamo insieme la struttura, le funzionalità necessarie e il design prima di scrivere una sola riga di codice.",
          en: "All you need is a clear idea of your goal. If you already have copy, logos, or design references, that's great! Otherwise, we define the structure, essential features, and interface together before writing a single line of code.",
        },
      },
      {
        question: {
          it: "Quanto tempo ci vuole per sviluppare una web app o un sito web?",
          en: "How long does it take to develop a web app or website?",
        },
        answer: {
          it: "I tempi dipendono dalla complessità: per un sito vetrina o portfolio ad alte prestazioni servono solitamente 1-2 settimane. Per applicazioni web con autenticazione, database e logiche personalizzate (come gestionali o prenotazioni) i tempi medi sono di 3-5 settimane con aggiornamenti costanti.",
          en: "Timelines depend on project scope: a modern showcase site or high-performance portfolio typically takes 1-2 weeks. Full web applications with authentication, databases, and custom logic (like booking systems or admin dashboards) usually take 3-5 weeks with regular progress updates.",
        },
      },
      {
        question: {
          it: "Chi gestisce il dominio, l'hosting e i costi mensili dell'infrastruttura?",
          en: "Who manages the domain, hosting, and monthly infrastructure costs?",
        },
        answer: {
          it: "Ti guido passo passo nella registrazione del dominio a tuo nome. Per l'hosting e il database impiego infrastrutture cloud moderne (come Vercel e Supabase) che nella maggior parte dei progetti rientrano nei piani gratuiti, garantendo zero costi fissi all'avvio.",
          en: "I guide you step-by-step in registering the domain in your name. For hosting and database, I leverage modern cloud infrastructure (such as Vercel and Supabase), which for most initial projects operate within generous free tiers with zero recurring fees.",
        },
      },
    ],
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
  quote: {
    meta: {
      title: {
        it: "Configuratore Preventivo Online | Gabriele Farigu",
        en: "Online Quote Configurator | Gabriele Farigu",
      },
      description: {
        it: "Configura la tua soluzione web ideale in 4 semplici passaggi: web app, siti vetrina, sistemi di prenotazione o restyling. Ricevi una stima trasparente e su misura.",
        en: "Configure your ideal web solution in 4 easy steps: web apps, showcase sites, booking systems, or redesigns. Get a transparent, tailored quote.",
      },
      keywords: {
        it: [
          "preventivo sito web",
          "calcolo costo web app",
          "sviluppatore software preventivo",
          "costo sito vetrina Next.js",
          "sviluppo web app personalizzata",
        ],
        en: [
          "website quote calculator",
          "web app cost estimate",
          "hire software developer quote",
          "custom Next.js website pricing",
          "web development inquiry",
        ],
      },
    },
    badge: {
      it: "Preventivo Rapido",
      en: "Quick Estimate",
    },
    title: {
      it: "Configura il Tuo Progetto",
      en: "Configure Your Project",
    },
    subtitle: {
      it: "Rispondi a poche domande guidate per definire la tua idea. Riceverai un'analisi di fattibilità e un preventivo trasparente entro 24 ore.",
      en: "Answer a few guided questions to shape your idea. You will receive a feasibility analysis and a transparent quote within 24 hours.",
    },
    stepIndicator: {
      it: "Step {current} di {total}",
      en: "Step {current} of {total}",
    },
    nextButton: {
      it: "Continua ➔",
      en: "Continue ➔",
    },
    backButton: {
      it: "Indietro",
      en: "Back",
    },
    submitButton: {
      it: "Invia Richiesta Preventivo",
      en: "Submit Quote Request",
    },
    submitting: {
      it: "Invio in corso...",
      en: "Sending request...",
    },
    turnstileError: {
      it: "Verifica di sicurezza non riuscita. Riprova.",
      en: "Security verification failed. Please try again.",
    },
    genericError: {
      it: "Si è verificato un errore durante l'invio. Riprova tra poco.",
      en: "An error occurred while sending. Please try again shortly.",
    },
    step1: {
      title: {
        it: "Che tipo di soluzione desideri realizzare?",
        en: "What type of solution do you want to build?",
      },
      subtitle: {
        it: "Seleziona la categoria che meglio descrive il tuo obiettivo principale.",
        en: "Select the category that best matches your primary goal.",
      },
      types: {
        webApp: {
          title: {
            it: "Web App / Piattaforma",
            en: "Web App / Platform",
          },
          description: {
            it: "Applicazione interattiva con logiche su misura, dashboard, login utenti e gestione dati.",
            en: "Interactive application with custom logic, dashboards, user accounts, and data management.",
          },
        },
        showcaseSite: {
          title: {
            it: "Sito Vetrina ad Alte Prestazioni",
            en: "High-Performance Showcase Site",
          },
          description: {
            it: "Sito moderno, ultraveloce e ottimizzato per SEO e lead generation aziendale.",
            en: "Modern, ultra-fast website optimized for SEO, conversions, and brand identity.",
          },
        },
        bookingSystem: {
          title: {
            it: "Sistema di Prenotazione / Calendario",
            en: "Booking & Scheduling System",
          },
          description: {
            it: "Piattaforma per gestione slot, prenotazioni appuntamenti, lezioni o servizi in tempo reale.",
            en: "Platform for real-time slot management, appointment booking, lessons, or services.",
          },
        },
        restylingSpeed: {
          title: {
            it: "Restyling & Ottimizzazione Velocità",
            en: "Redesign & Speed Optimization",
          },
          description: {
            it: "Modernizzazione grafica di un sito esistente, miglioramento Core Web Vitals e accessibilità.",
            en: "Visual redesign of an existing site, Core Web Vitals speed boost, and accessibility audit.",
          },
        },
      },
    },
    step2: {
      title: {
        it: "Quali funzionalità chiave ti servono?",
        en: "Which key features do you need?",
      },
      subtitle: {
        it: "Puoi selezionare una o più opzioni in base alle tue esigenze.",
        en: "You can select one or more options based on your requirements.",
      },
      features: {
        auth: {
          title: {
            it: "Area Riservata & Utenti",
            en: "User Accounts & Protected Area",
          },
          description: {
            it: "Registrazione, login sicuro, ruoli e permessi dedicati.",
            en: "Secure registration, login, role-based permissions.",
          },
        },
        database: {
          title: {
            it: "Database Cloud & Storico Dati",
            en: "Cloud Database & Records",
          },
          description: {
            it: "Salvataggio sicuro di schede, ordini, anagrafiche e report su Supabase.",
            en: "Reliable storage for records, orders, and customer data on Supabase.",
          },
        },
        payments: {
          title: {
            it: "Calcolatore Prezzi / Pagamenti Online",
            en: "Price Calculator / Online Payments",
          },
          description: {
            it: "Stripe, PayPal, preventivatori automatici o checkout per servizi.",
            en: "Stripe, PayPal, automated price estimation, or digital checkout.",
          },
        },
        maps: {
          title: {
            it: "Mappe Interattive & Geocoding",
            en: "Interactive Maps & Geocoding",
          },
          description: {
            it: "Mappe dinamiche Leaflet, calcolo distanze e punti di interesse.",
            en: "Leaflet dynamic maps, radius calculation, and points of interest.",
          },
        },
        multilang: {
          title: {
            it: "Supporto Multilingua (i18n)",
            en: "Multilingual Support (i18n)",
          },
          description: {
            it: "Navigazione e indicizzazione separata in Italiano, Inglese o altre lingue.",
            en: "Separate routing and SEO indexing in Italian, English, or other languages.",
          },
        },
        cms: {
          title: {
            it: "Pannello di Controllo Admin / CMS",
            en: "Admin Dashboard / Custom CMS",
          },
          description: {
            it: "Interfaccia riservata per creare, modificare o eliminare contenuti in autonomia.",
            en: "Private interface to independently create, update, or publish content.",
          },
        },
      },
    },
    step3: {
      title: {
        it: "Tempistiche, Materiali e Budget",
        en: "Timeline, Content & Budget",
      },
      subtitle: {
        it: "Aiutami a capire il contesto per fornirti una stima precisa e realistica.",
        en: "Help me understand the scope to give you a precise, realistic estimate.",
      },
      timelineLabel: {
        it: "Quando vorresti lanciare il progetto?",
        en: "When would you like to launch?",
      },
      timelineOptions: {
        urgent: {
          title: { it: "Urgente (< 1 mese)", en: "Urgent (< 1 month)" },
          description: {
            it: "Ho una scadenza ravvicinata e prioritaria.",
            en: "I have an imminent, high-priority deadline.",
          },
        },
        standard: {
          title: { it: "Standard (1 - 2 mesi)", en: "Standard (1 - 2 months)" },
          description: {
            it: "Pianificazione ordinaria con rilasci graduali.",
            en: "Standard schedule with milestone releases.",
          },
        },
        flexible: {
          title: { it: "Flessibile / Senza fretta", en: "Flexible / No rush" },
          description: {
            it: "Priorità alla massima qualità e rifinitura.",
            en: "Focus on utmost quality and refinement.",
          },
        },
      },
      materialsLabel: {
        it: "Hai già testi, logo o grafica pronti?",
        en: "Do you already have copy, branding, or designs?",
      },
      materialsOptions: {
        ready: {
          title: { it: "Sì, tutto pronto", en: "Yes, ready to go" },
          description: {
            it: "Ho testi, immagini e linee guida definite.",
            en: "I have copy, imagery, and brand guidelines.",
          },
        },
        inProgress: {
          title: { it: "In fase di lavorazione", en: "In progress" },
          description: {
            it: "Ho una bozza da perfezionare insieme.",
            en: "I have rough drafts we can refine together.",
          },
        },
        none: {
          title: { it: "Da definire da zero", en: "Need to create from scratch" },
          description: {
            it: "Mi serve supporto anche sulla struttura dei contenuti.",
            en: "I need guidance on copy and content structure too.",
          },
        },
      },
      budgetLabel: {
        it: "Fascia di budget indicativa (opzionale)",
        en: "Approximate budget range (optional)",
      },
      budgetOptions: {
        tier1: {
          title: { it: "< €1.500", en: "< €1,500" },
          description: {
            it: "Landing page o restyling mirato.",
            en: "Landing page or targeted redesign.",
          },
        },
        tier2: {
          title: { it: "€1.500 - €3.000", en: "€1,500 - €3,000" },
          description: {
            it: "Sito vetrina avanzato o MVP di servizio.",
            en: "Advanced showcase site or service MVP.",
          },
        },
        tier3: {
          title: { it: "€3.000 - €6.000", en: "€3,000 - €6,000" },
          description: {
            it: "Web App completa, dashboard o gestionale.",
            en: "Full web app, dashboard, or internal tool.",
          },
        },
        tier4: {
          title: { it: "€6.000+", en: "€6,000+" },
          description: {
            it: "Architettura complessa multi-modulo su misura.",
            en: "Complex multi-module custom architecture.",
          },
        },
        undecided: {
          title: { it: "Da valutare insieme", en: "To be evaluated together" },
          description: {
            it: "Preferisco confrontarmi prima sulle specifiche.",
            en: "Prefer to discuss specifications first.",
          },
        },
      },
    },
    step4: {
      title: {
        it: "Dove posso ricontattarti?",
        en: "Where can I get back to you?",
      },
      subtitle: {
        it: "Inserisci i tuoi recapiti per ricevere il riepilogo e la stima dettagliata.",
        en: "Enter your contact details to receive the recap and detailed estimate.",
      },
      firstNameLabel: { it: "Nome", en: "First Name" },
      firstNamePlaceholder: { it: "Mario", en: "John" },
      lastNameLabel: { it: "Cognome", en: "Last Name" },
      lastNamePlaceholder: { it: "Rossi", en: "Doe" },
      emailLabel: { it: "Email aziendale o personale", en: "Email address" },
      emailPlaceholder: { it: "mario.rossi@azienda.it", en: "john.doe@company.com" },
      phoneLabel: { it: "Telefono (opzionale)", en: "Phone (optional)" },
      phonePlaceholder: { it: "+39 333 1234567", en: "+1 (555) 0123" },
      notesLabel: {
        it: "Note aggiuntive o link di riferimento (opzionale)",
        en: "Additional notes or reference links (optional)",
      },
      notesPlaceholder: {
        it: "Descrivi eventuali dettagli specifici, siti web che ti piacciono o obiettivi particolari...",
        en: "Describe any specific details, websites you like, or special goals...",
      },
      privacyNotice: {
        it: "I tuoi dati saranno trattati nel rispetto della privacy e utilizzati esclusivamente per ricontattarti in merito a questo preventivo.",
        en: "Your data will be processed confidentially and used solely to respond regarding this quote request.",
      },
    },
    success: {
      title: {
        it: "Richiesta Preventivo Inviata con Successo!",
        en: "Quote Request Sent Successfully!",
      },
      message: {
        it: "Grazie per aver dedicato del tempo a configurare il tuo progetto. Ho ricevuto tutti i dettagli e ti risponderò con una proposta chiara entro 24 ore.",
        en: "Thank you for taking the time to configure your project. I have received all the details and will get back to you with a clear proposal within 24 hours.",
      },
      recapTitle: {
        it: "Riepilogo delle tue scelte:",
        en: "Summary of your selections:",
      },
      backHome: {
        it: "Torna alla Home",
        en: "Back to Home",
      },
    },
    ctaBanner: {
      title: {
        it: "Vuoi una stima guidata per il tuo progetto?",
        en: "Looking for a guided project estimate?",
      },
      description: {
        it: "Configura la tua soluzione ideale in 4 rapidi passaggi per ricevere una proposta trasparente e personalizzata.",
        en: "Configure your ideal solution in 4 quick steps to receive a transparent, tailored proposal.",
      },
      button: {
        it: "Calcola Preventivo Online ➔",
        en: "Calculate Quote Online ➔",
      },
    },
  },
  testimonials: {
    badge: {
      it: "Dicono di me",
      en: "Testimonials",
    },
    title: {
      it: "La fiducia si costruisce con i risultati",
      en: "Trust is built on real outcomes",
    },
    description: {
      it: "Feedback e testimonianze di clienti e colleghi con cui ho sviluppato progetti e soluzioni digitali.",
      en: "Feedback and reviews from clients and colleagues I've collaborated with on digital projects.",
    },
    verifiedReview: {
      it: "Recensione Verificata",
      en: "Verified Review",
    },
    viewProject: {
      it: "Vedi caso di studio",
      en: "View case study",
    },
    swipeHint: {
      it: "Scorri per leggere le altre recensioni ➔",
      en: "Swipe to read more reviews ➔",
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
      viewCaseStudy: t(content.portfolio.viewCaseStudy, locale),
      fallbackList: content.portfolio.fallbackList.map((project) => ({
        slug: project.slug,
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
    caseStudy: {
      backToProjects: t(content.caseStudy.backToProjects, locale),
      overviewTitle: t(content.caseStudy.overviewTitle, locale),
      challengesTitle: t(content.caseStudy.challengesTitle, locale),
      architectureTitle: t(content.caseStudy.architectureTitle, locale),
      featuresTitle: t(content.caseStudy.featuresTitle, locale),
      resultsTitle: t(content.caseStudy.resultsTitle, locale),
      stackTitle: t(content.caseStudy.stackTitle, locale),
      linksTitle: t(content.caseStudy.linksTitle, locale),
      roleLabel: t(content.caseStudy.roleLabel, locale),
      clientLabel: t(content.caseStudy.clientLabel, locale),
      periodLabel: t(content.caseStudy.periodLabel, locale),
      prevProject: t(content.caseStudy.prevProject, locale),
      nextProject: t(content.caseStudy.nextProject, locale),
      allProjects: t(content.caseStudy.allProjects, locale),
      ctaBadge: t(content.caseStudy.ctaBadge, locale),
      ctaTitle: t(content.caseStudy.ctaTitle, locale),
      ctaDescription: t(content.caseStudy.ctaDescription, locale),
      ctaButton: t(content.caseStudy.ctaButton, locale),
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
    faq: {
      badge: t(content.faq.badge, locale),
      title: t(content.faq.title, locale),
      description: t(content.faq.description, locale),
      items: content.faq.items.map((item) => ({
        question: t(item.question, locale),
        answer: t(item.answer, locale),
      })),
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
    quote: {
      meta: {
        title: t(content.quote.meta.title, locale),
        description: t(content.quote.meta.description, locale),
        keywords: t(content.quote.meta.keywords, locale),
      },
      badge: t(content.quote.badge, locale),
      title: t(content.quote.title, locale),
      subtitle: t(content.quote.subtitle, locale),
      stepIndicator: t(content.quote.stepIndicator, locale),
      nextButton: t(content.quote.nextButton, locale),
      backButton: t(content.quote.backButton, locale),
      submitButton: t(content.quote.submitButton, locale),
      submitting: t(content.quote.submitting, locale),
      turnstileError: t(content.quote.turnstileError, locale),
      genericError: t(content.quote.genericError, locale),
      step1: {
        title: t(content.quote.step1.title, locale),
        subtitle: t(content.quote.step1.subtitle, locale),
        types: {
          webApp: {
            title: t(content.quote.step1.types.webApp.title, locale),
            description: t(content.quote.step1.types.webApp.description, locale),
          },
          showcaseSite: {
            title: t(content.quote.step1.types.showcaseSite.title, locale),
            description: t(content.quote.step1.types.showcaseSite.description, locale),
          },
          bookingSystem: {
            title: t(content.quote.step1.types.bookingSystem.title, locale),
            description: t(content.quote.step1.types.bookingSystem.description, locale),
          },
          restylingSpeed: {
            title: t(content.quote.step1.types.restylingSpeed.title, locale),
            description: t(content.quote.step1.types.restylingSpeed.description, locale),
          },
        },
      },
      step2: {
        title: t(content.quote.step2.title, locale),
        subtitle: t(content.quote.step2.subtitle, locale),
        features: {
          auth: {
            title: t(content.quote.step2.features.auth.title, locale),
            description: t(content.quote.step2.features.auth.description, locale),
          },
          database: {
            title: t(content.quote.step2.features.database.title, locale),
            description: t(content.quote.step2.features.database.description, locale),
          },
          payments: {
            title: t(content.quote.step2.features.payments.title, locale),
            description: t(content.quote.step2.features.payments.description, locale),
          },
          maps: {
            title: t(content.quote.step2.features.maps.title, locale),
            description: t(content.quote.step2.features.maps.description, locale),
          },
          multilang: {
            title: t(content.quote.step2.features.multilang.title, locale),
            description: t(content.quote.step2.features.multilang.description, locale),
          },
          cms: {
            title: t(content.quote.step2.features.cms.title, locale),
            description: t(content.quote.step2.features.cms.description, locale),
          },
        },
      },
      step3: {
        title: t(content.quote.step3.title, locale),
        subtitle: t(content.quote.step3.subtitle, locale),
        timelineLabel: t(content.quote.step3.timelineLabel, locale),
        timelineOptions: {
          urgent: {
            title: t(content.quote.step3.timelineOptions.urgent.title, locale),
            description: t(content.quote.step3.timelineOptions.urgent.description, locale),
          },
          standard: {
            title: t(content.quote.step3.timelineOptions.standard.title, locale),
            description: t(content.quote.step3.timelineOptions.standard.description, locale),
          },
          flexible: {
            title: t(content.quote.step3.timelineOptions.flexible.title, locale),
            description: t(content.quote.step3.timelineOptions.flexible.description, locale),
          },
        },
        materialsLabel: t(content.quote.step3.materialsLabel, locale),
        materialsOptions: {
          ready: {
            title: t(content.quote.step3.materialsOptions.ready.title, locale),
            description: t(content.quote.step3.materialsOptions.ready.description, locale),
          },
          inProgress: {
            title: t(content.quote.step3.materialsOptions.inProgress.title, locale),
            description: t(content.quote.step3.materialsOptions.inProgress.description, locale),
          },
          none: {
            title: t(content.quote.step3.materialsOptions.none.title, locale),
            description: t(content.quote.step3.materialsOptions.none.description, locale),
          },
        },
        budgetLabel: t(content.quote.step3.budgetLabel, locale),
        budgetOptions: {
          tier1: {
            title: t(content.quote.step3.budgetOptions.tier1.title, locale),
            description: t(content.quote.step3.budgetOptions.tier1.description, locale),
          },
          tier2: {
            title: t(content.quote.step3.budgetOptions.tier2.title, locale),
            description: t(content.quote.step3.budgetOptions.tier2.description, locale),
          },
          tier3: {
            title: t(content.quote.step3.budgetOptions.tier3.title, locale),
            description: t(content.quote.step3.budgetOptions.tier3.description, locale),
          },
          tier4: {
            title: t(content.quote.step3.budgetOptions.tier4.title, locale),
            description: t(content.quote.step3.budgetOptions.tier4.description, locale),
          },
          undecided: {
            title: t(content.quote.step3.budgetOptions.undecided.title, locale),
            description: t(content.quote.step3.budgetOptions.undecided.description, locale),
          },
        },
      },
      step4: {
        title: t(content.quote.step4.title, locale),
        subtitle: t(content.quote.step4.subtitle, locale),
        firstNameLabel: t(content.quote.step4.firstNameLabel, locale),
        firstNamePlaceholder: t(content.quote.step4.firstNamePlaceholder, locale),
        lastNameLabel: t(content.quote.step4.lastNameLabel, locale),
        lastNamePlaceholder: t(content.quote.step4.lastNamePlaceholder, locale),
        emailLabel: t(content.quote.step4.emailLabel, locale),
        emailPlaceholder: t(content.quote.step4.emailPlaceholder, locale),
        phoneLabel: t(content.quote.step4.phoneLabel, locale),
        phonePlaceholder: t(content.quote.step4.phonePlaceholder, locale),
        notesLabel: t(content.quote.step4.notesLabel, locale),
        notesPlaceholder: t(content.quote.step4.notesPlaceholder, locale),
        privacyNotice: t(content.quote.step4.privacyNotice, locale),
      },
      success: {
        title: t(content.quote.success.title, locale),
        message: t(content.quote.success.message, locale),
        recapTitle: t(content.quote.success.recapTitle, locale),
        backHome: t(content.quote.success.backHome, locale),
      },
      ctaBanner: {
        title: t(content.quote.ctaBanner.title, locale),
        description: t(content.quote.ctaBanner.description, locale),
        button: t(content.quote.ctaBanner.button, locale),
      },
    },
    testimonials: {
      badge: t(content.testimonials.badge, locale),
      title: t(content.testimonials.title, locale),
      description: t(content.testimonials.description, locale),
      verifiedReview: t(content.testimonials.verifiedReview, locale),
      viewProject: t(content.testimonials.viewProject, locale),
      swipeHint: t(content.testimonials.swipeHint, locale),
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
