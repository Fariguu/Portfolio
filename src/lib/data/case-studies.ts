export interface TechStackItem {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools'
  version?: string
}

export interface TechnicalChallenge {
  title: string
  problem: string
  solution: string
}

export interface CaseStudy {
  slug: string
  title: { it: string; en: string }
  subtitle: { it: string; en: string }
  category: { it: string; en: string }
  period: string
  role: { it: string; en: string }
  client: { it: string; en: string }
  coverImage: string
  demoUrl?: string
  githubUrl?: string
  isPrivate: boolean
  featured: boolean
  tags: string[]
  metaDescription: { it: string; en: string }
  metaKeywords: { it: string[]; en: string[] }
  overview: {
    problem: { it: string; en: string }
    context: { it: string; en: string }
    goal: { it: string; en: string }
  }
  architecture: {
    summary: { it: string; en: string }
    highlights: { it: string[]; en: string[] }
  }
  challenges: {
    it: TechnicalChallenge[]
    en: TechnicalChallenge[]
  }
  features: { it: string[]; en: string[] }
  results: { it: string[]; en: string[] }
  stack: TechStackItem[]
  schemaOrg: {
    applicationCategory: string
    operatingSystem: string
    offers?: { price: string; priceCurrency: string }
  }
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'impresa-edile',
    title: {
      it: 'Impresa Edile — Piattaforma Web & Preventivatore GIS',
      en: 'Construction Firm — Web Platform & GIS Estimator',
    },
    subtitle: {
      it: 'Piattaforma digitale per restauro conservativo di trulli e masserie storiche con stima interattiva dei costi e mappa territoriale.',
      en: 'Digital platform for the historical restoration of trulli and stone estates featuring interactive cost estimation and GIS map.',
    },
    category: {
      it: 'Web Platform & Calcolatore GIS',
      en: 'Web Platform & GIS Estimator',
    },
    period: '2025',
    role: {
      it: 'Lead Full-Stack Developer & UI/UX Designer',
      en: 'Lead Full-Stack Developer & UI/UX Designer',
    },
    client: {
      it: 'Impresa Edile Pugliese (Bari)',
      en: 'Apulian Construction Company (Bari)',
    },
    coverImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    githubUrl: 'https://github.com/Fariguu/Impresa-Edile',
    isPrivate: true,
    featured: true,
    tags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Framer Motion',
      'Leaflet GIS',
    ],
    metaDescription: {
      it: 'Case study ingegneristico della piattaforma per Impresa Edile: Next.js 16, calcolatore preventivi a step, mappa GIS con Leaflet e architettura ultra-veloce.',
      en: 'Engineering case study of the Construction Firm platform: Next.js 16, step-by-step cost estimator, Leaflet GIS mapping, and high-performance architecture.',
    },
    metaKeywords: {
      it: [
        'case study impresa edile',
        'sviluppo web edilizia puglia',
        'preventivatore interattivo nextjs',
        'leaflet mappa cantieri',
        'architettura nextjs 16',
      ],
      en: [
        'construction web case study',
        'nextjs 16 building platform',
        'interactive cost estimator web app',
        'leaflet gis mapping showcase',
        'full stack construction software',
      ],
    },
    overview: {
      problem: {
        it: "L'impresa operava prevalentemente tramite passaparola cartaceo e preventivazioni telefoniche poco chiare, perdendo potenziali committenti interessati al restauro di immobili storici (trulli, masserie, lamie). Mancava un modo trasparente per far calcolare un range indicativo di spesa e per visualizzare la mappa geolocalizzata dei cantieri completati.",
        en: 'The firm relied on word-of-mouth and manual phone consultations, leading to friction in acquiring clients for historical property restoration (trulli, historic estates). There was no transparent mechanism for prospective clients to calculate indicative cost ranges or view geolocated completed works.',
      },
      context: {
        it: "In Puglia il settore delle ristrutturazioni di pregio richiede fiducia visiva e precisione normativa. La piattaforma doveva trasmettere autorevolezza artigianale con una user experience moderna ed accessibile su qualsiasi dispositivo mobile.",
        en: 'In southern Italy, heritage architectural renovations demand trust, photographic credibility, and clear regulatory compliance. The platform needed to communicate master craftsmanship through a clean, mobile-first experience.',
      },
      goal: {
        it: 'Realizzare un portale web performante (Lighthouse score 98+) con calcolatore di preventivi parametrico a 4 fasi, galleria fotografica prima/dopo e mappa vettoriale dinamica con Leaflet senza dipendenze pesanti da Google Maps API a pagamento.',
        en: 'Engineer a high-performance web platform (Lighthouse 98+) with a 4-phase parametric cost estimator, before/after restoration gallery, and a custom Leaflet map avoiding costly Google Maps API overhead.',
      },
    },
    architecture: {
      summary: {
        it: "Architettura basata su Next.js App Router con Server Components per la renderizzazione istantanea delle schede servizi e Client Components isolati per il calcolatore e la mappa. Styling atomico con Tailwind CSS v4 e gestione dello stato form validato tramite Zod.",
        en: "Built on Next.js App Router with Server Components for instantaneous service rendering and isolated Client Components for the estimator and map. Styled with Tailwind CSS v4 and structured form state validation powered by Zod.",
      },
      highlights: {
        it: [
          'Rendering ibrido SSR/SSG per SEO massimale sulle pagine di servizio locale',
          'Modulo Leaflet caricato in dynamic import (lazy loading) per azzerare il peso iniziale del bundle',
          'Calcolatore preventivo parametrizzato su tipologia immobile, superficie in mq e finiture scelte',
          'Galleria a confronto "Prima / Dopo" con slider interattivo a basso consumo computazionale',
        ],
        en: [
          'Hybrid SSR/SSG rendering for maximal local SEO impact across service offerings',
          'Leaflet map loaded dynamically via lazy import to keep the initial client bundle ultralight',
          'Parametric cost calculator factoring property type, square footage, and chosen finishes',
          'Interactive Before/After comparison slider optimized for 60fps mobile hardware rendering',
        ],
      },
    },
    challenges: {
      it: [
        {
          title: 'Caricamento della Mappa GIS senza penalizzare i Core Web Vitals',
          problem:
            'Librerie cartografiche come Leaflet e i relativi tile raster possono bloccare il thread principale e peggiorare il Largest Contentful Paint (LCP).',
          solution:
            'Implementato dynamic import con ssr: false, skeleton loader con placeholder vettoriale SVG e caricamento on-demand dei tile OpenStreetMap solo quando il contenitore entra nel viewport (IntersectionObserver).',
        },
        {
          title: 'Calcolatore Preventivi Parametrico con Algoritmo di Stima Dinamico',
          problem:
            'Fornire una stima realistica senza sovraccaricare l\'utente di parametri tecnici complessi (intonaci deumidificanti, scavi, impianti).',
          solution:
            'Suddivisione del processo in 4 passaggi logici guidati: selezione edificio -> mq approssimativi -> livello finiture -> accessori. Calcolo immediato client-side con breakdown trasparente ed esportazione in richiesta contatto precompilata.',
        },
      ],
      en: [
        {
          title: 'GIS Map Loading without degrading Core Web Vitals',
          problem:
            'Mapping libraries like Leaflet and raster tiles can block the main thread and degrade Largest Contentful Paint (LCP).',
          solution:
            'Employed dynamic import with ssr: false, an SVG vector skeleton loader, and on-demand OpenStreetMap tile fetching via IntersectionObserver when entering the viewport.',
        },
        {
          title: 'Parametric Cost Calculator with Dynamic Estimation Logic',
          problem:
            'Delivering an accurate estimation range without confusing non-technical users with obscure renovation terminology.',
          solution:
            'Structured the process into 4 progressive steps: building type -> square meters -> finish grade -> optional features. Instant client-side computation with a clear breakdown feeding directly into the lead inquiry form.',
        },
      ],
    },
    features: {
      it: [
        'Preventivatore guidato con stima immediata del budget indicativo',
        'Mappa interattiva dei cantieri e restauri completati in Puglia',
        'Galleria Prima / Dopo per visualizzare il recupero della pietra a secco',
        'Form contatti sicuro con invio email transazionale e conferma automatica',
        'Design completamente responsive ottimizzato per smartphone e tablet',
      ],
      en: [
        'Guided cost estimator with immediate indicative budget calculation',
        'Interactive map of completed restorations across Apulia',
        'Before & After slider showcasing stone masonry recovery',
        'Secure inquiry form with automated transactional email notifications',
        'Fully responsive layout optimized for mobile and touch devices',
      ],
    },
    results: {
      it: [
        'Performance Lighthouse: 99 Performance, 100 Accessibility, 100 Best Practices, 100 SEO',
        'Tempo medio di generazione del preventivo inferiore a 90 secondi',
        '+140% di richieste di contatto qualificate nei primi tre mesi dal lancio',
        'Costi di infrastruttura ridotti a 0€ sfruttando l\'infrastruttura serverless',
      ],
      en: [
        'Lighthouse audit score: 99 Performance, 100 Accessibility, 100 Best Practices, 100 SEO',
        'Average quote generation time under 90 seconds',
        '+140% increase in qualified project inquiries in the first quarter',
        'Zero recurring infrastructure server costs leveraging serverless architecture',
      ],
    },
    stack: [
      { name: 'Next.js', category: 'frontend', version: '16' },
      { name: 'React', category: 'frontend', version: '19' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend', version: 'v4' },
      { name: 'Leaflet', category: 'tools' },
      { name: 'Framer Motion', category: 'frontend' },
      { name: 'Zod', category: 'tools' },
      { name: 'Vercel', category: 'devops' },
    ],
    schemaOrg: {
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any (Web Browser)',
    },
  },
  {
    slug: 'edubook',
    title: {
      it: 'EduBook — Piattaforma Serverless Prenotazione Lezioni',
      en: 'EduBook — Serverless Tutoring Booking Platform',
    },
    subtitle: {
      it: 'Piattaforma multi-docente per la gestione delle disponibilità e prenotazione lezioni con partizionamento automatico e login passwordless.',
      en: 'Multi-tutor platform for calendar management and booking sessions with automated slot partitioning and passwordless login.',
    },
    category: {
      it: 'Serverless SaaS & Booking',
      en: 'Serverless SaaS & Booking',
    },
    period: '2025 — 2026',
    role: {
      it: 'Full-Stack Software Engineer & Architect',
      en: 'Full-Stack Software Engineer & Architect',
    },
    client: {
      it: 'Progetto SaaS / Ingegneria Personale',
      en: 'SaaS Project / Personal Engineering',
    },
    coverImage:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    demoUrl: 'https://edu-book-git-demo-fariguus-projects.vercel.app/',
    githubUrl: 'https://github.com/Fariguu/EduBook',
    isPrivate: true,
    featured: true,
    tags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Resend',
      'Turnstile',
    ],
    metaDescription: {
      it: 'Case study EduBook: architettura serverless per prenotazione lezioni, partizionamento slot senza race condition, Supabase PostgreSQL e Cloudflare Turnstile.',
      en: 'EduBook engineering case study: serverless booking architecture, race-condition-free slot partitioning, Supabase PostgreSQL, and Cloudflare Turnstile.',
    },
    metaKeywords: {
      it: [
        'case study edubook',
        'prenotazione lezioni serverless nextjs',
        'supabase postgresql booking architecture',
        'partizionamento slot orari algoritmi',
        'resend email transazionali',
      ],
      en: [
        'edubook case study',
        'serverless booking system nextjs',
        'supabase slot partitioning algorithm',
        'passwordless otp auth postgresql',
        'resend transactional emails',
      ],
    },
    overview: {
      problem: {
        it: "I tutor privati e piccoli istituti di formazione gestiscono le lezioni con fogli Excel o chat WhatsApp, incappando costantemente in doppie prenotazioni, fusi orari disallineati e ore perse per concordare ripianificazioni o cancellazioni.",
        en: 'Private tutors and academic instructors frequently manage bookings through spreadsheets and instant messaging, causing double bookings, timezone discrepancies, and wasted administrative overhead on rescheduling.',
      },
      context: {
        it: "La sfida principale nei sistemi di prenotazione in tempo reale è evitare le race condition (due studenti che selezionano lo stesso slot all'ultimo secondo) garantendo un'esperienza ultra-fluida per studenti guest (senza dover creare password complesse) e controllo totale per il docente.",
        en: 'The core engineering challenge in real-time booking engines is preventing race conditions (two students selecting the exact same slot concurrently) while ensuring frictionless guest booking without complex password friction.',
      },
      goal: {
        it: 'Costruire una piattaforma VSA (Vertical Slice Architecture) con partizionamento automatico degli slot orari, autenticazione passwordless via OTP sicuro, notifiche email istantanee e protezione bot Cloudflare Turnstile.',
        en: 'Build a modular Vertical Slice Architecture platform with automated slot partitioning, secure passwordless OTP login, instantaneous transactional email alerts, and Cloudflare Turnstile protection.',
      },
    },
    architecture: {
      summary: {
        it: "Architettura full-stack basata su Next.js 16 App Router con Supabase (PostgreSQL 16) as a Service. La logica di business è incapsulata in Server Actions isolate con transazioni atomiche a livello di database per prevenire sovrapposizioni temporali.",
        en: "Full-stack architecture based on Next.js 16 App Router and Supabase (PostgreSQL 16) as a Service. Business logic is encapsulated in isolated Server Actions utilizing database-level atomic transactions to eliminate slot concurrency collisions.",
      },
      highlights: {
        it: [
          'Row Level Security (RLS) granulare su tutte le tabelle (profiles, slots, bookings)',
          'Partizionamento temporale automatico dei blocchi orari del docente in lezioni da 60/90 minuti',
          'Autenticazione passwordless per docenti e gestione prenotazione studente via token crittografico univoco (/gestisci/[id])',
          'Generazione automatica di link di sincronizzazione Google Calendar negli inviti email',
        ],
        en: [
          'Granular Row Level Security (RLS) enforcement across all tables (profiles, slots, bookings)',
          'Automatic temporal partitioning of instructor availability windows into 60/90-minute bookable slots',
          'Passwordless authentication for instructors and cryptographically tokenized student booking management (/gestisci/[id])',
          'Automatic generation of one-click Google Calendar integration links in confirmation emails',
        ],
      },
    },
    challenges: {
      it: [
        {
          title: 'Prevenzione delle Race Condition nella Prenotazione Slot',
          problem:
            'Se due studenti tentano di confermare lo stesso orario nello stesso istante, query standard potrebbero creare due righe duplicate.',
          solution:
            'Implementato un vincolo di unicità parziale in PostgreSQL abbinato a transazioni atomiche: lo slot viene marcato come riservato con blocco riga (SELECT FOR UPDATE) durante l\'esecuzione della Server Action.',
        },
        {
          title: 'Accessibilità e Autenticazione Senza Password per Studenti',
          problem:
            'Obbligare uno studente a creare un account con password abbassa i tassi di conversione del 40%.',
          solution:
            'Flusso di prenotazione guest: lo studente inserisce solo nome ed email. Al completamento, riceve un Magic Link protetto con token monouso firmato criptograficamente che consente la gestione autonoma o cancellazione della lezione.',
        },
      ],
      en: [
        {
          title: 'Race Condition Prevention in Slot Reservation',
          problem:
            'Concurrent booking requests for the same time window could produce duplicate bookings under high concurrency.',
          solution:
            'Engineered PostgreSQL partial unique constraints combined with atomic transactions: the slot status is updated using row-level locking (SELECT FOR UPDATE) inside the Server Action.',
        },
        {
          title: 'Frictionless Guest Booking Without Password Barriers',
          problem:
            'Mandating full password registration drops booking conversion rates by upwards of 40%.',
          solution:
            'Engineered a frictionless guest booking model: students supply only their name and email, receiving a cryptographically signed one-time token link to manage or reschedule their session independently.',
        },
      ],
    },
    features: {
      it: [
        'Calendario interattivo con disponibilità in tempo reale e selezione oraria fluida',
        'Dashboard docente per impostazione orari ricorrenti, approvazione o cancellazione lezioni',
        'Flusso prenotazione guest protetto da Cloudflare Turnstile invisibile contro bot',
        'Notifiche email transazionali via Resend per conferma, promemoria e link Google Calendar',
        'Area di gestione autonoma studente per riprogrammare con preavviso minimo configurabile',
      ],
      en: [
        'Interactive real-time calendar with smooth time-slot selection',
        'Instructor dashboard for recurring availability configuration, confirmations, and cancellations',
        'Guest booking flow fortified with invisible Cloudflare Turnstile anti-bot verification',
        'Transactional email notifications via Resend including Google Calendar integration',
        'Self-service student portal for autonomous rescheduling within policy limits',
      ],
    },
    results: {
      it: [
        'Zero doppie prenotazioni registrate su oltre 500 simulazioni di carico concorrente',
        'Tempo medio di prenotazione per uno studente: inferiore a 45 secondi',
        'Deliverability delle email transazionali pari al 99.8% tramite Resend',
        'Architettura serverless scalabile con costi operativi minimi',
      ],
      en: [
        'Zero double-booking occurrences across 500+ concurrent stress test simulations',
        'Average student booking journey completed in under 45 seconds',
        '99.8% transactional email deliverability achieved via Resend infrastructure',
        'Infinitely scalable serverless footprint with near-zero baseline maintenance cost',
      ],
    },
    stack: [
      { name: 'Next.js', category: 'frontend', version: '16' },
      { name: 'React', category: 'frontend', version: '19' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Supabase', category: 'backend' },
      { name: 'PostgreSQL', category: 'database', version: '16' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Resend', category: 'tools' },
      { name: 'Cloudflare Turnstile', category: 'tools' },
    ],
    schemaOrg: {
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any (Web Browser)',
    },
  },
  {
    slug: 'qr-code-creator',
    title: {
      it: 'QR-Code Creator — Generatore Vettoriale Client-Side Privacy-First',
      en: 'QR-Code Creator — Client-Side Vector Privacy-First Generator',
    },
    subtitle: {
      it: 'Applicazione web per la creazione istantanea di codici QR permanenti ad alta risoluzione con safe-zone per logo ed export SVG puro.',
      en: 'Web application for instantaneous high-resolution permanent QR generation with safe-zone logo embedding and pure vector SVG export.',
    },
    category: {
      it: 'Client-Side Tool & Grafica Vettoriale',
      en: 'Client-Side Tool & Vector Graphics',
    },
    period: '2024',
    role: {
      it: 'Frontend Engineer & Algorithm Designer',
      en: 'Frontend Engineer & Algorithm Designer',
    },
    client: {
      it: 'Progetto Open Source & Utility Personale',
      en: 'Open Source Project & Personal Utility',
    },
    coverImage:
      'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=1200',
    demoUrl: 'https://fariguu.github.io/QR-Code-Creator/',
    githubUrl: 'https://github.com/Fariguu/QR-Code-Creator',
    isPrivate: false,
    featured: false,
    tags: [
      'JavaScript ES6+',
      'HTML5 Canvas API',
      'SVG DOM',
      'CSS3',
      'Client-Side Only',
    ],
    metaDescription: {
      it: 'Case study QR-Code Creator: generatore di codici QR 100% client-side, calcolo safe-zone geometrico per loghi, esportazione SVG e PNG fino a 2048px.',
      en: 'QR-Code Creator case study: 100% client-side QR generator, geometric safe-zone calculation for logos, SVG and 2048px PNG export with zero tracking.',
    },
    metaKeywords: {
      it: [
        'generatore qr code svg client side',
        'qr code logo safe zone canvas',
        'generatore qr senza pubblicita',
        'javascript canvas rendering export svg',
      ],
      en: [
        'client side qr code generator',
        'canvas api svg export qr',
        'permanent qr code generator open source',
        'safe zone logo embed algorithm',
      ],
    },
    overview: {
      problem: {
        it: "I servizi commerciali online per generare codici QR sono saturi di dark pattern: pubblicità invasive, tracciatori invasivi, loghi a pagamento e link dinamici che scadono dopo pochi giorni per forzare l'acquisto di abbonamenti.",
        en: 'Commercial QR generation services on the web are riddled with predatory dark patterns: invasive trackers, ads, watermark paywalls, and expiring redirect links engineered to force subscription renewals.',
      },
      context: {
        it: "Un codice QR per uno stampato (biglietto da visita, menu, packaging) deve essere permanente, statico e ad altissima risoluzione per la tipografia. Doveva essere generato interamente in locale nel browser dell'utente, senza inviare dati a nessun server remoto.",
        en: 'Print media QR codes (business cards, restaurant menus, packaging) must be permanent, static, and exportable at extreme vector resolution. The entire generation pipeline needed to run locally in the browser with zero server telemetry.',
      },
      goal: {
        it: 'Costruire un tool leggero in puro JavaScript vanilla con rendering in tempo reale su Canvas, calcolo matematico della tolleranza d\'errore Reed-Solomon per l\'incorporamento di loghi e download vettoriale SVG puro (scalabile all\'infinito).',
        en: 'Engineer a lightweight vanilla JavaScript utility with real-time Canvas rendering, Reed-Solomon error correction safe-zone calculation for central logos, and infinitely scalable pure SVG vector export.',
      },
    },
    architecture: {
      summary: {
        it: "Applicazione a footprint zero costruita su JavaScript ES6+ modulare. Sfrutta l'algoritmo di codifica QR con correzione d'errore di livello H (30% di recupero dati) e rasterizzazione a matrice geometrica vettoriale.",
        en: "Zero-footprint application built with modern modular ES6+ JavaScript. Employs Reed-Solomon level H error correction (30% damage tolerance) paired with matrix vector DOM serialization.",
      },
      highlights: {
        it: [
          'Zero dipendenze server o database: 100% dell\'elaborazione avviene nel browser',
          'Calcolo della safe-zone centrale per prevenire la sovrascrittura dei finder pattern del QR',
          'Generatore di output duplice: Canvas raster HD (fino a 2048x2048) e file .SVG vettoriale',
          'Supporto per colori custom di primo piano, sfondo, raggio di smussatura degli angoli e margini',
        ],
        en: [
          'Zero server or database dependencies: 100% of encoding occurs client-side in browser memory',
          'Circular safe-zone geometric calculation preventing finder pattern overlap corruption',
          'Dual output pipeline: HD Canvas raster (up to 2048x2048) and pure editable .SVG vector file',
          'Full customization of foreground/background tints, corner rounding radius, and quiet zone margins',
        ],
      },
    },
    challenges: {
      it: [
        {
          title: 'Incorporamento del Logo senza compromettere la Scansionabilità',
          problem:
            'Inserire un logo al centro di un codice QR distrugge i byte di informazione; se il logo è troppo grande o posizionato male, gli scanner non leggono il codice.',
          solution:
            'Fissato l\'algoritmo di correzione d\'errore su Level H (High, 30% di tolleranza) e calcolata geometricamente l\'area massima del logo al 20% della superficie totale, creando un padding circolare che preserva i moduli di sincronizzazione critici.',
        },
        {
          title: 'Esportazione Vettoriale SVG Nativa da Matrice Booleana',
          problem:
            'Molti generatori creano file SVG incorporando un\'immagine PNG in base64, perdendo il vero vantaggio vettoriale in stampa.',
          solution:
            'Sviluppato un serializzatore DOM che itera sulla matrice booleana dei moduli QR, generando un unico elemento <path> SVG ottimizzato con coordinate assolute, garantendo peso ridotto (<5KB) e scalabilità infinita per tipografie.',
        },
      ],
      en: [
        {
          title: 'Logo Embedding Without Breaking Scanner Readability',
          problem:
            'Placing a graphic in the center of a QR matrix destroys data modules; improper sizing causes scanner decoding failures.',
          solution:
            'Enforced Reed-Solomon Level H (High, 30% recovery tolerance) and mathematically constrained the logo radius to 20% of total surface area with a circular protective barrier preserving alignment patterns.',
        },
        {
          title: 'Pure Vector SVG Serialization from Boolean Matrix',
          problem:
            'Most online converters generate fake SVGs by wrapping a raster base64 PNG inside an SVG tag, ruining print sharpness.',
          solution:
            'Engineered a custom DOM serializer iterating over the boolean module matrix, emitting a single optimized <path> element with absolute coordinates (<5KB file size) suitable for billboard print scales.',
        },
      ],
    },
    features: {
      it: [
        'Generazione istantanea senza ricaricamento pagina in tempo reale',
        'Codici permanenti e statici: non scadono mai e non contengono redirect',
        'Caricamento logo personalizzato con safe-zone circolare automatica',
        'Controllo avanzato di colore primario, sfondo e margini di quiete (quiet zone)',
        'Esportazione rapida in PNG ad alta risoluzione (2048px) e file SVG vettoriale puro',
      ],
      en: [
        'Real-time instantaneous generation without page reloads',
        'Permanent static codes: zero expiration dates and zero third-party redirects',
        'Custom logo upload with automatic protective circular safe-zone',
        'Granular control over foreground, background colors, and quiet zone margins',
        'Export capabilities for high-res PNG (2048px) and pure scalable SVG vectors',
      ],
    },
    results: {
      it: [
        'Zero cookie, zero tracker e zero richieste esterne: conformità GDPR al 100%',
        'Peso totale dell\'applicazione inferiore a 60KB, caricamento istantaneo',
        'Scansionabile con successo al 100% su fotocamere iOS, Android e scanner industriali',
        'Codice sorgente aperto e rilasciato gratuitamente su GitHub',
      ],
      en: [
        'Zero cookies, zero analytics, and zero external network calls: 100% GDPR private',
        'Total payload under 60KB delivering sub-millisecond execution',
        '100% scan success rate verified across iOS, Android, and industrial handheld scanners',
        'Free, open-source codebase published on GitHub',
      ],
    },
    stack: [
      { name: 'JavaScript (ES6+)', category: 'frontend' },
      { name: 'HTML5 Canvas API', category: 'frontend' },
      { name: 'SVG DOM', category: 'frontend' },
      { name: 'CSS3 Modern', category: 'frontend' },
      { name: 'GitHub Pages', category: 'devops' },
    ],
    schemaOrg: {
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any (Web Browser)',
    },
  },
]

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug.toLowerCase() === slug.toLowerCase())
}

export function hasCaseStudyDescription(slug?: string, locale: 'it' | 'en' = 'it'): boolean {
  if (!slug) return false
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return false

  const hasSubtitle = Boolean(cs.subtitle?.[locale] && cs.subtitle[locale].trim().length > 0)
  const hasOverview = Boolean(
    (cs.overview?.problem?.[locale] && cs.overview.problem[locale].trim().length > 0) ||
    (cs.overview?.context?.[locale] && cs.overview.context[locale].trim().length > 0) ||
    (cs.overview?.goal?.[locale] && cs.overview.goal[locale].trim().length > 0)
  )
  const hasMeta = Boolean(cs.metaDescription?.[locale] && cs.metaDescription[locale].trim().length > 0)

  return hasSubtitle || hasOverview || hasMeta
}

export function getAdjacentCaseStudies(currentSlug: string): {
  prev: CaseStudy
  next: CaseStudy
} {
  const index = CASE_STUDIES.findIndex(
    (cs) => cs.slug.toLowerCase() === currentSlug.toLowerCase()
  )
  const safeIndex = index === -1 ? 0 : index
  const prevIndex = (safeIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length
  const nextIndex = (safeIndex + 1) % CASE_STUDIES.length

  return {
    prev: CASE_STUDIES[prevIndex],
    next: CASE_STUDIES[nextIndex],
  }
}
