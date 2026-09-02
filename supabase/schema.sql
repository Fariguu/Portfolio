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
