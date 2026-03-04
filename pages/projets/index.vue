<script setup lang="ts">
import type { CategorySlug, ProjectType } from "~/types";

// Configuration de la page
definePageMeta({
  layout: "default",
});

useHead({
  title: "Projets",
});

// Composables
const route = useRoute();
const {
  fetchProjects,
  projects,
  loading,
  error,
  filters,
  availableTags,
  filterByCategory,
  filterByType,
  filterByTag,
  filteredProjects,
  resetFilters,
  fetchAvailableTags,
} = useProjects();
const { fetchCategories, categories } = useCategories();

// Récupérer les filtres depuis l'URL
const initialCategory = route.query.category as CategorySlug | undefined;
const initialTag = route.query.tag as string | undefined;

// Initialiser les filtres
if (initialCategory) {
  filters.value.category = initialCategory;
}
if (initialTag) {
  filters.value.tag = initialTag as any;
}

// Charger les données
await Promise.all([fetchProjects(), fetchCategories(), fetchAvailableTags()]);

// Watchers pour l'URL
watch(
  () => route.query.category,
  (newCategory) => {
    filterByCategory((newCategory as CategorySlug) || null);
  },
);

watch(
  () => route.query.tag,
  (newTag) => {
    filterByTag((newTag as string) || null);
  },
);

// Gestion de la recherche
const searchQuery = ref("");
const debouncedSearch = refDebounced(searchQuery, 300);

watch(debouncedSearch, (value) => {
  filters.value.search = value;
});

// Stats
const projectCount = computed(() => filteredProjects.value.length);
</script>

<template>
  <div>
    <!-- Header Section -->
    <section class="pt-12 pb-8">
      <div class="container-portfolio">
        <!-- Breadcrumb -->
        <nav class="mb-8 font-body text-sm text-gray-500">
          <NuxtLink to="/" class="hover:text-violet-pastel">Accueil</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-violet-pastel">Projets</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="title-primary mb-4">Mes Projets</h1>
          <p class="font-body text-body-lg text-gray-600">
            Découvrez l'ensemble de mes réalisations en design, communication et
            développement web. Filtrez par catégorie ou type pour trouver ce qui
            vous intéresse.
          </p>
        </div>
      </div>
    </section>

    <!-- Message d'erreur (diagnostic) -->
    <div v-if="error" class="container-portfolio pb-4">
      <div
        class="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 font-body text-body-sm"
      >
        <strong>Erreur Supabase :</strong> {{ error }}
      </div>
    </div>

    <!-- Filtres et Recherche -->
    <section class="pb-8">
      <div class="container-portfolio">
        <div class="card p-6 md:p-8">
          <div class="flex flex-col lg:flex-row lg:items-start gap-6">
            <!-- Filtres -->
            <div class="flex-1">
              <ProjectFilters
                :categories="categories"
                :selected-category="filters.category ?? null"
                :available-tags="availableTags"
                :selected-tag="filters.tag ?? null"
                @update:selected-category="filterByCategory"
                @update:selected-tag="filterByTag"
              />
            </div>

            <!-- Recherche et stats -->
            <div class="lg:w-72 space-y-4">
              <!-- Barre de recherche -->
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Rechercher un projet..."
                  class="w-full px-4 py-3 pl-10 rounded-full border border-violet-light focus:border-violet-pastel focus:ring-2 focus:ring-violet-light/50 outline-none transition-all font-body text-body-sm"
                />
                <svg
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <!-- Reset et compteur -->
              <div class="flex items-center justify-between">
                <span class="font-body text-sm text-gray-500">
                  {{ projectCount }} projet{{ projectCount > 1 ? "s" : "" }}
                </span>
                <button
                  v-if="filters.category || filters.type || filters.search"
                  class="font-body text-sm text-violet-pastel hover:underline"
                  @click="
                    resetFilters();
                    searchQuery = '';
                  "
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Grille de projets -->
    <section class="section-padding pt-8">
      <div class="container-portfolio">
        <ProjectGrid
          :projects="filteredProjects"
          :loading="loading"
          :columns="3"
        />
      </div>
    </section>
  </div>
</template>
