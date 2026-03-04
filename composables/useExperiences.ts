// Composable pour la gestion des expériences, formations et compétences

import { ref, computed } from "vue";
import type { Experience, Formation, Skill } from "~/types";
import { aboutService } from "~/services/aboutService";

export const useExperiences = () => {
  const client = useSupabaseClient();

  // State
  const experiences = ref<Experience[]>([]);
  const formations = ref<Formation[]>([]);
  const skills = ref<Skill[]>([]);
  const skillsByCategory = ref<Record<string, Skill[]>>({});
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const currentExperience = computed(
    () => experiences.value.find((exp) => exp.is_current) || null,
  );

  const currentFormation = computed(
    () => formations.value.find((form) => form.is_current) || null,
  );

  const pastExperiences = computed(() =>
    experiences.value.filter((exp) => !exp.is_current),
  );

  const pastFormations = computed(() =>
    formations.value.filter((form) => !form.is_current),
  );

  const technicalSkills = computed(() =>
    skills.value.filter((skill) => skill.category === "technique"),
  );

  const designSkills = computed(() =>
    skills.value.filter((skill) => skill.category === "design"),
  );

  const softSkills = computed(() =>
    skills.value.filter((skill) => skill.category === "soft-skill"),
  );

  const toolSkills = computed(() =>
    skills.value.filter((skill) => skill.category === "outil"),
  );

  // Actions
  const fetchExperiences = async () => {
    loading.value = true;
    error.value = null;
    try {
      experiences.value = await aboutService.getExperiences(client);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des expériences";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchFormations = async () => {
    loading.value = true;
    error.value = null;
    try {
      formations.value = await aboutService.getFormations(client);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des formations";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchSkills = async () => {
    loading.value = true;
    error.value = null;
    try {
      skills.value = await aboutService.getSkills(client);
      skillsByCategory.value = await aboutService.getSkillsByCategory(client);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des compétences";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchAllAboutData = async () => {
    loading.value = true;
    error.value = null;
    try {
      await Promise.all([fetchExperiences(), fetchFormations(), fetchSkills()]);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des données";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  // Helpers
  const formatDateRange = (
    startDate: string,
    endDate?: string | null,
    isCurrent?: boolean,
  ): string => {
    const start = new Date(startDate);
    const startStr = start.toLocaleDateString("fr-FR", {
      month: "short",
      year: "numeric",
    });

    if (isCurrent) {
      return `${startStr} - Présent`;
    }

    if (endDate) {
      const end = new Date(endDate);
      const endStr = end.toLocaleDateString("fr-FR", {
        month: "short",
        year: "numeric",
      });
      return `${startStr} - ${endStr}`;
    }

    return startStr;
  };

  const getSkillLevelLabel = (level: number): string => {
    if (level >= 5) return "Expert";
    if (level >= 4) return "Avancé";
    if (level >= 3) return "Intermédiaire";
    if (level >= 2) return "Débutant";
    return "Novice";
  };

  return {
    // State
    experiences,
    formations,
    skills,
    skillsByCategory,
    loading,
    error,

    // Computed
    currentExperience,
    currentFormation,
    pastExperiences,
    pastFormations,
    technicalSkills,
    designSkills,
    softSkills,
    toolSkills,

    // Actions
    fetchExperiences,
    fetchFormations,
    fetchSkills,
    fetchAllAboutData,

    // Helpers
    formatDateRange,
    getSkillLevelLabel,
  };
};
