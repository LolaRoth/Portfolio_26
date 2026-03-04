// Types TypeScript pour le portfolio

// ====================================
// Catégories
// ====================================

export type CategorySlug = "design" | "communication" | "developpement-web";

export interface Category {
  id: number;
  name: string;
  slug: CategorySlug;
  description?: string;
  color?: string;
  icon?: string;
  created_at: string;
}

// ====================================
// Projets
// ====================================

export type ProjectType = "personnel" | "scolaire" | "professionnel";

// Tags pour filtrer les projets
export type ProjectTag =
  | "design"
  | "communication"
  | "developpement-web"
  | "3d"
  | "audiovisuel";

export interface Project {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  category?: Category;
  short_description: string;
  long_description?: string;
  year: number;
  type: ProjectType;
  cover_image: string;
  gallery?: string[];
  video_url?: string;
  external_url?: string;
  featured: boolean;
  is_3d?: boolean;
  is_game?: boolean;
  is_audiovisual?: boolean;
  tags?: ProjectTag[];
  tools?: string[];
  prestataire?: string;
  order?: number;
  created_at: string;
  updated_at: string;
  // Relations
  technologies?: Technology[];
}

export interface ProjectWithCategory extends Project {
  category: Category;
}

// ====================================
// Technologies
// ====================================

export interface Technology {
  id: number;
  name: string;
  icon?: string;
  color?: string;
  category?: string;
  created_at: string;
}

export interface ProjectTechnology {
  id: number;
  project_id: number;
  technology_id: number;
  created_at: string;
}

// ====================================
// Expériences professionnelles
// ====================================

export interface Experience {
  id: number;
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  responsibilities?: string[];
  order?: number;
  created_at: string;
}

// ====================================
// Formations
// ====================================

export interface Formation {
  id: number;
  title: string;
  school: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  diploma?: string;
  order?: number;
  created_at: string;
}

// ====================================
// Compétences
// ====================================

export type SkillCategory = "technique" | "design" | "soft-skill" | "outil";

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  level?: number; // 1-5 ou pourcentage
  icon?: string;
  order?: number;
  created_at: string;
}

// ====================================
// Informations personnelles (About)
// ====================================

export interface PersonalInfo {
  name: string;
  title: string;
  photo: string;
  bio: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  cv_url?: string;
  github_url?: string;
  portfolio_url?: string;
}

// ====================================
// Filtres et états
// ====================================

export interface ProjectFilters {
  category?: CategorySlug | null;
  type?: ProjectType | null;
  year?: number | null;
  search?: string;
  tag?: ProjectTag | null;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

// ====================================
// API Responses
// ====================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationState;
  error: string | null;
}

// ====================================
// Navigation
// ====================================

export interface NavItem {
  label: string;
  to: string;
  icon?: string;
  children?: NavItem[];
}

// ====================================
// Section Spéciales (3D, Jeux, Audiovisuel)
// ====================================

export interface SpecialSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  projectCount?: number;
}
