<script setup lang="ts">
import type { Category, CategorySlug } from "~/types";

interface Props {
  categories: Category[];
  selectedCategory: CategorySlug | null;
  availableTags?: string[];
  selectedTag?: string | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:selectedCategory": [value: CategorySlug | null];
  "update:selectedTag": [value: string | null];
}>();

const handleCategoryClick = (slug: CategorySlug | null) => {
  emit("update:selectedCategory", slug);
};

const handleTagChange = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value;
  emit("update:selectedTag", val === "" ? null : val);
};
</script>

<template>
  <div class="space-y-6">
    <!-- Filtres par catégorie -->
    <div>
      <h4 class="font-body text-gray-500 text-sm mb-3">Catégorie</h4>
      <div class="flex flex-wrap gap-2">
        <button
          :class="[
            selectedCategory === null
              ? 'filter-btn-active'
              : 'filter-btn-inactive',
          ]"
          @click="handleCategoryClick(null)"
        >
          Tous
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          :class="[
            selectedCategory === category.slug
              ? 'filter-btn-active'
              : 'filter-btn-inactive',
          ]"
          @click="handleCategoryClick(category.slug as CategorySlug)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
  </div>
  <!-- Filtre par tags -->
  <div>
    <h4 class="font-body text-gray-500 text-sm mb-3">Filtrer par domaine</h4>
    <select
      class="filter-select"
      @change="handleTagChange"
      :value="props.selectedTag ?? ''"
    >
      <option value="">Tous les domaines</option>
      <option v-for="tag in props.availableTags || []" :key="tag" :value="tag">
        {{ tag }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.filter-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(167, 139, 250, 0.3); /* violet-light/30 approximation */
  background: #ffffff;
}
</style>
