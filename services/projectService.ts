// Service de gestion des projets avec Supabase

import type {
  Project,
  ProjectWithCategory,
  ProjectFilters,
  Category,
  Technology,
} from "~/types";

export const projectService = {
  /**
   * Récupère tous les projets avec leurs catégories
   */
  async getAll(client: any): Promise<ProjectWithCategory[]> {
    const { data, error } = await client
      .from("projects")
      .select(
        `
        *,
        category:categories(*)
      `,
      )
      .order("year", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }

    console.log(
      "[projectService.getAll] rows returned:",
      data?.length ?? 0,
      data,
    );
    return data || [];
  },

  /**
   * Récupère les projets avec filtres
   */
  async getFiltered(
    client: any,
    filters: ProjectFilters,
  ): Promise<ProjectWithCategory[]> {
    let query = client.from("projects").select(`
        *,
        category:categories(*)
      `);

    // Filtre par catégorie
    if (filters.category) {
      const { data: categoryData } = await client
        .from("categories")
        .select("id")
        .eq("slug", filters.category)
        .single();

      if (categoryData) {
        query = query.eq("category_id", categoryData.id);
      }
    }

    // Filtre par type de projet
    if (filters.type) {
      query = query.eq("type", filters.type);
    }

    // Filtre par année
    if (filters.year) {
      query = query.eq("year", filters.year);
    }

    // Recherche par titre ou description
    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`,
      );
    }

    // Filtre par tag (tags est un tableau texte dans la table projects)
    if (filters.tag) {
      query = query.contains('tags', [filters.tag]);
    }

    const { data, error } = await query.order("year", { ascending: false });

    if (error) {
      console.error("Error fetching filtered projects:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Récupère un projet par son slug
   */
  async getBySlug(
    client: any,
    slug: string,
  ): Promise<ProjectWithCategory | null> {
    const { data, error } = await client
      .from("projects")
      .select(
        `
        *,
        category:categories(*)
      `,
      )
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching project by slug:", error);
      return null;
    }

    return data;
  },

  /**
   * Récupère les technologies d'un projet
   */
  async getProjectTechnologies(
    client: any,
    projectId: number,
  ): Promise<Technology[]> {
    const { data, error } = await client
      .from("project_technologies")
      .select(
        `
        technology:technologies(*)
      `,
      )
      .eq("project_id", projectId);

    if (error) {
      console.error("Error fetching project technologies:", error);
      throw error;
    }

    return data?.map((item: any) => item.technology) || [];
  },

  /**
   * Récupère les projets mis en avant
   */
  async getFeatured(
    client: any,
    limit: number = 6,
  ): Promise<ProjectWithCategory[]> {
    const { data, error } = await client
      .from("projects")
      .select(
        `
        *,
        category:categories(*)
      `,
      )
      .eq("featured", true)
      .order("year", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching featured projects:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Récupère les projets spéciaux (3D, jeux, audiovisuel)
   */
  async getSpecialProjects(
    client: any,
    type: "3d" | "game" | "audiovisual",
  ): Promise<ProjectWithCategory[]> {
    let query = client.from("projects").select(`
        *,
        category:categories(*)
      `);

    if (type === "3d") {
      query = query.eq("is_3d", true);
    } else if (type === "game") {
      query = query.eq("is_game", true);
    } else if (type === "audiovisual") {
      query = query.eq("is_audiovisual", true);
    }

    const { data, error } = await query.order("year", { ascending: false });

    if (error) {
      console.error("Error fetching special projects:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Récupère les projets par catégorie
   */
  async getByCategory(
    client: any,
    categorySlug: string,
  ): Promise<ProjectWithCategory[]> {
    const { data: categoryData } = await client
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (!categoryData) return [];

    const { data, error } = await client
      .from("projects")
      .select(
        `
        *,
        category:categories(*)
      `,
      )
      .eq("category_id", categoryData.id)
      .order("year", { ascending: false });

    if (error) {
      console.error("Error fetching projects by category:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Récupère les années disponibles (pour filtres)
   */
  async getAvailableYears(client: any): Promise<number[]> {
    const { data, error } = await client
      .from("projects")
      .select("year")
      .order("year", { ascending: false });

    if (error) {
      console.error("Error fetching years:", error);
      throw error;
    }

    // Dédupliquer les années
    const years = [...new Set(data?.map((p: any) => p.year))] as number[];
    return years;
  },

  /**
   * Récupère la liste des tags utilisés dans les projets
   */
  async getAvailableTags(client: any): Promise<string[]> {
    // Récupère les valeurs distinctes depuis la colonne `tags` (TEXT[])
    const { data, error } = await client
      .from("projects")
      .select("tags");

    if (error) {
      console.error("Error fetching project tags:", error);
      throw error;
    }

    const tagsSet = new Set<string>();
    (data || []).forEach((row: any) => {
      if (Array.isArray(row.tags)) {
        row.tags.forEach((t: string) => {
          // Normaliser "dev" en "développement web"
          const normalizedTag = t.toLowerCase() === "dev" ? "développement web" : t;
          tagsSet.add(normalizedTag);
        });
      }
    });

    return Array.from(tagsSet).sort();
  },
};
