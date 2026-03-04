-- =============================================
-- Données de démonstration pour le Portfolio
-- À exécuter après schema.sql
-- =============================================

-- =============================================
-- PROJETS DE DÉMONSTRATION
-- =============================================

-- Projet Design 1
INSERT INTO public.projects (
    title, slug, category_id, short_description, long_description, year, type,
    cover_image, featured, is_3d, is_game, is_audiovisual
) VALUES (
    'Refonte UI Application Mobile',
    'refonte-ui-mobile',
    (SELECT id FROM public.categories WHERE slug = 'design'),
    'Refonte complète de l''interface utilisateur d''une application mobile de fitness.',
    'Ce projet consistait à repenser entièrement l''expérience utilisateur d''une application de fitness. L''objectif était de créer une interface moderne, intuitive et motivante pour les utilisateurs.

J''ai travaillé sur la recherche utilisateur, la création de personas, les wireframes, les prototypes interactifs et la direction artistique complète de l''application.',
    2025,
    'professionnel',
    '/images/projects/ui-mobile-cover.jpg',
    true,
    false,
    false,
    false
);

-- Projet Communication 1
INSERT INTO public.projects (
    title, slug, category_id, short_description, long_description, year, type,
    cover_image, featured, is_3d, is_game, is_audiovisual
) VALUES (
    'Campagne de Communication Événementielle',
    'campagne-evenementielle',
    (SELECT id FROM public.categories WHERE slug = 'communication'),
    'Création d''une campagne de communication visuelle pour un festival de musique.',
    'Développement d''une identité visuelle complète pour un festival de musique électronique. Le projet incluait la création du logo, des affiches, des supports digitaux et de la signalétique sur site.

L''univers graphique s''inspire des néons et de l''esthétique cyberpunk pour créer une ambiance futuriste et immersive.',
    2025,
    'scolaire',
    '/images/projects/festival-cover.jpg',
    true,
    false,
    false,
    false
);

-- Projet Développement Web 1
INSERT INTO public.projects (
    title, slug, category_id, short_description, long_description, year, type,
    cover_image, featured, is_3d, is_game, is_audiovisual
) VALUES (
    'Site E-commerce Artisanal',
    'ecommerce-artisanal',
    (SELECT id FROM public.categories WHERE slug = 'developpement-web'),
    'Développement d''un site e-commerce pour une marque d''artisanat local.',
    'Conception et développement d''une boutique en ligne complète pour une marque d''artisanat. Le site inclut un catalogue produits, un panier, un système de paiement sécurisé et un back-office pour la gestion des commandes.

Technologies utilisées : Nuxt 3, Tailwind CSS, Supabase pour la base de données et Stripe pour les paiements.',
    2026,
    'personnel',
    '/images/projects/ecommerce-cover.jpg',
    true,
    false,
    false,
    false
);

-- Projet 3D
INSERT INTO public.projects (
    title, slug, category_id, short_description, long_description, year, type,
    cover_image, gallery_images, featured, is_3d, is_game, is_audiovisual
) VALUES (
    'Scène 3D Low Poly',
    'scene-3d-lowpoly',
    (SELECT id FROM public.categories WHERE slug = 'design'),
    'Création d''une scène 3D stylisée en low poly représentant un paysage fantastique.',
    'Projet personnel de modélisation 3D explorant le style low poly. La scène représente un paysage fantastique avec des montagnes, une forêt et un lac, le tout dans une palette de couleurs pastel harmonieuse.

Réalisé avec Blender, ce projet m''a permis d''approfondir mes compétences en modélisation, texturing et éclairage 3D.',
    2025,
    'personnel',
    '/images/projects/3d-lowpoly-cover.jpg',
    ARRAY['/images/projects/3d-lowpoly-1.jpg', '/images/projects/3d-lowpoly-2.jpg'],
    true,
    true,
    false,
    false
);

-- Projet Audiovisuel
INSERT INTO public.projects (
    title, slug, category_id, short_description, long_description, year, type,
    cover_image, video_url, featured, is_3d, is_game, is_audiovisual
) VALUES (
    'Court-métrage Expérimental',
    'court-metrage-experimental',
    (SELECT id FROM public.categories WHERE slug = 'communication'),
    'Réalisation d''un court-métrage expérimental mêlant prises de vue réelles et motion design.',
    'Court-métrage de 3 minutes explorant les thèmes de l''identité numérique et de la connexion humaine. Le film combine des séquences filmées avec des éléments de motion design pour créer une expérience visuelle immersive.

J''ai assuré la direction, le montage et les effets visuels du projet.',
    2024,
    'scolaire',
    '/images/projects/film-cover.jpg',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    true,
    false,
    false,
    true
);

-- Projet Jeu Vidéo
INSERT INTO public.projects (
    title, slug, category_id, short_description, long_description, year, type,
    cover_image, gallery_images, external_url, featured, is_3d, is_game, is_audiovisual
) VALUES (
    'Prototype de Jeu Puzzle',
    'prototype-jeu-puzzle',
    (SELECT id FROM public.categories WHERE slug = 'developpement-web'),
    'Développement d''un prototype de jeu de puzzle en 2D avec Unity.',
    'Projet personnel de game design développant un jeu de puzzle original. Le concept repose sur la manipulation d''éléments lumineux pour résoudre des énigmes dans un univers onirique.

Le prototype comprend 5 niveaux jouables avec une difficulté progressive. J''ai travaillé sur le game design, la programmation, les assets graphiques et l''intégration sonore.',
    2024,
    'personnel',
    '/images/projects/game-cover.jpg',
    ARRAY['/images/projects/game-1.jpg', '/images/projects/game-2.jpg', '/images/projects/game-3.jpg'],
    'https://itch.io/votre-jeu',
    true,
    false,
    true,
    false
);

-- =============================================
-- LIAISONS PROJETS-TECHNOLOGIES
-- =============================================

-- UI Mobile
INSERT INTO public.project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM public.projects p, public.technologies t
WHERE p.slug = 'refonte-ui-mobile' AND t.name IN ('Figma', 'Adobe Illustrator');

-- Campagne événementielle
INSERT INTO public.project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM public.projects p, public.technologies t
WHERE p.slug = 'campagne-evenementielle' AND t.name IN ('Adobe Photoshop', 'Adobe Illustrator');

-- E-commerce
INSERT INTO public.project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM public.projects p, public.technologies t
WHERE p.slug = 'ecommerce-artisanal' AND t.name IN ('Nuxt', 'Vue.js', 'Tailwind CSS', 'TypeScript', 'Supabase');

-- 3D Low Poly
INSERT INTO public.project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM public.projects p, public.technologies t
WHERE p.slug = 'scene-3d-lowpoly' AND t.name IN ('Blender');

-- Court-métrage
INSERT INTO public.project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM public.projects p, public.technologies t
WHERE p.slug = 'court-metrage-experimental' AND t.name IN ('Adobe Premiere Pro', 'Adobe After Effects');

-- Jeu Puzzle
INSERT INTO public.project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM public.projects p, public.technologies t
WHERE p.slug = 'prototype-jeu-puzzle' AND t.name IN ('Unity');

-- =============================================
-- EXPÉRIENCES DE DÉMONSTRATION
-- =============================================

INSERT INTO public.experiences (title, company, location, start_date, end_date, is_current, description, responsibilities, "order") VALUES
(
    'Designer UI/UX Junior',
    'Agence Digitale XYZ',
    'Paris',
    '2025-09-01',
    NULL,
    true,
    'Conception d''interfaces utilisateur pour des applications web et mobiles dans différents secteurs d''activité.',
    ARRAY['Création de wireframes et prototypes interactifs', 'Collaboration avec les développeurs', 'Tests utilisateurs et itérations', 'Design system et composants réutilisables'],
    1
),
(
    'Stagiaire Communication Visuelle',
    'Studio Créatif ABC',
    'Lyon',
    '2024-04-01',
    '2024-08-31',
    false,
    'Stage de fin d''études axé sur la création de supports de communication print et digital.',
    ARRAY['Création d''identités visuelles', 'Mise en page de documents', 'Retouche photo', 'Gestion de projets clients'],
    2
);

-- =============================================
-- FORMATIONS DE DÉMONSTRATION
-- =============================================

INSERT INTO public.formations (title, school, location, start_date, end_date, is_current, description, diploma, "order") VALUES
(
    'Bachelor Design Graphique & Digital',
    'École de Design Créatif',
    'Paris',
    '2023-09-01',
    '2026-06-30',
    true,
    'Formation complète en design graphique, communication visuelle et développement web front-end.',
    'Bachelor (Bac+3)',
    1
),
(
    'BTS Communication Visuelle',
    'Lycée des Arts',
    'Lyon',
    '2021-09-01',
    '2023-06-30',
    false,
    'Formation initiale en communication visuelle et arts graphiques.',
    'BTS',
    2
);

-- =============================================
-- COMPÉTENCES DE DÉMONSTRATION
-- =============================================

-- Compétences techniques
INSERT INTO public.skills (name, category, level, "order") VALUES
('HTML/CSS', 'technique', 5, 1),
('JavaScript', 'technique', 4, 2),
('TypeScript', 'technique', 3, 3),
('Vue.js / Nuxt', 'technique', 4, 4),
('React', 'technique', 3, 5),
('Git', 'technique', 4, 6);

-- Compétences design
INSERT INTO public.skills (name, category, level, "order") VALUES
('UI Design', 'design', 5, 1),
('UX Design', 'design', 4, 2),
('Design System', 'design', 4, 3),
('Motion Design', 'design', 3, 4),
('Modélisation 3D', 'design', 3, 5);

-- Outils
INSERT INTO public.skills (name, category, level, "order") VALUES
('Figma', 'outil', 5, 1),
('Adobe Creative Suite', 'outil', 4, 2),
('Blender', 'outil', 3, 3),
('VS Code', 'outil', 5, 4);

-- Soft skills
INSERT INTO public.skills (name, category, level, "order") VALUES
('Créativité', 'soft-skill', 5, 1),
('Travail en équipe', 'soft-skill', 4, 2),
('Gestion de projet', 'soft-skill', 3, 3),
('Communication', 'soft-skill', 4, 4),
('Autonomie', 'soft-skill', 5, 5);
