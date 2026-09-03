# Guida per il Traduttore Professionista / Professional Translator Guide

Gentile Traduttore/Traduttrice,  
Questo documento illustra l'elenco completo di tutti i testi del portfolio di **Gabriele Farigu** (sviluppatore web & software) per la traduzione e revisione dall'Italiano all'Inglese.

Il file di codice sorgente corrispondente alle traduzioni inglesi si trova in:  
📂 `src/lib/i18n/dictionaries/en.ts`

Puoi scegliere se:
1. **Modificare direttamente il file `en.ts`** aggiornando le stringhe racchiuse tra virgolette; oppure
2. **Fornire le tue traduzioni** facendo riferimento alle sezioni e chiavi indicate nelle tabelle seguenti.

---

## 1. Metadati SEO & Social (Massima Priorità per Google)

> ⚠️ **Limiti di Lunghezza per i Motori di Ricerca (Google SERP)**:
> - `meta.title`: massimo **60 caratteri** (spazi inclusi).
> - `meta.description`: consigliato tra **140 e 155 caratteri** (massimo 160).

| Chiave | Testo Italiano Originale | Bozza Inglese Attuale | Note / Contesto |
| :--- | :--- | :--- | :--- |
| `meta.title` | `Gabriele Farigu \| Sviluppatore Web & Software` | `Gabriele Farigu \| Web & Software Developer` | Titolo mostrato nelle schede del browser e su Google (< 60 car.) |
| `meta.description` | `Portfolio di Gabriele Farigu, sviluppatore web e software specializzato in Next.js, React, TypeScript e Supabase. Progetti full-stack, architetture scalabili e codice pulito.` | `Portfolio of Gabriele Farigu, web and software developer specializing in Next.js, React, TypeScript, and Supabase. Full-stack projects, scalable architectures, and clean code.` | Meta description per i motori di ricerca (< 160 car.) |
| `meta.ogTitle` | `Gabriele Farigu \| Sviluppatore Web & Software` | `Gabriele Farigu \| Web & Software Developer` | Titolo per anteprime OpenGraph (LinkedIn, WhatsApp, ecc.) |
| `meta.ogDescription`| `Progetto e realizzo soluzioni web moderne, veloci e su misura. Esplora il mio portfolio con progetti Next.js, React e Supabase.` | `I design and build modern, fast, and bespoke web solutions. Explore my portfolio featuring Next.js, React, and Supabase projects.` | Descrizione social |

---

## 2. Barra di Navigazione (Navbar)

| Chiave | Testo Italiano | Bozza Inglese Attuale | Note |
| :--- | :--- | :--- | :--- |
| `nav.home` | Home | Home | Voce menu |
| `nav.skills` | Competenze | Skills | Voce menu |
| `nav.journey` | Percorso | Journey | Voce menu |
| `nav.projects` | Progetti | Projects | Voce menu |
| `nav.contact` | Contatti | Contact | Voce menu |
| `nav.contactCta` | Contattami | Contact Me | Pulsante CTA in evidenza |
| `nav.toggleMenu` | Apri menu di navigazione | Toggle navigation menu | Accessibilità (screen reader) |

---

## 3. Sezione Hero (Introduttiva)

| Chiave | Testo Italiano | Bozza Inglese Attuale | Note |
| :--- | :--- | :--- | :--- |
| `hero.badge` | Disponibile per nuovi progetti | Available for new projects | Badge con luce verde |
| `hero.name` | Gabriele Farigu | Gabriele Farigu | Nome proprio (invariato) |
| `hero.tagline` | Progetto e realizzo soluzioni web moderne, veloci e su misura. Aiuto progetti e attività a trasformare esigenze concrete in prodotti digitali intuitivi, affidabili e curati in ogni dettaglio. | I design and build modern, fast, and tailored web solutions. I help projects and businesses transform concrete ideas into intuitive, reliable, and meticulously crafted digital products. | Pitch principale sotto il nome |
| `hero.ctaProjects`| Guarda i miei progetti | View My Projects | Pulsante principale |
| `hero.ctaContact` | Contattami | Get in Touch | Pulsante secondario |

---

## 4. Sezione Competenze (Skills)

| Chiave | Testo Italiano | Bozza Inglese Attuale |
| :--- | :--- | :--- |
| `skills.badge` | Competenze | Skills |
| `skills.title` | Tecnologie e Metodo di Lavoro | Technologies & Engineering Approach |
| `skills.description`| Gli strumenti e i principi che applico quotidianamente nello sviluppo dei miei progetti web e software. | The tools, patterns, and principles I apply daily in building modern web applications and software systems. |

### Schede Tecnologie:
1. **Frontend Moderno con Next.js**  
   - *IT*: `Realizzo interfacce utente reattive e veloci con Next.js (App Router), React, TypeScript e Tailwind CSS.`  
   - *EN*: `Building responsive, high-performance user interfaces with Next.js (App Router), React, TypeScript, and Tailwind CSS.`
2. **Backend & Database Relazionali**  
   - *IT*: `Gestione di database con Supabase (PostgreSQL) e SQLite, con query sicure, funzioni RPC e modellazione dei dati.`  
   - *EN*: `Managing databases with Supabase (PostgreSQL) and SQLite, crafting secure queries, RPC functions, and data modeling.`
3. **Sicurezza, Privacy & Validazione**  
   - *IT*: `Focus su buone pratiche: Row Level Security (RLS), validazione degli schemi con Zod e protezione anti-spam con Cloudflare Turnstile.`  
   - *EN*: `Dedicated focus on best practices: Row Level Security (RLS), schema validation with Zod, and bot protection with Cloudflare Turnstile.`
4. **Interattività, Mappe & Grafica**  
   - *IT*: `Integrazione di mappe dinamiche con Leaflet, animazioni fluide con Framer Motion e grafica vettoriale/Canvas client-side.`  
   - *EN*: `Integrating interactive maps with Leaflet, fluid animations with Framer Motion, and client-side vector/Canvas rendering.`

---

## 5. Sezione Percorso (Journey / Formazione)

| Chiave | Testo Italiano | Bozza Inglese Attuale |
| :--- | :--- | :--- |
| `journey.badge` | Percorso | Journey |
| `journey.title` | Formazione & Traguardi | Education & Milestones |
| `journey.description`| Come ho costruito le mie competenze: il percorso scolastico, gli studi universitari e le tappe fondamentali della mia crescita. | How I built my foundation: academic background, university studies, and key milestones in my technical growth. |
| `journey.presentLabel`| Presente | Present |
| `journey.detailsLabel`| Vedi Dettagli | View Details |

### Tappe Cronologiche:
1. **Diploma SIA (2019 — 2024)**:
   - *Titolo IT*: `Diploma di Scuola Secondaria di Secondo Grado — Sistemi Informativi Aziendali (SIA)`
   - *Titolo EN*: `High School Diploma — Business Information Systems (SIA)`
   - *Istituto*: `I.I.S.S. "Pertini - Anelli - Pinto"`
   - *Descrizione IT*: `Diploma conseguito con specializzazione in Sistemi Informativi Aziendali (SIA). Formazione incentrata su programmazione e sviluppo software gestionale, progettazione e modellazione di database relazionali (SQL), reti informatiche, sicurezza dei dati aziendali ed economia d'impresa.`
   - *Descrizione EN*: `Secondary school diploma with specialization in Business Information Systems. Coursework focused on business software development, relational database design and modeling (SQL), computer networks, cybersecurity, and business economics.`
2. **Laurea Triennale ITPS (2024 — Presente)**:
   - *Titolo IT*: `Laurea in Informatica e Tecnologie per la Produzione del Software (ITPS)`
   - *Titolo EN*: `B.Sc. in Computer Science & Software Production Technologies (ITPS)`
   - *Istituto IT*: `Università degli Studi di Bari Aldo Moro — Dipartimento di Informatica`
   - *Istituto EN*: `University of Bari Aldo Moro — Department of Computer Science`
   - *Descrizione IT*: `Percorso accademico focalizzato sui fondamenti teorici e metodologici della programmazione, dell'algoritmica e dell'ingegneria del software. Approfondimento dei modelli e tecniche per la produzione, verifica e manutenzione di sistemi software affidabili, gestione di basi di dati e sviluppo di interfacce utente efficaci.`
   - *Descrizione EN*: `Academic program focused on the theoretical and methodological foundations of computer programming, algorithms, and software engineering. In-depth study of software design, testing, verification, database systems, and user interface ergonomics.`

---

## 6. Sezione Progetti (Portfolio)

| Chiave | Testo Italiano | Bozza Inglese Attuale |
| :--- | :--- | :--- |
| `portfolio.badge` | Progetti | Projects |
| `portfolio.title` | I Miei Lavori e Progetti | Featured Works & Projects |
| `portfolio.description` | Una panoramica delle applicazioni che ho sviluppato: architetture reali, database relazionali, logica client-side e serverless. | An overview of applications I have engineered: real-world architectures, relational schemas, client-side logic, and serverless workflows. |
| `portfolio.codeLabel` | Codice | Code |
| `portfolio.liveDemo` | Demo Live | Live Demo |
| `portfolio.exploreAllGithub` | Esplora tutti i progetti su GitHub | Explore all repositories on GitHub |

### Progetti in Evidenza:
1. **Impresa Edile**:
   - *Badge*: `In Evidenza` → `Featured`
   - *Descrizione IT*: `Piattaforma web per un'impresa edile specializzata in costruzioni ex-novo e restauro conservativo di trulli e masserie storiche in Puglia. Integra calcolo preventivo interattivo, vetrina dei servizi chiavi in mano, mappa del territorio con Leaflet e animazioni fluide con Framer Motion.`
   - *Descrizione EN*: `Web platform for a construction enterprise specializing in bespoke building and conservative restoration of historical trulli and masserie in Apulia. Features an interactive quote estimator, turnkey services showcase, Leaflet interactive map, and Framer Motion animations.`
2. **EduBook**:
   - *Badge*: `In sviluppo attivo` → `Active Development`
   - *Descrizione IT*: `Piattaforma serverless per la gestione e prenotazione di lezioni private. Offre un'architettura multi-docente, calendario interattivo con partizionamento automatico degli slot orari, autenticazione sicura passwordless (OTP via Supabase), email transazionali con Resend e protezione bot con Cloudflare Turnstile.`
   - *Descrizione EN*: `Serverless platform for managing and booking private tutoring sessions. Features a multi-tutor architecture, interactive calendar with automated slot partitioning, secure passwordless authentication (Supabase OTP), transactional emails with Resend, and Cloudflare Turnstile bot protection.`
3. **QR-Code Creator**:
   - *Descrizione IT*: `Applicazione web client-side per la generazione di codici QR statici ad alta risoluzione (100% privati, non scadono mai). Supporta personalizzazione dei colori, inserimento logo con calcolo intelligente della safe-zone circolare ed esportazione sia in formato PNG HD (fino a 2048px) sia in SVG vettoriale puro.`
   - *Descrizione EN*: `Client-side web application for generating high-resolution static QR codes (100% private, never expire). Supports full color customization, logo embedding with circular safe-zone calculation, and export in both HD PNG (up to 2048px) and pure vector SVG.`

---

## 7. Sezione Contatti

| Chiave | Testo Italiano | Bozza Inglese Attuale |
| :--- | :--- | :--- |
| `contact.badge` | Contatti | Contact |
| `contact.title` | Mettiamoci in Contatto | Let's Get in Touch |
| `contact.description` | Hai una proposta, un progetto da discutere o vuoi semplicemente scambiare due chiacchiere? Compila il modulo o scrivimi direttamente. | Have a proposal, a project in mind, or simply want to connect? Send me a message using the form below or reach out directly. |
| `contact.emailLabel` | Email | Email |
| `contact.phoneLabel` | Telefono | Phone |
| `contact.locationLabel` | Posizione | Location |
| `contact.locationValue` | Turi (BA), Italia (Disponibile da remoto) | Turi (BA), Italy (Available remotely) |
| `contact.cardTitle` | Invia un messaggio | Send a Message |
| `contact.cardDescription` | Compila i campi sottostanti. Riceverai un'email automatica di conferma e ti ricontatterò al più presto. | Fill out the fields below. You will receive an automated confirmation email, and I will get back to you shortly. |
| `contact.fieldFirstName` | Nome * | First Name * |
| `contact.fieldFirstNamePlaceholder` | Mario | John |
| `contact.fieldLastName` | Cognome * | Last Name * |
| `contact.fieldLastNamePlaceholder` | Rossi | Doe |
| `contact.fieldEmail` | Email * | Email * |
| `contact.fieldEmailPlaceholder` | mario@esempio.it | john@example.com |
| `contact.fieldMessage` | Messaggio * | Message * |
| `contact.fieldMessagePlaceholder` | Descrivi brevemente la tua richiesta o proposta... | Briefly describe your project, inquiry, or proposal... |
| `contact.turnstileError` | Errore di caricamento del controllo anti-bot. Ricarica la pagina. | Security check failed to load. Please refresh the page. |
| `contact.submitting` | Invio del messaggio in corso... | Sending message... |
| `contact.submit` | Invia Messaggio | Send Message |
| `contact.privacyConsentPrefix` | Inviando il messaggio accetti il trattamento dei dati personali per la gestione della richiesta. Leggi la | By sending this message, you consent to the processing of personal data for handling your inquiry. Read the |
| `contact.privacyConsentLinkText` | Privacy Policy | Privacy Policy |
| `contact.successTitle` | Messaggio Inviato! | Message Sent! |
| `contact.successMessage` | Grazie per avermi scritto! Ho preso in carico la tua richiesta e ti risponderò a breve all'indirizzo | Thank you for reaching out! Your message has been received, and I will respond to you shortly at |
| `contact.sendAnother` | Invia un altro messaggio | Send Another Message |
| `contact.genericError` | Impossibile inviare il messaggio. Riprova. | Unable to send the message. Please try again. |

---

## 8. Informativa sulla Privacy (Privacy Policy - GDPR EU 2016/679)

| Chiave | Testo Italiano Originale | Bozza Inglese Attuale |
| :--- | :--- | :--- |
| `privacy.backToPortfolio` | Torna al Portfolio | Back to Portfolio |
| `privacy.title` | Informativa sulla Privacy | Privacy Policy |
| `privacy.lastUpdated` | Ultimo aggiornamento: Settembre 2026 • Conforme al Regolamento Generale sulla Protezione dei Dati (GDPR - UE 2016/679) | Last updated: September 2026 • Compliant with General Data Protection Regulation (GDPR - EU 2016/679) |
| `privacy.section1Title` | 1. Titolare del Trattamento | 1. Data Controller |
| `privacy.section1Content` | Il Titolare del trattamento dei dati è Gabriele Farigu, sviluppatore web e software con sede a Turi (BA), Italia. Per qualsiasi chiarimento o per l'esercizio dei tuoi diritti in materia di privacy, puoi scrivermi all'indirizzo: farigugabriele@gmail.com. | The Data Controller is Gabriele Farigu, web and software developer based in Turi (BA), Italy. For any inquiries or to exercise your privacy rights, you can reach me at: farigugabriele@gmail.com. |
| `privacy.section2Title` | 2. Tipologia di Dati Trattati | 2. Categories of Data Processed |
| `privacy.section2ProvidedDataTitle` | Dati forniti volontariamente dall'utente: | Data voluntarily provided by the user: |
| `privacy.section2ProvidedDataContent` | Compilando il modulo di contatto presente sul sito, vengono raccolti nome, cognome, indirizzo email e il testo del messaggio inviato. | When submitting the contact form on this website, your first name, last name, email address, and message content are collected. |
| `privacy.section2MetricsTitle` | Dati di navigazione e metriche: | Browsing data and metrics: |
| `privacy.section2MetricsContent` | Il sito utilizza @vercel/analytics e @vercel/speed-insights, strumenti di analisi tecnica e misurazione delle prestazioni web nativamente cookieless. Non registrano indirizzi IP completi né tracciano gli utenti su altri siti web. | This website uses @vercel/analytics and @vercel/speed-insights, web performance measurement tools that are natively cookieless. They do not store full IP addresses or track users across external sites. |
| `privacy.section2CookieTitle` | Cookie Policy: | Cookie Policy: |
| `privacy.section2CookieContent` | Questo sito non fa uso di cookie di profilazione o pubblicitari. Non è pertanto necessario alcun banner di consenso preventivo ai sensi delle linee guida del Garante Privacy. | This site does not use profiling or advertising cookies. Consequently, no prior cookie consent banner is required under European privacy directives. |
| `privacy.section3Title` | 3. Finalità e Base Giuridica del Trattamento | 3. Purposes and Legal Basis of Processing |
| `privacy.section3Content1` | I dati forniti tramite il modulo di contatto vengono trattati esclusivamente per rispondere alla tua richiesta di informazione, proposta di lavoro o collaborazione tecnica. | Data submitted via the contact form is processed exclusively to respond to your inquiry, business proposal, or technical collaboration request. |
| `privacy.section3Content2` | La base giuridica del trattamento è l'esecuzione di misure precontrattuali adottate su richiesta dell'interessato (Art. 6, par. 1, lett. b GDPR). I tuoi dati non verranno ceduti a terzi per finalità commerciali né utilizzati per l'invio di newsletter non richieste. | The legal basis for processing is the performance of pre-contractual measures taken at the request of the data subject (Art. 6(1)(b) GDPR). Your data will never be sold to third parties or used for unsolicited marketing. |
| `privacy.section4Title` | 4. Fornitori di Servizi Tecnologici (Sub-responsabili) | 4. Third-Party Service Providers (Sub-processors) |
| `privacy.section4Intro` | Per garantire il funzionamento, l'affidabilità e la sicurezza dell'applicazione web, vengono impiegati i seguenti servizi terzi: | To ensure high availability, security, and performance, the following third-party infrastructure services are utilized: |
| `privacy.section4Vercel` | Vercel Inc.: Infrastruttura cloud di hosting, edge network e analisi prestazionale aggregata. | Vercel Inc.: Cloud hosting infrastructure, edge network, and aggregated performance metrics. |
| `privacy.section4Supabase` | Supabase Inc.: Gestione del database cloud PostgreSQL e storage delle risorse multimediali. | Supabase Inc.: Cloud PostgreSQL database management and multimedia asset storage. |
| `privacy.section4Resend` | Resend Inc.: Servizio di recapito email transazionali per l'inoltro dei messaggi e la conferma automatica. | Resend Inc.: Transactional email delivery service for message routing and automated receipts. |
| `privacy.section4Cloudflare` | Cloudflare Inc. (Turnstile): Sistema di protezione intelligente anti-bot e anti-spam a salvaguardia del modulo contatti, privo di profilazione pubblicitaria. | Cloudflare Inc. (Turnstile): Privacy-conscious anti-bot verification securing the contact form without advertising profiling. |
| `privacy.section5Title` | 5. Conservazione dei Dati | 5. Data Retention |
| `privacy.section5Content` | I dati scambiati tramite corrispondenza email saranno conservati per il tempo strettamente necessario a gestire la comunicazione o l'eventuale rapporto professionale instaurato, e comunque non oltre i termini di legge. | Data exchanged via email correspondence is retained strictly for the duration necessary to handle the communication or resulting business relationship, and in no event beyond statutory limitation periods. |
| `privacy.section6Title` | 6. Diritti dell'Interessato | 6. Data Subject Rights |
| `privacy.section6Intro` | Ai sensi degli articoli 15-22 del GDPR, hai il diritto in qualunque momento di: | Under Articles 15–22 of the GDPR, you have the right at any time to: |
| `privacy.section6Right1` | Richiedere la conferma dell'esistenza o meno dei tuoi dati personali. | Request confirmation of whether your personal data is being processed. |
| `privacy.section6Right2` | Accedere ai tuoi dati e richiederne la rettifica o l'aggiornamento. | Access your personal data and request its rectification or updating. |
| `privacy.section6Right3` | Richiederne la cancellazione immediata (diritto all'oblio). | Request the immediate erasure of your data (right to be forgotten). |
| `privacy.section6Right4` | Opporsi al trattamento o richiederne la limitazione. | Object to processing or request restriction of processing. |
| `privacy.section6ContactText` | Per esercitare tali diritti è sufficiente inviare un'email a farigugabriele@gmail.com. | To exercise any of these rights, simply send an email to farigugabriele@gmail.com. |
| `privacy.backToHome` | Torna alla Home | Back to Home |
| `privacy.allRightsReserved` | Tutti i diritti riservati. | All rights reserved. |

---

## 9. Footer e Pagina 404

| Chiave | Testo Italiano | Bozza Inglese Attuale |
| :--- | :--- | :--- |
| `footer.creatorTagline` | Realizzato con Next.js e Tailwind CSS. | Built with Next.js and Tailwind CSS. |
| `footer.privacyPolicy` | Informativa sulla Privacy | Privacy Policy |
| `notFound.badge` | Errore 404 | Error 404 |
| `notFound.title` | Pagina Non Trovata | Page Not Found |
| `notFound.description` | L'indirizzo a cui stai tentando di accedere non esiste, è stato rimosso o rinominato. | The page you are looking for does not exist, has been removed, or has been renamed. |
| `notFound.backHome` | Torna alla Home | Back to Home |
| `notFound.contactMe` | Contattami | Contact Me |
