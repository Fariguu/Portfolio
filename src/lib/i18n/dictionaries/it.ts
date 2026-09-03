import type { Dictionary } from "../types";
import { createDictionary, createKeywords } from "./shared";

export const itDictionary: Dictionary = createDictionary({
  meta: {
    title: "Gabriele Farigu | Sviluppatore Web & Software",
    description:
      "Portfolio di Gabriele Farigu, sviluppatore web e software specializzato in Next.js, React, TypeScript e Supabase. Progetti full-stack, architetture scalabili e codice pulito.",
    keywords: createKeywords("sviluppatore web", "web development Italia"),
    ogTitle: "Gabriele Farigu | Sviluppatore Web & Software",
    ogDescription:
      "Progetto e realizzo soluzioni web moderne, veloci e su misura. Esplora il mio portfolio con progetti Next.js, React e Supabase.",
    localeCode: "it_IT",
  },
  nav: {
    home: "Home",
    skills: "Competenze",
    journey: "Percorso",
    projects: "Progetti",
    contact: "Contatti",
    contactCta: "Contattami",
    toggleMenu: "Apri menu di navigazione",
  },
  hero: {
    badge: "Disponibile per nuovi progetti",
    tagline:
      "Progetto e realizzo soluzioni web moderne, veloci e su misura. Aiuto progetti e attività a trasformare esigenze concrete in prodotti digitali intuitivi, affidabili e curati in ogni dettaglio.",
    ctaProjects: "Guarda i miei progetti",
    ctaContact: "Contattami",
  },
  skills: {
    badge: "Competenze",
    title: "Tecnologie e Metodo di Lavoro",
    description:
      "Gli strumenti e i principi che applico quotidianamente nello sviluppo dei miei progetti web e software.",
    fallbackList: [
      {
        name: "Frontend Moderno con Next.js",
        description:
          "Realizzo interfacce utente reattive e veloci con Next.js (App Router), React, TypeScript e Tailwind CSS.",
      },
      {
        name: "Backend & Database Relazionali",
        description:
          "Gestione di database con Supabase (PostgreSQL) e SQLite, con query sicure, funzioni RPC e modellazione dei dati.",
      },
      {
        name: "Sicurezza, Privacy & Validazione",
        description:
          "Focus su buone pratiche: Row Level Security (RLS), validazione degli schemi con Zod e protezione anti-spam con Cloudflare Turnstile.",
      },
      {
        name: "Interattività, Mappe & Grafica",
        description:
          "Integrazione di mappe dinamiche con Leaflet, animazioni fluide con Framer Motion e grafica vettoriale/Canvas client-side.",
      },
    ],
  },
  journey: {
    badge: "Percorso",
    title: "Formazione & Traguardi",
    description:
      "Come ho costruito le mie competenze: il percorso scolastico, gli studi universitari e le tappe fondamentali della mia crescita.",
    presentLabel: "Presente",
    detailsLabel: "Vedi Dettagli",
    fallbackList: [
      {
        title:
          "Diploma di Scuola Secondaria di Secondo Grado — Sistemi Informativi Aziendali (SIA)",
        description:
          "Diploma conseguito con specializzazione in Sistemi Informativi Aziendali (SIA). Formazione incentrata su programmazione e sviluppo software gestionale, progettazione e modellazione di database relazionali (SQL), reti informatiche, sicurezza dei dati aziendali ed economia d'impresa.",
        tags: [
          "Sistemi Informativi Aziendali",
          "Database SQL",
          "Programmazione",
          "Reti e Sicurezza Dati",
          "Economia Aziendale",
        ],
        linkLabel: "Sito Ufficiale Istituto",
      },
      {
        period: "2024 — Presente",
        title:
          "Laurea in Informatica e Tecnologie per la Produzione del Software (ITPS)",
        institution:
          "Università degli Studi di Bari Aldo Moro — Dipartimento di Informatica",
        description:
          "Percorso accademico focalizzato sui fondamenti teorici e metodologici della programmazione, dell'algoritmica e dell'ingegneria del software. Approfondimento dei modelli e tecniche per la produzione, verifica e manutenzione di sistemi software affidabili, gestione di basi di dati e sviluppo di interfacce utente efficaci.",
        tags: [
          "Ingegneria del Software",
          "Algoritmi e Strutture Dati",
          "Programmazione",
          "Basi di Dati",
          "Architettura dei Sistemi",
          "UI/UX Design",
        ],
        linkLabel: "Scheda CdL UniBa ITPS",
      },
    ],
  },
  portfolio: {
    badge: "Progetti",
    title: "I Miei Lavori e Progetti",
    description:
      "Una panoramica delle applicazioni che ho sviluppato: architetture reali, database relazionali, logica client-side e serverless.",
    privateRepo: "Repo privato",
    codeLabel: "Codice",
    liveDemo: "Demo Live",
    exploreAllGithub: "Esplora tutti i progetti su GitHub",
    previewAltPrefix: "Anteprima del progetto",
    fallbackList: [
      {
        title: "Impresa Edile",
        statusBadge: "In Evidenza",
        description:
          "Piattaforma web per un'impresa edile specializzata in costruzioni ex-novo e restauro conservativo di trulli e masserie storiche in Puglia. Integra calcolo preventivo interattivo, vetrina dei servizi chiavi in mano, mappa del territorio con Leaflet e animazioni fluide con Framer Motion.",
        githubLabel: "Codice GitHub",
      },
      {
        title: "EduBook",
        statusBadge: "In sviluppo attivo",
        description:
          "Piattaforma serverless per la gestione e prenotazione di lezioni private. Offre un'architettura multi-docente, calendario interattivo con partizionamento automatico degli slot orari, autenticazione sicura passwordless (OTP via Supabase), email transazionali con Resend e protezione bot con Cloudflare Turnstile.",
        githubLabel: "Bozza Architettura",
      },
      {
        title: "QR-Code Creator",
        description:
          "Applicazione web client-side per la generazione di codici QR statici ad alta risoluzione (100% privati, non scadono mai). Supporta personalizzazione dei colori, inserimento logo con calcolo intelligente della safe-zone circolare ed esportazione sia in formato PNG HD (fino a 2048px) sia in SVG vettoriale puro.",
        githubLabel: "Codice GitHub",
      },
    ],
  },
  contact: {
    badge: "Contatti",
    title: "Mettiamoci in Contatto",
    description:
      "Hai una proposta, un progetto da discutere o vuoi semplicemente scambiare due chiacchiere? Compila il modulo o scrivimi direttamente.",
    emailLabel: "Email",
    phoneLabel: "Telefono",
    locationLabel: "Posizione",
    locationValue: "Turi (BA), Italia (Disponibile da remoto)",
    cardTitle: "Invia un messaggio",
    cardDescription:
      "Compila i campi sottostanti. Riceverai un'email automatica di conferma e ti ricontatterò al più presto.",
    fieldFirstName: "Nome *",
    fieldFirstNamePlaceholder: "Mario",
    fieldLastName: "Cognome *",
    fieldLastNamePlaceholder: "Rossi",
    fieldEmail: "Email *",
    fieldEmailPlaceholder: "mario@esempio.it",
    fieldMessage: "Messaggio *",
    fieldMessagePlaceholder:
      "Descrivi brevemente la tua richiesta o proposta...",
    turnstileError:
      "Errore di caricamento del controllo anti-bot. Ricarica la pagina.",
    submitting: "Invio del messaggio in corso...",
    submit: "Invia Messaggio",
    privacyConsentPrefix:
      "Inviando il messaggio accetti il trattamento dei dati personali per la gestione della richiesta. Leggi la",
    privacyConsentLinkText: "Privacy Policy",
    successTitle: "Messaggio Inviato!",
    successMessage:
      "Grazie per avermi scritto! Ho preso in carico la tua richiesta e ti risponderò a breve all'indirizzo",
    sendAnother: "Invia un altro messaggio",
    genericError: "Impossibile inviare il messaggio. Riprova.",
  },
  footer: {
    creatorTagline: "Realizzato con Next.js e Tailwind CSS.",
    privacyPolicy: "Informativa sulla Privacy",
  },
  privacy: {
    backToPortfolio: "Torna al Portfolio",
    title: "Informativa sulla Privacy",
    lastUpdated:
      "Ultimo aggiornamento: Settembre 2026 • Conforme al Regolamento Generale sulla Protezione dei Dati (GDPR - UE 2016/679)",
    section1Title: "1. Titolare del Trattamento",
    section1Content:
      "Il Titolare del trattamento dei dati è Gabriele Farigu, sviluppatore web e software con sede a Turi (BA), Italia. Per qualsiasi chiarimento o per l'esercizio dei tuoi diritti in materia di privacy, puoi scrivermi all'indirizzo: farigugabriele@gmail.com.",
    section2Title: "2. Tipologia di Dati Trattati",
    section2ProvidedDataTitle: "Dati forniti volontariamente dall'utente:",
    section2ProvidedDataContent:
      "Compilando il modulo di contatto presente sul sito, vengono raccolti nome, cognome, indirizzo email e il testo del messaggio inviato.",
    section2MetricsTitle: "Dati di navigazione e metriche:",
    section2MetricsContent:
      "Il sito utilizza @vercel/analytics e @vercel/speed-insights, strumenti di analisi tecnica e misurazione delle prestazioni web nativamente cookieless. Non registrano indirizzi IP completi né tracciano gli utenti su altri siti web.",
    section2CookieTitle: "Cookie Policy:",
    section2CookieContent:
      "Questo sito non fa uso di cookie di profilazione o pubblicitari. Non è pertanto necessario alcun banner di consenso preventivo ai sensi delle linee guida del Garante Privacy.",
    section3Title: "3. Finalità e Base Giuridica del Trattamento",
    section3Content1:
      "I dati forniti tramite il modulo di contatto vengono trattati esclusivamente per rispondere alla tua richiesta di informazione, proposta di lavoro o collaborazione tecnica.",
    section3Content2:
      "La base giuridica del trattamento è l'esecuzione di misure precontrattuali adottate su richiesta dell'interessato (Art. 6, par. 1, lett. b GDPR). I tuoi dati non verranno ceduti a terzi per finalità commerciali né utilizzati per l'invio di newsletter non richieste.",
    section4Title: "4. Fornitori di Servizi Tecnologici (Sub-responsabili)",
    section4Intro:
      "Per garantire il funzionamento, l'affidabilità e la sicurezza dell'applicazione web, vengono impiegati i seguenti servizi terzi:",
    section4Vercel:
      "Vercel Inc.: Infrastruttura cloud di hosting, edge network e analisi prestazionale aggregata.",
    section4Supabase:
      "Supabase Inc.: Gestione del database cloud PostgreSQL e storage delle risorse multimediali.",
    section4Resend:
      "Resend Inc.: Servizio di recapito email transazionali per l'inoltro dei messaggi e la conferma automatica.",
    section4Cloudflare:
      "Cloudflare Inc. (Turnstile): Sistema di protezione intelligente anti-bot e anti-spam a salvaguardia del modulo contatti, privo di profilazione pubblicitaria.",
    section5Title: "5. Conservazione dei Dati",
    section5Content:
      "I dati scambiati tramite corrispondenza email saranno conservati per il tempo strettamente necessario a gestire la comunicazione o l'eventuale rapporto professionale instaurato, e comunque non oltre i termini di legge.",
    section6Title: "6. Diritti dell'Interessato",
    section6Intro:
      "Ai sensi degli articoli 15-22 del GDPR, hai il diritto in qualunque momento di:",
    section6Right1:
      "Richiedere la conferma dell'esistenza o meno dei tuoi dati personali.",
    section6Right2:
      "Accedere ai tuoi dati e richiederne la rettifica o l'aggiornamento.",
    section6Right3:
      "Richiederne la cancellazione immediata (diritto all'oblio).",
    section6Right4: "Opporsi al trattamento o richiederne la limitazione.",
    section6ContactText:
      "Per esercitare tali diritti è sufficiente inviare un'email a farigugabriele@gmail.com.",
    backToHome: "Torna alla Home",
    allRightsReserved: "Tutti i diritti riservati.",
  },
  notFound: {
    badge: "Errore 404",
    title: "Pagina Non Trovata",
    description:
      "L'indirizzo a cui stai tentando di accedere non esiste, è stato rimosso o rinominato.",
    backHome: "Torna alla Home",
    contactMe: "Contattami",
  },
  languageSwitcher: {
    selectLanguage: "Seleziona lingua",
    currentLanguage: "Lingua corrente",
  },
});
