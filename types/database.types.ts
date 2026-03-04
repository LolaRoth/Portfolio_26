// Types générés pour Supabase
// Ce fichier définit la structure de la base de données

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string | null;
          color: string | null;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          slug: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: number;
          title: string;
          slug: string;
          category_id: number;
          short_description: string;
          long_description: string | null;
          year: number;
          type: string;
          cover_image: string;
          gallery_images: string[] | null;
          video_url: string | null;
          external_url: string | null;
          tools: string[] | null;
          featured: boolean;
          is_3d: boolean;
          is_game: boolean;
          is_audiovisual: boolean;
          order: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          slug: string;
          category_id: number;
          short_description: string;
          long_description?: string | null;
          year: number;
          type: string;
          cover_image: string;
          gallery_images?: string[] | null;
          video_url?: string | null;
          external_url?: string | null;
          tools?: string[] | null;
          featured?: boolean;
          is_3d?: boolean;
          is_game?: boolean;
          is_audiovisual?: boolean;
          order?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          slug?: string;
          category_id?: number;
          short_description?: string;
          long_description?: string | null;
          year?: number;
          type?: string;
          cover_image?: string;
          gallery_images?: string[] | null;
          video_url?: string | null;
          external_url?: string | null;
          tools?: string[] | null;
          featured?: boolean;
          is_3d?: boolean;
          is_game?: boolean;
          is_audiovisual?: boolean;
          order?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      technologies: {
        Row: {
          id: number;
          name: string;
          icon: string | null;
          color: string | null;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          icon?: string | null;
          color?: string | null;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          icon?: string | null;
          color?: string | null;
          category?: string | null;
          created_at?: string;
        };
      };
      project_technologies: {
        Row: {
          id: number;
          project_id: number;
          technology_id: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          project_id: number;
          technology_id: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          project_id?: number;
          technology_id?: number;
          created_at?: string;
        };
      };
      experiences: {
        Row: {
          id: number;
          title: string;
          company: string;
          location: string | null;
          start_date: string;
          end_date: string | null;
          is_current: boolean;
          description: string;
          responsibilities: string[] | null;
          order: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          company: string;
          location?: string | null;
          start_date: string;
          end_date?: string | null;
          is_current?: boolean;
          description: string;
          responsibilities?: string[] | null;
          order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          company?: string;
          location?: string | null;
          start_date?: string;
          end_date?: string | null;
          is_current?: boolean;
          description?: string;
          responsibilities?: string[] | null;
          order?: number | null;
          created_at?: string;
        };
      };
      formations: {
        Row: {
          id: number;
          title: string;
          school: string;
          location: string | null;
          start_date: string;
          end_date: string | null;
          is_current: boolean;
          description: string | null;
          diploma: string | null;
          order: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          school: string;
          location?: string | null;
          start_date: string;
          end_date?: string | null;
          is_current?: boolean;
          description?: string | null;
          diploma?: string | null;
          order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          school?: string;
          location?: string | null;
          start_date?: string;
          end_date?: string | null;
          is_current?: boolean;
          description?: string | null;
          diploma?: string | null;
          order?: number | null;
          created_at?: string;
        };
      };
      skills: {
        Row: {
          id: number;
          name: string;
          category: string;
          level: number | null;
          icon: string | null;
          order: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          category: string;
          level?: number | null;
          icon?: string | null;
          order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          category?: string;
          level?: number | null;
          icon?: string | null;
          order?: number | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      project_type: "personnel" | "scolaire" | "professionnel";
      skill_category: "technique" | "design" | "soft-skill" | "outil";
    };
  };
}
