# Portfolio 2026

Portfolio personnel développé avec Nuxt 3, Tailwind CSS et Supabase.

## 🎨 Direction Artistique

- **Background** : Beige clair (#F5F1E8) avec grille visible
- **Couleur primaire** : Violet pastel (#A78BFA)
- **Couleur secondaire** : Rose doux (#F472B6)
- **Accent** : Violet très clair (#E9D5FF)
- **Typographie titres** : Motley Forces
- **Typographie body** : Super Malibu

## 📁 Structure du projet

```
Portfolio26/
├── assets/
│   └── css/
│       └── main.css          # Styles globaux et fonts
├── components/
│   ├── layout/
│   │   ├── TheHeader.vue     # Navigation principale
│   │   └── TheFooter.vue     # Pied de page
│   ├── project/
│   │   ├── ProjectCard.vue   # Carte de projet
│   │   ├── ProjectGrid.vue   # Grille de projets
│   │   └── ProjectFilters.vue # Filtres de projets
│   └── ui/
│       ├── ImageGallery.vue  # Galerie avec lightbox
│       ├── VideoEmbed.vue    # Intégration vidéo
│       └── TechStack.vue     # Tags de technologies
├── composables/
│   ├── useProjects.ts        # Logique des projets
│   ├── useCategories.ts      # Logique des catégories
│   └── useExperiences.ts     # Logique CV (expériences, formations, skills)
├── layouts/
│   └── default.vue           # Layout principal
├── pages/
│   ├── index.vue             # Page d'accueil
│   ├── projets/
│   │   ├── index.vue         # Liste des projets
│   │   └── [slug].vue        # Page projet dynamique
│   └── a-propos.vue          # Page À propos
├── services/
│   ├── projectService.ts     # Service Supabase projets
│   ├── categoryService.ts    # Service Supabase catégories
│   └── aboutService.ts       # Service Supabase CV
├── supabase/
│   ├── schema.sql            # Structure de la BDD
│   └── seed.sql              # Données de démo
├── types/
│   ├── index.ts              # Types TypeScript
│   └── database.types.ts     # Types Supabase
├── public/
│   ├── fonts/                # Typographies (à ajouter)
│   └── images/               # Images statiques
├── nuxt.config.ts            # Configuration Nuxt
├── tailwind.config.ts        # Configuration Tailwind
└── package.json
```

## 🚀 Installation

### 1. Cloner et installer les dépendances

```bash
cd Portfolio26
npm install
```

### 2. Configuration Supabase

1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Dans l'éditeur SQL, exécutez les scripts :
   - `supabase/schema.sql` (structure des tables)
   - `supabase/seed.sql` (données de démonstration)
4. Récupérez votre URL et clé anon dans les paramètres du projet

### 3. Variables d'environnement

Créez un fichier `.env` à la racine :

```env
SUPABASE_URL=https://wzjhixamkovslcgndmcc.supabase.co
SUPABASE_KEY=votre_cle_anon_ici
```

### 4. Typographies

Ajoutez vos fichiers de police dans `public/fonts/` :

- `MotleyForces.woff2` (et .woff, .ttf)
- `SuperMalibu.woff2` (et .woff, .ttf)

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur http://localhost:3000

## 📦 Build et déploiement

```bash
# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Générer un site statique
npm run generate
```

## 🗄️ Base de données

### Tables principales

| Table                  | Description                              |
| ---------------------- | ---------------------------------------- |
| `categories`           | Design, Communication, Développement Web |
| `projects`             | Tous les projets du portfolio            |
| `technologies`         | Technologies utilisées                   |
| `project_technologies` | Relation many-to-many                    |
| `experiences`          | Expériences professionnelles             |
| `formations`           | Formations et diplômes                   |
| `skills`               | Compétences par catégorie                |

### Champs spéciaux des projets

- `is_3d` : Projet de modélisation 3D
- `is_game` : Projet de jeu vidéo
- `is_audiovisual` : Projet audiovisuel/vidéo
- `featured` : Mis en avant sur la page d'accueil

## 🎯 Fonctionnalités

- ✅ Page d'accueil avec hero et projets à la une
- ✅ Grille de projets avec filtres (catégorie, type)
- ✅ Pages projets dynamiques avec galerie et vidéo
- ✅ Page À propos avec CV (expériences, formations, skills)
- ✅ Design responsive
- ✅ Navigation fluide
- ✅ Optimisé pour SEO
- ⏳ Animations GSAP (structure prête)

## 📝 Personnalisation

### Modifier les informations personnelles

Éditez les données dans `/pages/a-propos.vue` :

```typescript
const personalInfo = {
  name: "Votre Nom",
  title: "Votre titre",
  photo: "/images/photo-profil.jpg",
  bio: "Votre biographie...",
  email: "votre@email.com",
  linkedin_url: "https://linkedin.com/in/votre-profil",
  cv_url: "/cv.pdf",
};
```

### Ajouter des projets

1. Via l'interface Supabase (Table Editor)
2. Ou via SQL dans l'éditeur Supabase

## 🛠️ Technologies utilisées

- [Nuxt 3](https://nuxt.com/) - Framework Vue.js
- [Tailwind CSS](https://tailwindcss.com/) - CSS utilitaire
- [Supabase](https://supabase.com/) - Backend as a Service
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [VueUse](https://vueuse.org/) - Utilitaires Vue

## 📄 Licence

Projet personnel - Tous droits réservés
