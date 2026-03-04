<script setup lang="ts">
import type { ProjectWithCategory } from "~/types";

interface Props {
  project: ProjectWithCategory;
}

const props = defineProps<Props>();

const { getCategoryColor } = useCategories();

const categoryColor = computed(() =>
  props.project.category
    ? getCategoryColor(props.project.category.slug)
    : "#A78BFA",
);

const typeLabels: Record<string, string> = {
  personnel: "Personnel",
  scolaire: "Scolaire",
  professionnel: "Pro",
};
</script>

<template>
  <article class="project-card group">
    <NuxtLink :to="`/projets/${project.slug}`" class="block">
      <!-- Image -->
      <div class="relative overflow-hidden">
        <img
          :src="project.cover_image || '/images/placeholder-project.jpg'"
          :alt="project.title"
          class="project-card-image"
          loading="lazy"
        />

        <!-- Overlay avec tags -->
        <div class="absolute top-4 left-4 flex gap-2">
          <!-- Tag catégorie -->
          <span
            class="tag text-white text-xs"
            :style="{ backgroundColor: categoryColor }"
          >
            {{ project.category?.name || "Autre" }}
          </span>

          <!-- Badge spécial -->
          <span v-if="project.is_3d" class="tag bg-gray-800 text-white text-xs">
            3D
          </span>
          <span
            v-if="project.is_game"
            class="tag bg-gray-800 text-white text-xs"
          >
            Jeu
          </span>
          <span
            v-if="project.is_audiovisual"
            class="tag bg-gray-800 text-white text-xs"
          >
            Vidéo
          </span>
        </div>

        <!-- Année -->
        <div class="absolute bottom-4 right-4">
          <span class="tag bg-white/90 text-gray-700 text-xs">
            {{ project.year }}
          </span>
        </div>
      </div>

      <!-- Contenu -->
      <div class="project-card-content">
        <div class="flex items-start justify-between gap-4 mb-2">
          <h3 class="font-display text-xl text-violet-pastel line-clamp-1">
            {{ project.title }}
          </h3>
          <span class="tag-secondary text-xs shrink-0">
            {{ typeLabels[project.type] || project.type }}
          </span>
        </div>

        <p class="text-gray-600 text-body-sm line-clamp-2" style="font-family: 'Poppins', sans-serif">
          {{ project.short_description }}
        </p>

        <!-- Indicateur de lien -->
        <div
          class="mt-4 flex items-center gap-2 text-violet-pastel font-body text-body-sm"
        >
          <span>Voir le projet</span>
          <svg
            class="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /* Standard line-clamp for compatibility */
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Standard line-clamp for broader compatibility */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
