# Guida per il Traduttore Professionista / Professional Translator Guide

Gentile Traduttore/Traduttrice,
Questo documento illustra la struttura dei testi del portfolio di **Gabriele Farigu** (sviluppatore web & software) per la traduzione/revisione dall'Italiano all'Inglese.

Il file di codice sorgente corrispondente alle traduzioni inglesi si trova in:
📂 `src/lib/i18n/dictionaries/en.ts`

Puoi scegliere se:
1. Modificare direttamente il file `en.ts` aggiornando le stringhe racchiuse tra virgolette; oppure
2. Fornire le tue traduzioni facendo riferimento alle sezioni e chiavi indicate in questa tabella.

---

## 1. Metadati SEO & Social (Massima Priorità per l'indicizzazione)

> **Nota per il Traduttore**: Per garantire che Google non tronchi i risultati nelle SERP:
> - `meta.title`: massimo **60 caratteri** (spazi inclusi).
> - `meta.description`: consigliato tra **140 e 155 caratteri** (massimo 160).

| Chiave | Testo Italiano Originale | Traduzione Inglese Attuale (Bozza) | Note / Contesto |
| :--- | :--- | :--- | :--- |
| `meta.title` | `Gabriele Farigu \| Sviluppatore Web & Software` | `Gabriele Farigu \| Web & Software Developer` | Titolo mostrato nelle schede del browser e su Google (< 60 car.) |
| `meta.description` | `Portfolio di Gabriele Farigu, sviluppatore web e software specializzato in Next.js, React, TypeScript e Supabase. Progetti full-stack, architetture scalabili e codice pulito.` | `Portfolio of Gabriele Farigu, web and software developer specializing in Next.js, React, TypeScript, and Supabase. Full-stack projects, scalable architectures, and clean code.` | Meta description per i motori di ricerca (< 160 car.) |
| `meta.ogTitle` | `Gabriele Farigu \| Sviluppatore Web & Software` | `Gabriele Farigu \| Web & Software Developer` | Titolo per anteprime OpenGraph (LinkedIn, WhatsApp, ecc.) |
| `meta.ogDescription`| `Progetto e realizzo soluzioni web moderne, veloci e su misura. Esplora il mio portfolio con progetti Next.js, React e Supabase.` | `I design and build modern, fast, and bespoke web solutions. Explore my portfolio featuring Next.js, React, and Supabase projects.` | Descrizione social |

---

## 2. Barra di Navigazione (Navbar)

| Chiave | Testo Italiano | Traduzione Inglese Attuale | Note |
| :--- | :--- | :--- | :--- |
| `nav.home` | Home | Home | Voce menu |
| `nav.skills` | Competenze | Skills | Voce menu |
| `nav.journey` | Percorso | Journey | Voce menu |
| `nav.projects` | Progetti | Projects | Voce menu |
| `nav.contact` | Contatti | Contact | Voce menu |
| `nav.contactCta` | Contattami | Contact Me | Bottone CTA evidenziato |
| `nav.toggleMenu` | Apri menu di navigazione | Toggle navigation menu | Accessibilità (screen reader) |

---

## 3. Sezione Hero (Introduttiva)

| Chiave | Testo Italiano | Traduzione Inglese Attuale | Note |
| :--- | :--- | :--- | :--- |
| `hero.badge` | Disponibile per nuovi progetti | Available for new projects | Badge con luce verde lampeggiante |
| `hero.name` | Gabriele Farigu | Gabriele Farigu | Nome proprio (invariato) |
| `hero.tagline` | Progetto e realizzo soluzioni web moderne, veloci e su misura. Aiuto progetti e attività a trasformare esigenze concrete in prodotti digitali intuitivi, affidabili e curati in ogni dettaglio. | I design and build modern, fast, and tailored web solutions. I help projects and businesses transform concrete ideas into intuitive, reliable, and meticulously crafted digital products. | Pitch principale sotto il nome |
| `hero.ctaProjects`| Guarda i miei progetti | View My Projects | Bottone principale |
| `hero.ctaContact` | Contattami | Get in Touch | Bottone secondario |

---

## 4. Sezione Competenze (Skills)

| Chiave | Testo Italiano | Traduzione Inglese Attuale |
| :--- | :--- | :--- |
| `skills.badge` | Competenze | Skills |
| `skills.title` | Tecnologie e Metodo di Lavoro | Technologies & Engineering Approach |
| `skills.description`| Gli strumenti e i principi che applico quotidianamente nello sviluppo dei miei progetti web e software. | The tools, patterns, and principles I apply daily in building modern web applications and software systems. |

### Schede Competenze:
1. **Frontend Moderno con Next.js** -> *Modern Frontend with Next.js*
   - IT: `Realizzo interfacce utente reattive e veloci con Next.js (App Router), React, TypeScript e Tailwind CSS.`
   - EN: `Building responsive, high-performance user interfaces with Next.js (App Router), React, TypeScript, and Tailwind CSS.`
2. **Backend & Database Relazionali** -> *Backend & Relational Databases*
   - IT: `Gestione di database con Supabase (PostgreSQL) e SQLite, con query sicure, funzioni RPC e modellazione dei dati.`
   - EN: `Managing databases with Supabase (PostgreSQL) and SQLite, crafting secure queries, RPC functions, and data modeling.`
3. **Sicurezza, Privacy & Validazione** -> *Security, Privacy & Validation*
   - IT: `Focus su buone pratiche: Row Level Security (RLS), validazione degli schemi con Zod e protezione anti-spam con Cloudflare Turnstile.`
   - EN: `Dedicated focus on best practices: Row Level Security (RLS), schema validation with Zod, and bot protection with Cloudflare Turnstile.`
4. **Interattività, Mappe & Grafica** -> *Interactivity, Maps & Graphics*
   - IT: `Integrazione di mappe dinamiche con Leaflet, animazioni fluide con Framer Motion e grafica vettoriale/Canvas client-side.`
   - EN: `Integrating interactive maps with Leaflet, fluid animations with Framer Motion, and client-side vector/Canvas rendering.`

---

## 5. Sezione Percorso (Journey / Education)

| Chiave | Testo Italiano | Traduzione Inglese Attuale |
| :--- | :--- | :--- |
| `journey.badge` | Percorso | Journey |
| `journey.title` | Formazione & Traguardi | Education & Milestones |
| `journey.description`| Come ho costruito le mie competenze: il percorso scolastico, gli studi universitari e le tappe fondamentali della mia crescita. | How I built my foundation: academic background, university studies, and key milestones in my technical growth. |
| `journey.presentLabel`| Presente | Present |
| `journey.detailsLabel`| Vedi Dettagli | View Details |

### Tappe Cronologiche:
1. **Diploma SIA (2019 — 2024)**:
   - Titolo IT: `Diploma di Scuola Secondaria di Secondo Grado — Sistemi Informativi Aziendali (SIA)`
   - Titolo EN: `High School Diploma — Business Information Systems (SIA)`
   - Istituto: `I.I.S.S. "Pertini - Anelli - Pinto"`
   - Descrizione IT: `Diploma conseguito con specializzazione in Sistemi Informativi Aziendali (SIA). Formazione incentrata su programmazione e sviluppo software gestionale, progettazione e modellazione di database relazionali (SQL), reti informatiche, sicurezza dei dati aziendali ed economia d'impresa.`
   - Descrizione EN: `Secondary school diploma with specialization in Business Information Systems. Coursework focused on business software development, relational database design and modeling (SQL), computer networks, cybersecurity, and business economics.`
2. **Laurea Triennale ITPS (2024 — Presente)**:
   - Titolo IT: `Laurea in Informatica e Tecnologie per la Produzione del Software (ITPS)`
   - Titolo EN: `B.Sc. in Computer Science & Software Production Technologies (ITPS)`
   - Istituto IT: `Università degli Studi di Bari Aldo Moro — Dipartimento di Informatica`
   - Istituto EN: `University of Bari Aldo Moro — Department of Computer Science`
   - Descrizione IT: `Percorso accademico focalizzato sui fondamenti teorici e metodologici della programmazione, dell'algoritmica e dell'ingegneria del software. Approfondimento dei modelli e tecniche per la produzione, verifica e manutenzione di sistemi software affidabili, gestione di basi di dati e sviluppo di interfacce utente efficaci.`
   - Descrizione EN: `Academic program focused on the theoretical and methodological foundations of computer programming, algorithms, and software engineering. In-depth study of software design, testing, verification, database systems, and user interface ergonomics.`

---

## 6. Sezione Progetti (Portfolio)

| Chiave | Testo Italiano | Traduzione Inglese Attuale |
| :--- | :--- | :--- |
| `portfolio.badge` | Progetti | Projects |
| `portfolio.title` | I Miei Lavori e Progetti | Featured Works & Projects |
| `portfolio.description` | Una panoramica delle applicazioni che ho sviluppato: architetture reali, database relazionali, logica client-side e serverless. | An overview of applications I have engineered: real-world architectures, relational schemas, client-side logic, and serverless workflows. |
| `portfolio.codeLabel` | Codice | Code |
| `portfolio.liveDemo` | Demo Live | Live Demo |
| `portfolio.exploreAllGithub` | Esplora tutti i progetti su GitHub | Explore all repositories on GitHub |

### Progetti in evidenza:
1. **Impresa Edile**:
   - Badge: `In Evidenza` -> `Featured`
   - Descrizione IT: `Piattaforma web per un'impresa edile specializzata in costruzioni ex-novo e restauro conservativo di trulli e masserie storiche in Puglia. Integra calcolo preventivo interattivo, vetrina dei servizi chiavi in mano, mappa del territorio con Leaflet e animazioni fluide con Framer Motion.`
   - Descrizione EN: `Web platform for a construction enterprise specializing in bespoke building and conservative restoration of historical trulli and masserie in Apulia. Features an interactive quote estimator, turnkey services showcase, Leaflet interactive map, and Framer Motion animations.`
2. **EduBook**:
   - Badge: `In sviluppo attivo` -> `Active Development`
   - Descrizione IT: `Piattaforma serverless per la gestione e prenotazione di lezioni private. Offre un'architettura multi-docente, calendario interattivo con partizionamento automatico degli slot orari, autenticazione sicura passwordless (OTP via Supabase), email transazionali con Resend e protezione bot con Cloudflare Turnstile.`
   - Descrizione EN: `Serverless platform for managing and booking private tutoring sessions. Features a multi-tutor architecture, interactive calendar with automated slot partitioning, secure passwordless authentication (Supabase OTP), transactional emails with Resend, and Cloudflare Turnstile bot protection.`
3. **QR-Code Creator**:
   - Descrizione IT: `Applicazione web client-side per la generazione di codici QR statici ad alta risoluzione (100% privati, non scadono mai). Supporta personalizzazione dei colori, inserimento logo con calcolo intelligente della safe-zone circolare ed esportazione sia in formato PNG HD (fino a 2048px) sia in SVG vettoriale puro.`
   - Descrizione EN: `Client-side web application for generating high-resolution static QR codes (100% private, never expire). Supports full color customization, logo embedding with circular safe-zone calculation, and export in both HD PNG (up to 2048px) and pure vector SVG.`

---

## 7. Sezione Contatti

| Chiave | Testo Italiano | Traduzione Inglese Attuale |
| :--- | :--- | :--- |
| `contact.badge` | Contatti | Contact |
| `contact.title` | Mettiamoci in Contatto | Let's Get in Touch |
| `contact.description` | Hai una proposta, un progetto da discutere o vuoi semplicemente scambiare due chiacchiere? Compila il modulo o scrivimi direttamente. | Have a proposal, a project in mind, or simply want to connect? Send me a message using the form below or reach out directly. |
| `contact.locationValue` | Turi (BA), Italia (Disponibile da remoto) | Turi (BA), Italy (Available remotely) |
| `contact.cardTitle` | Invia un messaggio | Send a Message |
| `contact.cardDescription` | Compila i campi sottostanti. Riceverai un'email automatica di conferma e ti ricontatterò al più presto. | Fill out the fields below. You will receive an automated confirmation email, and I will get back to you shortly. |
| `contact.submit` | Invia Messaggio | Send Message |
| `contact.submitting` | Invio del messaggio in corso... | Sending message... |
| `contact.successTitle` | Messaggio Inviato! | Message Sent! |
| `contact.sendAnother` | Invia un altro messaggio | Send Another Message |

---

## 8. Informativa sulla Privacy (Privacy Policy)

Le sezioni complete della Privacy Policy per il GDPR europeo sono già strutturate e tradotte nelle chiavi `privacy.*` all'interno di `src/lib/i18n/dictionaries/en.ts`. Puoi revisionare o integrare la terminologia giuridica formale in lingua inglese direttamente in quel file.
