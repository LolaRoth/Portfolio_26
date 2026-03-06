<script setup lang="ts">
import { ref, onMounted } from "vue";

// Page d'accueil du portfolio
definePageMeta({
  layout: "default",
});

useHead({
  title: "Accueil",
});

const { fetchFeaturedProjects, projects, loading } = useProjects();

// Charger les données
await fetchFeaturedProjects(6);

// Éléments du marquee/bandeau défilant
const marqueeItems = [
  "Identité Visuelle",
  "UX/UI Design",
  "Développement Front",
  "Communication",
  "3D",
];

// Typewriter effect pour le nom
const typedName = ref("");
const showCursor = ref(true);

const typeWriter = () => {
  const name = "Lola Roth";
  let i = 0;

  const type = () => {
    if (i < name.length) {
      typedName.value += name.charAt(i);
      i++;
      setTimeout(type, 100);
    } else {
      setInterval(() => {
        showCursor.value = !showCursor.value;
      }, 530);
    }
  };

  setTimeout(type, 800);
};

onMounted(() => {
  typeWriter();
});
</script>

<template>
  <div>
    <!-- Hero Section - Layout matching the design mockup -->
    <section class="min-h-[80vh] flex items-center justify-center relative">
      <div class="container-portfolio">
        <div class="relative flex flex-col items-center">
          <!-- Row 1: "Portfolio" with "2026" positioned to the right -->
          <div class="relative">
            <h1
              class="font-display text-[5rem] md:text-[7rem] lg:text-[9rem] text-violet-pastel leading-none tracking-tight"
            >
              Portfolio
            </h1>
            <!-- 2026 positioned to the bottom-right of Portfolio -->
            <span
              class="font-display text-xl md:text-2xl text-rose-soft absolute -right-4 bottom-0 translate-x-full"
            >
              2026
            </span>
          </div>

          <!-- Row 2: Mascot + "Lola Roth" -->
          <div class="flex items-center gap-4 mt-2">
            <img
              src="/images/mascot.png"
              alt="Mascotte"
              class="w-20 h-20 md:w-28 md:h-28 object-contain"
            />
            <p
              class="font-display text-3xl md:text-4xl lg:text-5xl text-rose-soft tracking-tight"
            >
              Lola Roth
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Marquee / Bandeau défilant -->
    <div class="bg-rose-soft py-3 overflow-hidden">
      <div class="marquee-container">
        <div class="marquee-content">
          <template
            v-for="(item, index) in [...marqueeItems, ...marqueeItems]"
            :key="index"
          >
            <span class="font-display text-white text-lg mx-4">{{ item }}</span>
            <span class="text-yellow-300 mx-2">★</span>
          </template>
        </div>
      </div>
    </div>

    <!-- Mini À propos Section -->
    <section class="section-padding bg-white/50">
      <div class="container-portfolio">
        <div class="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Photo -->
          <div class="relative flex justify-center">
            <div class="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <!-- Cercle décoratif arrière -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-violet-light/40 to-rose-soft/30 rounded-full blur-xl scale-125"
              ></div>
              <div
                class="absolute inset-4 bg-white/50 backdrop-blur-sm rounded-full border border-white/30"
              ></div>

              <!-- Photo -->
              <img
                src="/images/photo-detoure.webp"
                alt="Lola Roth"
                class="absolute inset-0 w-full h-full object-contain z-10 drop-shadow-2xl"
              />

              <!-- Petits éléments décoratifs -->
              <div
                class="absolute -top-4 -left-4 w-10 h-10 border-2 border-violet-pastel/40 rounded-xl rotate-12"
              ></div>
              <div
                class="absolute -bottom-2 -left-6 w-5 h-5 bg-rose-soft/60 rounded-full"
              ></div>
              <div
                class="absolute top-1/4 -right-4 w-3 h-3 bg-violet-pastel rounded-full animate-bounce"
              ></div>
            </div>
          </div>

          <!-- Texte -->
          <div>
            <!-- Badge métier -->
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-violet-light/30 text-violet-pastel rounded-full text-sm mb-6"
            >
              <span
                class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              ></span>
              Chargée de communication
            </div>

            <h2 class="title-secondary text-gray-800 mb-2">Hello, je suis</h2>
            <h2 class="title-secondary mb-4">
              <span class="text-violet-pastel">{{ typedName }}</span>
              <span
                class="inline-block w-0.5 h-8 bg-violet-pastel ml-1 align-middle"
                :class="showCursor ? 'opacity-100' : 'opacity-0'"
              ></span>
              <span class="inline-block ml-2 animate-wave">👋</span>
            </h2>
            <p class="font-body text-gray-600 text-lg leading-relaxed mb-6">
              Actuellement en alternance à la Communauté de communes Val de Gray
              en tant que chargée de communication.
            </p>
            <NuxtLink
              to="/a-propos"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-pastel to-rose-soft text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              En découvrir plus sur moi →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Projets Featured Section -->
    <section class="section-padding">
      <div class="container-portfolio">
        <div
          class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 class="title-secondary mb-2">Projets à la une</h2>
            <p class="font-body text-gray-600">
              Une sélection de mes réalisations les plus marquantes.
            </p>
          </div>
          <NuxtLink to="/projets" class="btn-ghost">
            Voir tous les projets →
          </NuxtLink>
        </div>

        <ProjectGrid :projects="projects" :loading="loading" />
      </div>
    </section>

    <!-- CTA Final - Contact simplifié -->
    <section
      id="contact"
      class="section-padding bg-gradient-to-br from-violet-light/20 via-white to-rose-soft/10 relative overflow-hidden"
    >
      <!-- Decorative elements -->
      <div
        class="absolute top-10 left-10 w-32 h-32 bg-violet-pastel/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-40 h-40 bg-rose-soft/10 rounded-full blur-3xl"
      ></div>

      <div class="container-portfolio relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <span
            class="inline-block px-4 py-2 bg-gradient-to-r from-violet-pastel/20 to-rose-soft/20 text-violet-pastel rounded-full font-body text-sm mb-6"
          >
            ✨ Disponible pour de nouveaux projets
          </span>
          <h2
            class="font-display text-3xl sm:text-4xl lg:text-display-sm text-violet-pastel mb-6"
          >
            Envie de collaborer ?
          </h2>
          <p
            class="font-body text-base sm:text-lg text-gray-600 mb-10 max-w-xl mx-auto"
          >
            Je suis toujours ouverte à de nouvelles opportunités et
            collaborations créatives. N'hésitez pas à me contacter par email ou
            sur LinkedIn !
          </p>

          <!-- Contact Cards -->
          <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="mailto:lolaroth08@gmail.com"
              class="flex items-center gap-4 p-5 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-violet-light/20 min-w-[280px]"
            >
              <div
                class="w-14 h-14 rounded-full bg-gradient-to-br from-violet-light to-violet-pastel flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <span class="text-white text-2xl">✉</span>
              </div>
              <div class="text-left">
                <p class="font-body text-sm text-gray-400 mb-1">Email</p>
                <p class="font-body text-violet-pastel font-medium">
                  lolaroth08@gmail.com
                </p>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/lolaroth/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-5 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-rose-soft/20 min-w-[280px]"
            >
              <div
                class="w-14 h-14 rounded-full bg-gradient-to-br from-rose-soft/50 to-rose-soft flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <span class="text-white text-xl font-bold">in</span>
              </div>
              <div class="text-left">
                <p class="font-body text-sm text-gray-400 mb-1">LinkedIn</p>
                <p class="font-body text-rose-soft font-medium">Lola Roth</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Animation du marquee */
.marquee-container {
  display: flex;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
