<script setup lang="ts">
import type { ProjectWithCategory } from "~/types";

interface Props {
  projects: ProjectWithCategory[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  columns: 3,
});

const gridClasses = computed(() => {
  const classes: Record<number, string> = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };
  return classes[props.columns] || classes[3];
});
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading" :class="['grid gap-6 md:gap-8', gridClasses]">
      <div v-for="i in 6" :key="i" class="card animate-pulse">
        <div class="aspect-project bg-violet-light/30" />
        <div class="p-6 space-y-3">
          <div class="h-6 bg-violet-light/30 rounded w-3/4" />
          <div class="h-4 bg-violet-light/20 rounded w-full" />
          <div class="h-4 bg-violet-light/20 rounded w-2/3" />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="projects.length === 0" class="text-center py-16">
      <div
        class="w-20 h-20 mx-auto mb-6 rounded-full bg-violet-light/30 flex items-center justify-center"
      >
        <svg
          class="w-10 h-10 text-violet-pastel/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h3 class="font-display text-xl text-violet-pastel mb-2">
        Aucun projet trouvé
      </h3>
      <p class="text-gray-600 font-body">
        Essayez de modifier les filtres pour voir plus de projets.
      </p>
    </div>

    <!-- Projects grid -->
    <div v-else :class="['grid gap-6 md:gap-8', gridClasses]">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>
