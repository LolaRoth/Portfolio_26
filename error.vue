<script setup lang="ts">
// Page d'erreur personnalisée
const props = defineProps<{
  error: {
    statusCode: number;
    statusMessage?: string;
    message?: string;
  };
}>();

const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return "Page non trouvée";
    case 500:
      return "Erreur serveur";
    default:
      return "Une erreur est survenue";
  }
});

const errorDescription = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return "La page que vous recherchez n'existe pas ou a été déplacée.";
    case 500:
      return "Une erreur interne s'est produite. Veuillez réessayer plus tard.";
    default:
      return props.error.message || "Une erreur inattendue s'est produite.";
  }
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div
    class="min-h-screen bg-grid-pattern flex items-center justify-center px-4"
  >
    <div class="text-center max-w-lg">
      <!-- Code erreur -->
      <div class="mb-8">
        <span
          class="font-display text-display-xl text-violet-pastel opacity-30"
        >
          {{ error.statusCode }}
        </span>
      </div>

      <!-- Titre -->
      <h1 class="font-display text-display-md text-violet-pastel mb-4">
        {{ errorTitle }}
      </h1>

      <!-- Description -->
      <p class="font-body text-body-lg text-gray-600 mb-8">
        {{ errorDescription }}
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="handleError" class="btn-primary">
          Retour à l'accueil
        </button>
        <NuxtLink to="/projets" class="btn-outline">
          Voir les projets
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
