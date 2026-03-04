// Service de gestion des catégories avec Supabase

import type { Category } from "~/types";

export const categoryService = {
  /**
   * Récupère toutes les catégories
   */
  async getAll(client: any): Promise<Category[]> {
    const { data, error } = await client
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Récupère une catégorie par son slug
   */
  async getBySlug(client: any, slug: string): Promise<Category | null> {
    const { data, error } = await client
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching category by slug:", error);
      return null;
    }

    return data;
  },

  /**
   * Récupère une catégorie par son ID
   */
  async getById(client: any, id: number): Promise<Category | null> {
    const { data, error } = await client
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching category by id:", error);
      return null;
    }

    return data;
  },

  /**
   * Récupère le nombre de projets par catégorie
   */
  async getCategoriesWithCount(
    client: any,
  ): Promise<(Category & { project_count: number })[]> {
    const { data: categories, error: catError } = await client
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (catError) {
      console.error("Error fetching categories:", catError);
      throw catError;
    }

    // Récupérer le count pour chaque catégorie
    const categoriesWithCount = await Promise.all(
      (categories || []).map(async (category: Category) => {
        const { count, error: countError } = await client
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("category_id", category.id);

        return {
          ...category,
          project_count: countError ? 0 : count || 0,
        };
      }),
    );

    return categoriesWithCount;
  },
};
