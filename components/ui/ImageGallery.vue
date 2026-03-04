<script setup lang="ts">
interface Props {
  images: string[];
  alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "Image du projet",
});

const selectedIndex = ref(0);
const isLightboxOpen = ref(false);

const selectedImage = computed(() => props.images[selectedIndex.value] || "");

const nextImage = () => {
  selectedIndex.value = (selectedIndex.value + 1) % props.images.length;
};

const prevImage = () => {
  selectedIndex.value =
    selectedIndex.value === 0
      ? props.images.length - 1
      : selectedIndex.value - 1;
};

const openLightbox = (index: number) => {
  selectedIndex.value = index;
  isLightboxOpen.value = true;
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
};

// Gestion du clavier
const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div v-if="images.length > 0">
    <!-- Grille de miniatures avec effet galerie -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Première image plus grande -->
      <button
        v-if="images.length >= 1"
        class="relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
        @click="openLightbox(0)"
      >
        <img
          :src="images[0]"
          :alt="`${alt} - 1`"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div
          class="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span
            class="text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full"
            >Voir en grand</span
          >
        </div>
      </button>

      <!-- Autres images -->
      <button
        v-for="(image, index) in images.slice(1)"
        :key="index + 1"
        class="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
        @click="openLightbox(index + 1)"
      >
        <img
          :src="image"
          :alt="`${alt} - ${index + 2}`"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-violet-pastel/0 group-hover:bg-violet-pastel/20 transition-colors duration-300"
        />
        <!-- Numéro en overlay -->
        <div
          class="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {{ index + 2 }}
        </div>
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-300"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isLightboxOpen"
          class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          @click.self="closeLightbox"
        >
          <!-- Bouton fermer -->
          <button
            class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            @click="closeLightbox"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Navigation -->
          <button
            v-if="images.length > 1"
            class="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            @click="prevImage"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            v-if="images.length > 1"
            class="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            @click="nextImage"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <!-- Image -->
          <img
            :src="selectedImage"
            :alt="alt"
            class="max-w-[90vw] max-h-[85vh] object-contain"
          />

          <!-- Indicateur -->
          <div
            v-if="images.length > 1"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
          >
            <span
              v-for="(_, index) in images"
              :key="index"
              class="w-2 h-2 rounded-full transition-colors cursor-pointer"
              :class="index === selectedIndex ? 'bg-white' : 'bg-white/40'"
              @click="selectedIndex = index"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
