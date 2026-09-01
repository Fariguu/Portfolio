-- ====================================================
-- SCHEMA COMPLETO DATABASE SUPABASE PER IL PORTFOLIO
-- ====================================================

-- 1. Tabella SKILLS (Competenze & Metodologie di lavoro)
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'MonitorSmartphone',
    sort_order INT NOT NULL DEFAULT 0,
    visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Tabella JOURNEY_ITEMS (Percorso Formativo & Traguardi)
CREATE TABLE IF NOT EXISTS public.journey_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_date DATE NOT NULL,
    end_date DATE, -- NULL indica che è ancora in corso (Presente)
    title TEXT NOT NULL,
    institution TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'education', -- 'education' | 'certification' | 'milestone'
    tags TEXT[] NOT NULL DEFAULT '{}',
    link_label TEXT,
    link_url TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Tabella PROJECTS (Progetti)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    status_badge TEXT,
    demo_url TEXT,
    github_url TEXT,
    github_label TEXT DEFAULT 'Codice GitHub',
    is_private BOOLEAN NOT NULL DEFAULT false,
    featured BOOLEAN NOT NULL DEFAULT false,
    visible BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journey_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy Lettura Pubblica (solo elementi visibili)
CREATE POLICY "Allow public read on visible skills"
ON public.skills FOR SELECT
TO anon, authenticated
USING (visible = true);

CREATE POLICY "Allow public read on visible journey_items"
ON public.journey_items FOR SELECT
TO anon, authenticated
USING (visible = true);

CREATE POLICY "Allow public read on visible projects"
ON public.projects FOR SELECT
TO anon, authenticated
USING (visible = true);

-- Policy Admin / Autenticati (accesso completo per CRUD)
CREATE POLICY "Allow authenticated full access on skills"
ON public.skills FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated full access on journey_items"
ON public.journey_items FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated full access on projects"
ON public.projects FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ----------------------------------------------------
-- STORAGE BUCKET PER IMMAGINI PROGETTI
-- ----------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read on portfolio-media"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'portfolio-media');

CREATE POLICY "Allow authenticated upload to portfolio-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Allow authenticated update to portfolio-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-media');

CREATE POLICY "Allow authenticated delete from portfolio-media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-media');

-- ----------------------------------------------------
-- SEED DATA INIZIALE (Contenuti attuali del portfolio)
-- ----------------------------------------------------

INSERT INTO public.skills (name, description, icon_name, sort_order, visible) VALUES
(
    'Frontend Moderno con Next.js',
    'Realizzo interfacce utente reattive e veloci con Next.js (App Router), React, TypeScript e Tailwind CSS.',
    'MonitorSmartphone',
    1,
    true
),
(
    'Backend & Database Relazionali',
    'Gestione di database con Supabase (PostgreSQL) e SQLite, con query sicure, funzioni RPC e modellazione dei dati.',
    'Database',
    2,
    true
),
(
    'Sicurezza, Privacy & Validazione',
    'Focus su buone pratiche: Row Level Security (RLS), validazione degli schemi con Zod e protezione anti-spam con Cloudflare Turnstile.',
    'ShieldCheck',
    3,
    true
),
(
    'Interattività, Mappe & Grafica',
    'Integrazione di mappe dinamiche con Leaflet, animazioni fluide con Framer Motion e grafica vettoriale/Canvas client-side.',
    'Layers',
    4,
    true
);

INSERT INTO public.journey_items (start_date, end_date, title, institution, description, type, tags, link_label, link_url, sort_order, visible) VALUES
(
    '2019-09-01',
    '2024-06-30',
    'Diploma di Scuola Secondaria di Secondo Grado — Sistemi Informativi Aziendali (SIA)',
    'I.I.S.S. Pertini - Anelli - Pinto',
    'Diploma conseguito con specializzazione in Sistemi Informativi Aziendali (SIA). Formazione incentrata su programmazione e sviluppo software gestionale, progettazione e modellazione di database relazionali (SQL), reti informatiche, sicurezza dei dati aziendali ed economia d''impresa.',
    'education',
    ARRAY['Sistemi Informativi Aziendali', 'Database SQL', 'Programmazione', 'Reti e Sicurezza Dati', 'Economia Aziendale'],
    'Sito Ufficiale Istituto',
    'https://www.pertinianellipinto.edu.it/',
    1,
    true
),
(
    '2024-10-01',
    NULL,
    'Laurea in Informatica e Tecnologie per la Produzione del Software (ITPS)',
    'Università degli Studi di Bari Aldo Moro — Dipartimento di Informatica',
    'Percorso accademico focalizzato sui fondamenti teorici e metodologici della programmazione, dell''algoritmica e dell''ingegneria del software. Approfondimento dei modelli e tecniche per la produzione, verifica e manutenzione di sistemi software affidabili, gestione di basi di dati e sviluppo di interfacce utente efficaci.',
    'education',
    ARRAY['Ingegneria del Software', 'Algoritmi e Strutture Dati', 'Programmazione', 'Basi di Dati', 'Architettura dei Sistemi', 'UI/UX Design'],
    'Scheda CdL UniBa ITPS',
    'https://www.uniba.it/it/corsi/cdl-informatica-tecnologie-produzione-software',
    2,
    true
);

INSERT INTO public.projects (title, description, image_url, tags, status_badge, demo_url, github_url, github_label, is_private, featured, visible, sort_order) VALUES
(
    'Impresa Edile',
    'Piattaforma web per un''impresa edile specializzata in costruzioni ex-novo e restauro conservativo di trulli e masserie storiche in Puglia. Integra calcolo preventivo interattivo, vetrina dei servizi chiavi in mano, mappa del territorio con Leaflet e animazioni fluide con Framer Motion.',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    ARRAY['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Leaflet'],
    'In Evidenza',
    NULL,
    'https://github.com/Fariguu/Impresa-Edile',
    'Codice GitHub',
    true,
    true,
    true,
    1
),
(
    'EduBook',
    'Piattaforma serverless per la gestione e prenotazione di lezioni private. Offre un''architettura multi-docente, calendario interattivo con partizionamento automatico degli slot orari, autenticazione sicura passwordless (OTP via Supabase), email transazionali con Resend e protezione bot con Cloudflare Turnstile.',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    ARRAY['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Resend'],
    'In sviluppo attivo',
    NULL,
    'https://github.com/Fariguu/Educational-Booking-WebSite',
    'Bozza Architettura',
    true,
    false,
    true,
    2
),
(
    'QR-Code Creator',
    'Applicazione web client-side per la generazione di codici QR statici ad alta risoluzione (100% privati, non scadono mai). Supporta personalizzazione dei colori, inserimento logo con calcolo intelligente della safe-zone circolare ed esportazione sia in formato PNG HD (fino a 2048px) sia in SVG vettoriale puro.',
    'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=800',
    ARRAY['JavaScript ES6+', 'HTML5', 'CSS3', 'Canvas API', 'SVG Export'],
    NULL,
    NULL,
    'https://github.com/Fariguu/QR-Code-Creator',
    'Codice GitHub',
    false,
    false,
    true,
    3
);