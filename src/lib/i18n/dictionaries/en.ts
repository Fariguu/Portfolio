import type { Dictionary } from "../types";
import { createDictionary, createKeywords } from "./shared";

/**
 * ENGLISH DICTIONARY
 *
 * NOTE FOR TRANSLATOR:
 * Feel free to refine or adjust any phrasing below to match your professional translation standards.
 * Each section maps directly to the UI sections of the portfolio.
 */
export const enDictionary: Dictionary = createDictionary({
  meta: {
    title: "Gabriele Farigu | Web & Software Developer",
    description:
      "Portfolio of Gabriele Farigu, web and software developer specializing in Next.js, React, TypeScript, and Supabase. Full-stack projects, scalable architectures, and clean code.",
    keywords: createKeywords("web developer", "web development Italy"),
    ogTitle: "Gabriele Farigu | Web & Software Developer",
    ogDescription:
      "I design and build modern, fast, and bespoke web solutions. Explore my portfolio featuring Next.js, React, and Supabase projects.",
    localeCode: "en_US",
  },
  nav: {
    home: "Home",
    skills: "Skills",
    journey: "Journey",
    projects: "Projects",
    contact: "Contact",
    contactCta: "Contact Me",
    toggleMenu: "Toggle navigation menu",
  },
  hero: {
    badge: "Available for new projects",
    tagline:
      "I design and build modern, fast, and tailored web solutions. I help projects and businesses transform concrete ideas into intuitive, reliable, and meticulously crafted digital products.",
    ctaProjects: "View My Projects",
    ctaContact: "Get in Touch",
  },
  skills: {
    badge: "Skills",
    title: "Technologies & Engineering Approach",
    description:
      "The tools, patterns, and principles I apply daily in building modern web applications and software systems.",
    fallbackList: [
      {
        name: "Modern Frontend with Next.js",
        description:
          "Building responsive, high-performance user interfaces with Next.js (App Router), React, TypeScript, and Tailwind CSS.",
      },
      {
        name: "Backend & Relational Databases",
        description:
          "Managing databases with Supabase (PostgreSQL) and SQLite, crafting secure queries, RPC functions, and data modeling.",
      },
      {
        name: "Security, Privacy & Validation",
        description:
          "Dedicated focus on best practices: Row Level Security (RLS), schema validation with Zod, and bot protection with Cloudflare Turnstile.",
      },
      {
        name: "Interactivity, Maps & Graphics",
        description:
          "Integrating interactive maps with Leaflet, fluid animations with Framer Motion, and client-side vector/Canvas rendering.",
      },
    ],
  },
  journey: {
    badge: "Journey",
    title: "Education & Milestones",
    description:
      "How I built my foundation: academic background, university studies, and key milestones in my technical growth.",
    presentLabel: "Present",
    detailsLabel: "View Details",
    fallbackList: [
      {
        title: "High School Diploma — Business Information Systems (SIA)",
        description:
          "Secondary school diploma with specialization in Business Information Systems. Coursework focused on business software development, relational database design and modeling (SQL), computer networks, cybersecurity, and business economics.",
        tags: [
          "Business Information Systems",
          "SQL Databases",
          "Programming",
          "Networking & Security",
          "Business Economics",
        ],
        linkLabel: "Official Institute Website",
      },
      {
        period: "2024 — Present",
        title:
          "B.Sc. in Computer Science & Software Production Technologies (ITPS)",
        institution:
          "University of Bari Aldo Moro — Department of Computer Science",
        description:
          "Academic program focused on the theoretical and methodological foundations of computer programming, algorithms, and software engineering. In-depth study of software design, testing, verification, database systems, and user interface ergonomics.",
        tags: [
          "Software Engineering",
          "Algorithms & Data Structures",
          "Programming",
          "Databases",
          "Systems Architecture",
          "UI/UX Design",
        ],
        linkLabel: "Degree Program Info (UniBa)",
      },
    ],
  },
  portfolio: {
    badge: "Projects",
    title: "Featured Works & Projects",
    description:
      "An overview of applications I have engineered: real-world architectures, relational schemas, client-side logic, and serverless workflows.",
    privateRepo: "Private Repo",
    codeLabel: "Code",
    liveDemo: "Live Demo",
    exploreAllGithub: "Explore all repositories on GitHub",
    previewAltPrefix: "Preview of project",
    fallbackList: [
      {
        title: "Construction Firm Web Platform",
        statusBadge: "Featured",
        description:
          "Web platform for a construction enterprise specializing in bespoke building and conservative restoration of historical trulli and masserie in Apulia. Features an interactive quote estimator, turnkey services showcase, Leaflet interactive map, and Framer Motion animations.",
        githubLabel: "GitHub Code",
      },
      {
        title: "EduBook",
        statusBadge: "Active Development",
        description:
          "Serverless platform for managing and booking private tutoring sessions. Features a multi-tutor architecture, interactive calendar with automated slot partitioning, secure passwordless authentication (Supabase OTP), transactional emails with Resend, and Cloudflare Turnstile bot protection.",
        githubLabel: "Architecture Draft",
      },
      {
        title: "QR-Code Creator",
        description:
          "Client-side web application for generating high-resolution static QR codes (100% private, never expire). Supports full color customization, logo embedding with circular safe-zone calculation, and export in both HD PNG (up to 2048px) and pure vector SVG.",
        githubLabel: "GitHub Code",
      },
    ],
  },
  contact: {
    badge: "Contact",
    title: "Let's Get in Touch",
    description:
      "Have a proposal, a project in mind, or simply want to connect? Send me a message using the form below or reach out directly.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Location",
    locationValue: "Turi (BA), Italy (Available remotely)",
    cardTitle: "Send a Message",
    cardDescription:
      "Fill out the fields below. You will receive an automated confirmation email, and I will get back to you shortly.",
    fieldFirstName: "First Name *",
    fieldFirstNamePlaceholder: "John",
    fieldLastName: "Last Name *",
    fieldLastNamePlaceholder: "Doe",
    fieldEmail: "Email *",
    fieldEmailPlaceholder: "john@example.com",
    fieldMessage: "Message *",
    fieldMessagePlaceholder:
      "Briefly describe your project, inquiry, or proposal...",
    turnstileError:
      "Security check failed to load. Please refresh the page.",
    submitting: "Sending message...",
    submit: "Send Message",
    privacyConsentPrefix:
      "By sending this message, you consent to the processing of personal data for handling your inquiry. Read the",
    privacyConsentLinkText: "Privacy Policy",
    successTitle: "Message Sent!",
    successMessage:
      "Thank you for reaching out! Your message has been received, and I will respond to you shortly at",
    sendAnother: "Send Another Message",
    genericError: "Unable to send the message. Please try again.",
  },
  footer: {
    creatorTagline: "Built with Next.js and Tailwind CSS.",
    privacyPolicy: "Privacy Policy",
  },
  privacy: {
    backToPortfolio: "Back to Portfolio",
    title: "Privacy Policy",
    lastUpdated:
      "Last updated: September 2026 • Compliant with General Data Protection Regulation (GDPR - EU 2016/679)",
    section1Title: "1. Data Controller",
    section1Content:
      "The Data Controller is Gabriele Farigu, web and software developer based in Turi (BA), Italy. For any inquiries or to exercise your privacy rights, you can reach me at: farigugabriele@gmail.com.",
    section2Title: "2. Categories of Data Processed",
    section2ProvidedDataTitle: "Data voluntarily provided by the user:",
    section2ProvidedDataContent:
      "When submitting the contact form on this website, your first name, last name, email address, and message content are collected.",
    section2MetricsTitle: "Browsing data and metrics:",
    section2MetricsContent:
      "This website uses @vercel/analytics and @vercel/speed-insights, web performance measurement tools that are natively cookieless. They do not store full IP addresses or track users across external sites.",
    section2CookieTitle: "Cookie Policy:",
    section2CookieContent:
      "This site does not use profiling or advertising cookies. Consequently, no prior cookie consent banner is required under European privacy directives.",
    section3Title: "3. Purposes and Legal Basis of Processing",
    section3Content1:
      "Data submitted via the contact form is processed exclusively to respond to your inquiry, business proposal, or technical collaboration request.",
    section3Content2:
      "The legal basis for processing is the performance of pre-contractual measures taken at the request of the data subject (Art. 6(1)(b) GDPR). Your data will never be sold to third parties or used for unsolicited marketing.",
    section4Title: "4. Third-Party Service Providers (Sub-processors)",
    section4Intro:
      "To ensure high availability, security, and performance, the following third-party infrastructure services are utilized:",
    section4Vercel:
      "Vercel Inc.: Cloud hosting infrastructure, edge network, and aggregated performance metrics.",
    section4Supabase:
      "Supabase Inc.: Cloud PostgreSQL database management and multimedia asset storage.",
    section4Resend:
      "Resend Inc.: Transactional email delivery service for message routing and automated receipts.",
    section4Cloudflare:
      "Cloudflare Inc. (Turnstile): Privacy-conscious anti-bot verification securing the contact form without advertising profiling.",
    section5Title: "5. Data Retention",
    section5Content:
      "Data exchanged via email correspondence is retained strictly for the duration necessary to handle the communication or resulting business relationship, and in no event beyond statutory limitation periods.",
    section6Title: "6. Data Subject Rights",
    section6Intro:
      "Under Articles 15–22 of the GDPR, you have the right at any time to:",
    section6Right1:
      "Request confirmation of whether your personal data is being processed.",
    section6Right2:
      "Access your personal data and request its rectification or updating.",
    section6Right3:
      "Request the immediate erasure of your data (right to be forgotten).",
    section6Right4:
      "Object to processing or request restriction of processing.",
    section6ContactText:
      "To exercise any of these rights, simply send an email to farigugabriele@gmail.com.",
    backToHome: "Back to Home",
    allRightsReserved: "All rights reserved.",
  },
  notFound: {
    badge: "Error 404",
    title: "Page Not Found",
    description:
      "The page you are looking for does not exist, has been removed, or has been renamed.",
    backHome: "Back to Home",
    contactMe: "Contact Me",
  },
  languageSwitcher: {
    selectLanguage: "Select language",
    currentLanguage: "Current language",
  },
});
