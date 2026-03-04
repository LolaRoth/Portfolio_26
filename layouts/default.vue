<template>
  <div class="min-h-screen flex flex-col bg-grid-pattern">
    <LayoutTheHeader />

    <main class="flex-1 pt-20">
      <slot />
    </main>

    <LayoutTheFooter />

    <!-- Bouton retour en haut -->
    <UiBackToTop />
  </div>
</template>
