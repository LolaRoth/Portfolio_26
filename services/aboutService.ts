// Service de gestion des expériences, formations et compétences

import type { Experience, Formation, Skill } from "~/types";

export const aboutService = {
  /**
   * Récupère toutes les expériences professionnelles
   */
  async getExperiences(client: any): Promise<Experience[]> {
    const { data, error } = await client
      .from("experiences")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Error fetching experiences:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Récupère toutes les formations
   */
  async getFormations(client: any): Promise<Formation[]> {
    const { data, error } = await client
      .from("formations")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Error fetching formations:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Récupère toutes les compétences
   */
  async getSkills(client: any): Promise<Skill[]> {
    const { data, error } = await client
      .from("skills")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching skills:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Récupère les compétences groupées par catégorie
   */
  async getSkillsByCategory(client: any): Promise<Record<string, Skill[]>> {
    const skills = await this.getSkills(client);

    return skills.reduce(
      (acc, skill) => {
        const category = skill.category || "autres";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>,
    );
  },

  /**
   * Récupère l'expérience actuelle
   */
  async getCurrentExperience(client: any): Promise<Experience | null> {
    const { data, error } = await client
      .from("experiences")
      .select("*")
      .eq("is_current", true)
      .single();

    if (error) {
      console.error("Error fetching current experience:", error);
      return null;
    }

    return data;
  },

  /**
   * Récupère la formation actuelle
   */
  async getCurrentFormation(client: any): Promise<Formation | null> {
    const { data, error } = await client
      .from("formations")
      .select("*")
      .eq("is_current", true)
      .single();

    if (error) {
      console.error("Error fetching current formation:", error);
      return null;
    }

    return data;
  },
};
