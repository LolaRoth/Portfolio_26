-- =============================================
-- Script SQL pour créer la base de données du Portfolio
-- À exécuter dans l'éditeur SQL de Supabase
-- =============================================

-- =============================================
-- TABLES PRINCIPALES
-- =============================================

-- Table des catégories de projets
CREATE TABLE IF NOT EXISTS public.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(20),
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index sur le slug pour les recherches
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- Table des projets
CREATE TABLE IF NOT EXISTS public.projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INTEGER NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    short_description TEXT NOT NULL,
    long_description TEXT,
    year INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('personnel', 'scolaire', 'professionnel')),
    cover_image TEXT NOT NULL,
    gallery_images TEXT[],
    video_url TEXT,
    external_url TEXT,
    tools TEXT[],
    featured BOOLEAN DEFAULT FALSE,
    is_3d BOOLEAN DEFAULT FALSE,
    is_game BOOLEAN DEFAULT FALSE,
    is_audiovisual BOOLEAN DEFAULT FALSE,
    "order" INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index sur les projets
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_projects_year ON public.projects(year);

-- Table des technologies
CREATE TABLE IF NOT EXISTS public.technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(100),
    color VARCHAR(20),
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table de liaison projets-technologies (many-to-many)
CREATE TABLE IF NOT EXISTS public.project_technologies (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    technology_id INTEGER NOT NULL REFERENCES public.technologies(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(project_id, technology_id)
);

-- Index sur la liaison
CREATE INDEX IF NOT EXISTS idx_project_technologies_project ON public.project_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_project_technologies_tech ON public.project_technologies(technology_id);

-- Table des expériences professionnelles
CREATE TABLE IF NOT EXISTS public.experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    responsibilities TEXT[],
    "order" INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index sur les expériences
CREATE INDEX IF NOT EXISTS idx_experiences_current ON public.experiences(is_current) WHERE is_current = TRUE;

-- Table des formations
CREATE TABLE IF NOT EXISTS public.formations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    school VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    diploma VARCHAR(255),
    "order" INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index sur les formations
CREATE INDEX IF NOT EXISTS idx_formations_current ON public.formations(is_current) WHERE is_current = TRUE;

-- Table des compétences
CREATE TABLE IF NOT EXISTS public.skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('technique', 'design', 'soft-skill', 'outil')),
    level INTEGER CHECK (level >= 1 AND level <= 5),
    icon VARCHAR(100),
    "order" INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index sur les compétences
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);

-- =============================================
-- TRIGGER POUR UPDATED_AT
-- =============================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger sur projects
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture publique (SELECT)
CREATE POLICY "Allow public read access on categories" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on technologies" ON public.technologies
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on project_technologies" ON public.project_technologies
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on experiences" ON public.experiences
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on formations" ON public.formations
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on skills" ON public.skills
    FOR SELECT USING (true);

-- =============================================
-- DONNÉES INITIALES
-- =============================================

-- Insérer les catégories principales
INSERT INTO public.categories (name, slug, description, color) VALUES
    ('Design', 'design', 'Projets de design graphique, UI/UX et direction artistique', '#A78BFA'),
    ('Communication', 'communication', 'Projets de communication visuelle et stratégie de marque', '#F472B6'),
    ('Développement Web', 'developpement-web', 'Sites web, applications et développement front-end', '#E9D5FF')
ON CONFLICT (slug) DO NOTHING;

-- Insérer quelques technologies de base
INSERT INTO public.technologies (name, category, color) VALUES
    ('Figma', 'design', '#F24E1E'),
    ('Adobe Photoshop', 'design', '#31A8FF'),
    ('Adobe Illustrator', 'design', '#FF9A00'),
    ('Adobe Premiere Pro', 'video', '#9999FF'),
    ('Adobe After Effects', 'video', '#9999FF'),
    ('Blender', '3d', '#EA7600'),
    ('HTML/CSS', 'web', '#E34C26'),
    ('JavaScript', 'web', '#F7DF1E'),
    ('TypeScript', 'web', '#3178C6'),
    ('Vue.js', 'web', '#4FC08D'),
    ('Nuxt', 'web', '#00DC82'),
    ('React', 'web', '#61DAFB'),
    ('Tailwind CSS', 'web', '#06B6D4'),
    ('Node.js', 'web', '#339933'),
    ('Supabase', 'web', '#3ECF8E'),
    ('Unity', 'game', '#000000'),
    ('Unreal Engine', 'game', '#313131')
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- COMMENTAIRES
-- =============================================

COMMENT ON TABLE public.categories IS 'Catégories principales des projets (Design, Communication, Développement Web)';
COMMENT ON TABLE public.projects IS 'Projets du portfolio avec toutes leurs informations';
COMMENT ON TABLE public.technologies IS 'Technologies et outils utilisés dans les projets';
COMMENT ON TABLE public.project_technologies IS 'Relation many-to-many entre projets et technologies';
COMMENT ON TABLE public.experiences IS 'Expériences professionnelles pour la page À propos';
COMMENT ON TABLE public.formations IS 'Formations et diplômes pour la page À propos';
COMMENT ON TABLE public.skills IS 'Compétences organisées par catégorie';
