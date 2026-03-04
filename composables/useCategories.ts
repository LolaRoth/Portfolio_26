// Composable pour la gestion des catégories

import { ref, computed } from "vue";
import type { Category } from "~/types";
import { categoryService } from "~/services/categoryService";

export const useCategories = () => {
  const client = useSupabaseClient();

  // State
  const categories = ref<Category[]>([]);
  const categoriesWithCount = ref<(Category & { project_count: number })[]>([]);
  const currentCategory = ref<Category | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const categoryOptions = computed(() =>
    categories.value.map((cat) => ({
      label: cat.name,
      value: cat.slug,
    })),
  );

  const categoryMap = computed(() => {
    const map: Record<string, Category> = {};
    categories.value.forEach((cat) => {
      map[cat.slug] = cat;
    });
    return map;
  });

  // Actions
  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      categories.value = await categoryService.getAll(client);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des catégories";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchCategoriesWithCount = async () => {
    loading.value = true;
    error.value = null;
    try {
      categoriesWithCount.value =
        await categoryService.getCategoriesWithCount(client);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement des catégories";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const fetchCategoryBySlug = async (slug: string) => {
    loading.value = true;
    error.value = null;
    try {
      currentCategory.value = await categoryService.getBySlug(client, slug);
    } catch (e: any) {
      error.value = e.message || "Erreur lors du chargement de la catégorie";
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const getCategoryColor = (slug: string): string => {
    const colors: Record<string, string> = {
      design: "#A78BFA",
      communication: "#F472B6",
      "developpement-web": "#E9D5FF",
    };
    return colors[slug] || "#A78BFA";
  };

  const getCategoryIcon = (slug: string): string => {
    const icons: Record<string, string> = {
      design: "palette",
      communication: "megaphone",
      "developpement-web": "code",
    };
    return icons[slug] || "folder";
  };

  return {
    // State
    categories,
    categoriesWithCount,
    currentCategory,
    loading,
    error,

    // Computed
    categoryOptions,
    categoryMap,

    // Actions
    fetchCategories,
    fetchCategoriesWithCount,
    fetchCategoryBySlug,

    // Helpers
    getCategoryColor,
    getCategoryIcon,
  };
};
