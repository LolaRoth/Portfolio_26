<script setup lang="ts">
// App principale du portfolio
useHead({
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk ? `${titleChunk} | Portfolio 2026` : "Portfolio 2026";
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
