// Composable pour la gestion des projets

import { ref, computed } from "vue";
import type {
  ProjectWithCategory,
  ProjectFilters,
  CategorySlug,
  ProjectType,
  Technology,
} from "~/types";
import { projectService } from "~/services/projectService";

export const useProjects = () => {
  const client = useSupabaseClient();

  // State
  const projects = ref<ProjectWithCategory[]>([]);
  const currentProject = ref<ProjectWithCategory | null>(null);
  const projectTechnologies = ref<Technology[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Filters state
  const filters = ref<ProjectFilters>({
    category: null,
    type: null,
    year: null,
    search: "",
  });

  // available tags
  const availableTags = ref<string[]>([]);

  // Computed
  const featuredProjects = computed(() =>
    projects.value.filter((p) => p.featured),
  );

  const projectsByCategory = computed(() => {
    const grouped: Record<string, ProjectWithCategory[]> = {};
    projects.value.forEach((project) => {
      const categorySlug = project.category?.slug || "autre";
      if (!grouped[categorySlug]) {
        grouped[categorySlug] = [];
      }
      grouped[categorySlug].push(project);
    });
    return grouped;
  });

  const specialProjects = computed(() => ({
    threeD: projects.value.filter((p) => p.is_3d),
    games: projects.value.filter((p) => p.is_game),
    audiovisual: projects.value.filter((p) => p.is_audiovisual),
  }));

  const filteredProjects = computed(() => {
    let result = [...projects.value];

    if (filters.value.category) {
      result = result.filter(
        (p) => p.category?.slug === filters.value.category,
      );
    }

    if (filters.value.type) {
      result = result.filter((p) => p.type === filters.value.type);
    }

    if (filters.value.year) {
      result = result.filter((p) => p.year === filters.value.year);
    }

    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.short_description.toLowerCase().includes(searchLower),
      );
    }

    // Filtre par tag (client-side)
    if (filters.value.tag) {
      const selectedTag = filters.value.tag as string;
      result = result.filter((p) => {
        if (!p.tags) return false;
        // Si on filtre par "développement web", inclure aussi les projets avec "dev"
        if (selectedTag.toLowerCase() === "développement web") {
          return p.tags.some((t: string) => 
            t.toLowerCase() === "développement web" || t.toLowerCase() === "dev"
          );
        }
        return p.tags.includes(selectedTag as any);
      });
    }

    return result;
  });

  // Actions
  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      projects.value = await projectService.getAll(client);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des projets";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchAvailableTags = async () => {
    try {
      availableTags.value = await projectService.getAvailableTags(client);
    } catch (e: any) {
      console.error("Error loading tags:", e.message || e);
    }
  };

  const fetchFilteredProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      projects.value = await projectService.getFiltered(client, filters.value);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des projets";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchProjectBySlug = async (slug: string) => {
    loading.value = true;
    error.value = null;
    try {
      currentProject.value = await projectService.getBySlug(client, slug);
      if (currentProject.value) {
        projectTechnologies.value = await projectService.getProjectTechnologies(
          client,
          currentProject.value.id,
        );
      }
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement du projet";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchFeaturedProjects = async (limit: number = 6) => {
    loading.value = true;
    error.value = null;
    try {
      projects.value = await projectService.getFeatured(client, limit);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des projets";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchSpecialProjects = async (type: "3d" | "game" | "audiovisual") => {
    loading.value = true;
    error.value = null;
    try {
      return await projectService.getSpecialProjects(client, type);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des projets";
      console.error(error.value);
      return [];
    } finally {
      loading.value = false;
    }
  };

  // Filter methods
  const setFilter = (key: keyof ProjectFilters, value: any) => {
    filters.value[key] = value;
  };

  const resetFilters = () => {
    filters.value = {
      category: null,
      type: null,
      year: null,
      search: "",
    };
  };

  const filterByCategory = (category: CategorySlug | null) => {
    filters.value.category = category;
  };

  const filterByTag = (tag: string | null) => {
    filters.value.tag = tag as any;
  };

  const filterByType = (type: ProjectType | null) => {
    filters.value.type = type;
  };

  return {
    // State
    projects,
    currentProject,
    projectTechnologies,
    loading,
    error,
    filters,
    availableTags,

    // Computed
    featuredProjects,
    projectsByCategory,
    specialProjects,
    filteredProjects,

    // Actions
    fetchProjects,
    fetchFilteredProjects,
    fetchProjectBySlug,
    fetchFeaturedProjects,
    fetchSpecialProjects,
    fetchAvailableTags,

    // Filter methods
    setFilter,
    resetFilters,
    filterByCategory,
    filterByType,
    filterByTag,
  };
};
