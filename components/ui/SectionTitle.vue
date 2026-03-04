<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  centered: false,
});
</script>

<template>
  <div :class="{ 'text-center': centered }">
    <h2 class="title-secondary mb-2">{{ title }}</h2>
    <p
      v-if="subtitle"
      class="font-body text-gray-600 max-w-xl"
      :class="{ 'mx-auto': centered }"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
