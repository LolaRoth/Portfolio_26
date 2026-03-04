<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

definePageMeta({
  layout: "default",
});

useHead({
  title: "À propos",
});

const { fetchAllAboutData, experiences, formations, loading, formatDateRange } =
  useExperiences();

await fetchAllAboutData();

// Refs pour les animations
const isVisible = ref(false);
const typedName = ref("");
const showCursor = ref(true);
const toolsSection = ref<HTMLElement | null>(null);

// Informations personnelles
const personalInfo = {
  name: "Lola Roth",
  title: "Designer & Développeuse Web",
  bio: `Passionnée par le design et le développement web, je crée des expériences numériques uniques et engageantes. Mon parcours m'a permis d'explorer différentes facettes de la création digitale, du design graphique au développement front-end, en passant par la communication visuelle.`,
  email: "lolaroth08@gmail.com",
  linkedin_url: "https://www.linkedin.com/in/lolaroth/",
  cv_url: "/cv.pdf",
};

// Centres d'intérêt
const interests = [
  { emoji: "🎨", label: "Design" },
  { emoji: "💻", label: "Code" },
  { emoji: "🎬", label: "Cinéma" },
  { emoji: "🎮", label: "Jeux vidéo" },
  { emoji: "🎵", label: "Musique" },
  { emoji: "✈️", label: "Voyages" },
];

// Outils avec logos (via devicon CDN)
const tools = [
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
  },
  {
    name: "Illustrator",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  },
  {
    name: "InDesign",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg",
  },
  {
    name: "DaVinci Resolve",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg",
  },
  {
    name: "Blender",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
  },
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "Nuxt",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
  },
  {
    name: "Vue.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "TailwindCSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
];

// Typewriter effect
const typeWriter = () => {
  const name = personalInfo.name;
  let i = 0;

  const type = () => {
    if (i < name.length) {
      typedName.value += name.charAt(i);
      i++;
      setTimeout(type, 100);
    } else {
      // Clignotement du curseur après la fin
      setInterval(() => {
        showCursor.value = !showCursor.value;
      }, 530);
    }
  };

  // Démarrer après un délai
  setTimeout(type, 800);
};

// Contexte GSAP pour cleanup
let gsapContext: any = null;

onMounted(async () => {
  // Animation d'entrée
  setTimeout(() => {
    isVisible.value = true;
  }, 100);

  // Lancer le typewriter
  typeWriter();

  // Import dynamique de GSAP côté client uniquement
  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  // GSAP animations avec contexte pour cleanup propre
  gsapContext = gsap.context(() => {
    // Animation des outils au scroll (sans rotation)
    gsap.from(".tool-item", {
      scrollTrigger: {
        trigger: "#tools-section",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: "power2.out",
    });

    // Animation parallax sur les formes décoratives
    gsap.to(".deco-shape-1", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      y: -200,
      rotation: 180,
    });

    gsap.to(".deco-shape-2", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      y: -150,
      rotation: -90,
    });

    // Animation des cards expériences
    gsap.from(".exp-card", {
      scrollTrigger: {
        trigger: "#experiences-section",
        start: "top 80%",
      },
      x: -50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "power2.out",
    });

    // Animation des cards formations
    gsap.from(".formation-card", {
      scrollTrigger: {
        trigger: "#formations-section",
        start: "top 80%",
      },
      scale: 0.8,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
      ease: "back.out(1.4)",
    });
  });
});

onUnmounted(() => {
  // Cleanup GSAP
  if (gsapContext) {
    gsapContext.revert();
  }
});
</script>

<template>
  <div class="min-h-screen relative">
    <!-- Formes décoratives en arrière-plan (avec overflow hidden sur le parent) -->
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div
        class="deco-shape-1 absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-violet-pastel/20 to-rose-soft/15 rounded-full blur-3xl"
      ></div>
      <div
        class="deco-shape-2 absolute top-1/2 -left-48 w-80 h-80 bg-gradient-to-br from-rose-soft/15 to-violet-light/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/3 w-64 h-64 bg-violet-light/10 rounded-full blur-3xl"
      ></div>
    </div>

    <!-- Breadcrumb -->
    <section class="pt-12 pb-4">
      <div class="container-portfolio">
        <nav
          class="font-body text-sm text-gray-500 transition-all duration-500"
          :class="isVisible ? 'opacity-100' : 'opacity-0'"
        >
          <NuxtLink to="/" class="hover:text-violet-pastel transition-colors"
            >Accueil</NuxtLink
          >
          <span class="mx-2">/</span>
          <span class="text-violet-pastel font-medium">À propos</span>
        </nav>
      </div>
    </section>

    <!-- Hero Section -->
    <section class="py-12 lg:py-20">
      <div class="container-portfolio">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Photo -->
          <div
            class="relative flex justify-center order-1 transition-all duration-700"
            :class="
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            "
          >
            <div
              class="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]"
            >
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
                :alt="personalInfo.name"
                class="absolute inset-0 w-full h-full object-contain z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />

              <!-- Petits éléments décoratifs - agrandis -->
              <div
                class="absolute -top-6 -left-6 w-12 h-12 border-3 border-violet-pastel/40 rounded-xl rotate-12"
              ></div>
              <div
                class="absolute -bottom-4 -left-8 w-6 h-6 bg-rose-soft/60 rounded-full"
              ></div>
              <div
                class="absolute top-1/4 -right-6 w-4 h-4 bg-violet-pastel rounded-full animate-bounce"
              ></div>
              <div
                class="absolute top-1/2 -left-10 w-3 h-3 bg-violet-light rounded-full animate-pulse"
              ></div>
              <div
                class="absolute -top-2 right-1/4 w-5 h-5 border-2 border-rose-soft/50 rounded-full"
              ></div>
            </div>
          </div>

          <!-- Texte -->
          <div
            class="lg:order-2 order-1 transition-all duration-700 delay-200"
            :class="
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            "
          >
            <!-- Badge métier -->
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-violet-light/30 text-violet-pastel rounded-full text-sm mb-6"
            >
              <span
                class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              ></span>
              {{ personalInfo.title }}
            </div>

            <!-- Titre avec typewriter -->
            <h1 class="text-4xl lg:text-5xl font-display font-bold mb-6">
              <span class="text-gray-800">Hello, je suis</span>
              <br />
              <span class="text-violet-pastel">{{ typedName }}</span>
              <span
                class="inline-block w-0.5 h-10 bg-violet-pastel ml-1 align-middle"
                :class="showCursor ? 'opacity-100' : 'opacity-0'"
              ></span>
              <span class="inline-block ml-2 animate-wave">👋</span>
            </h1>

            <p
              class="text-gray-600 text-lg leading-relaxed mb-8"
              style="font-family: &quot;Poppins&quot;, sans-serif"
            >
              {{ personalInfo.bio }}
            </p>

            <!-- Intérêts -->
            <div class="mb-8">
              <p class="text-sm text-gray-500 mb-3">Ce qui me passionne</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="interest in interests"
                  :key="interest.label"
                  class="px-4 py-2 bg-white rounded-full text-sm shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default"
                >
                  {{ interest.emoji }} {{ interest.label }}
                </span>
              </div>
            </div>

            <!-- Boutons -->
            <div class="flex flex-wrap gap-4">
              <a
                :href="personalInfo.cv_url"
                download
                class="px-6 py-3 bg-gradient-to-r from-violet-pastel to-rose-soft text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                📄 Télécharger mon CV
              </a>
              <a
                :href="personalInfo.linkedin_url"
                target="_blank"
                rel="noopener"
                class="px-6 py-3 bg-white text-violet-pastel border-2 border-violet-pastel/30 rounded-full font-medium hover:border-violet-pastel hover:bg-violet-light/10 transition-all"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Expériences -->
    <section id="experiences-section" class="py-16 lg:py-24">
      <div class="container-portfolio">
        <div class="max-w-3xl mx-auto">
          <!-- Titre -->
          <div class="flex items-center gap-4 mb-10">
            <div
              class="w-12 h-12 bg-gradient-to-br from-violet-pastel to-violet-light rounded-xl flex items-center justify-center shadow-lg"
            >
              <span class="text-xl">💼</span>
            </div>
            <div>
              <h2
                class="text-2xl lg:text-3xl font-display font-bold text-gray-800"
              >
                Expériences
              </h2>
              <p class="text-gray-500">Mon parcours professionnel</p>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="space-y-4">
            <div
              v-for="i in 3"
              :key="i"
              class="animate-pulse bg-white rounded-xl p-6"
            >
              <div class="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div class="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>

          <!-- Empty -->
          <div
            v-else-if="experiences.length === 0"
            class="text-center py-12 bg-white/50 rounded-2xl"
          >
            <span class="text-4xl block mb-2">🔍</span>
            <p class="text-gray-500">Aucune expérience renseignée.</p>
          </div>

          <!-- Liste -->
          <div v-else class="space-y-4">
            <div
              v-for="exp in experiences"
              :key="exp.id"
              class="exp-card bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border-l-4 border-violet-pastel"
            >
              <div
                class="flex flex-wrap justify-between items-start gap-4 mb-2"
              >
                <div>
                  <h3 class="text-lg font-display font-semibold text-gray-800">
                    {{ exp.title }}
                  </h3>
                  <p class="text-rose-soft font-medium">{{ exp.company }}</p>
                </div>
                <div class="flex gap-2">
                  <span
                    v-if="exp.is_current"
                    class="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full"
                  >
                    Actuel
                  </span>
                  <span
                    class="px-3 py-1 bg-violet-light/30 text-violet-pastel text-xs rounded-full"
                  >
                    {{
                      formatDateRange(
                        exp.start_date,
                        exp.end_date,
                        exp.is_current,
                      )
                    }}
                  </span>
                </div>
              </div>

              <p v-if="exp.location" class="text-sm text-gray-400 mb-2">
                📍 {{ exp.location }}
              </p>

              <p
                v-if="exp.description"
                class="text-gray-600 leading-relaxed"
                style="font-family: &quot;Poppins&quot;, sans-serif"
              >
                {{ exp.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formations -->
    <section
      id="formations-section"
      class="py-16 lg:py-24 bg-gradient-to-br from-violet-light/5 to-rose-soft/5"
    >
      <div class="container-portfolio">
        <div class="max-w-3xl mx-auto">
          <!-- Titre -->
          <div class="flex items-center gap-4 mb-10">
            <div
              class="w-12 h-12 bg-gradient-to-br from-rose-soft to-pink-400 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span class="text-xl">🎓</span>
            </div>
            <div>
              <h2
                class="text-2xl lg:text-3xl font-display font-bold text-gray-800"
              >
                Formations
              </h2>
              <p class="text-gray-500">Mon parcours académique</p>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="i in 2"
              :key="i"
              class="animate-pulse bg-white rounded-xl p-6"
            >
              <div class="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div class="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>

          <!-- Empty -->
          <div
            v-else-if="formations.length === 0"
            class="text-center py-12 bg-white/50 rounded-2xl"
          >
            <span class="text-4xl block mb-2">📚</span>
            <p class="text-gray-500">Aucune formation renseignée.</p>
          </div>

          <!-- Liste -->
          <div v-else class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="formation in formations"
              :key="formation.id"
              class="formation-card bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div class="mb-3">
                <span
                  v-if="formation.is_current"
                  class="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-soft/20 text-rose-soft text-xs rounded-full mb-2"
                >
                  <span
                    class="w-1.5 h-1.5 bg-rose-soft rounded-full animate-pulse"
                  ></span>
                  En cours
                </span>
                <h3 class="text-lg font-display font-semibold text-gray-800">
                  {{ formation.title }}
                </h3>
              </div>

              <p class="text-rose-soft font-medium mb-2">
                {{ formation.school }}
              </p>

              <div class="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                <span class="px-2 py-1 bg-gray-100 rounded-full">
                  📅
                  {{
                    formatDateRange(
                      formation.start_date,
                      formation.end_date,
                      formation.is_current,
                    )
                  }}
                </span>
                <span
                  v-if="formation.location"
                  class="px-2 py-1 bg-gray-100 rounded-full"
                >
                  📍 {{ formation.location }}
                </span>
              </div>

              <p
                v-if="formation.diploma"
                class="text-violet-pastel text-sm font-medium mb-2"
              >
                {{ formation.diploma }}
              </p>

              <p
                v-if="formation.description"
                class="text-gray-600 text-sm leading-relaxed"
                style="font-family: &quot;Poppins&quot;, sans-serif"
              >
                {{ formation.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logiciels maîtrisés -->
    <section
      id="tools-section"
      ref="toolsSection"
      class="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div class="container-portfolio">
        <div class="text-center mb-12">
          <h2
            class="text-2xl lg:text-3xl font-display font-bold text-gray-800 mb-2"
          >
            Logiciels maîtrisés
          </h2>
          <p class="text-gray-500">Les outils que j'utilise au quotidien</p>
        </div>

        <div
          class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          <div
            v-for="tool in tools"
            :key="tool.name"
            class="tool-item group flex flex-col items-center"
          >
            <div
              class="tool-icon w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <img
                :src="tool.logo"
                :alt="tool.name"
                class="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                loading="lazy"
              />
            </div>
            <span
              class="text-gray-600 font-medium text-xs lg:text-sm text-center"
              >{{ tool.name }}</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section id="contact" class="py-16 lg:py-24">
      <div class="container-portfolio">
        <div class="max-w-2xl mx-auto">
          <div
            class="relative bg-gradient-to-br from-violet-pastel to-rose-soft p-0.5 rounded-3xl shadow-xl"
          >
            <div class="bg-white rounded-3xl p-8 lg:p-12 text-center">
              <!-- Icon -->
              <div
                class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-violet-pastel to-rose-soft rounded-xl flex items-center justify-center shadow-lg rotate-12"
              >
                <span class="text-lg">💬</span>
              </div>

              <h2
                class="text-2xl lg:text-3xl font-display font-bold text-gray-800 mb-4 mt-2"
              >
                Envie de collaborer ?
              </h2>
              <p
                class="text-gray-600 mb-8"
                style="font-family: &quot;Poppins&quot;, sans-serif"
              >
                Je suis toujours ouverte à de nouvelles opportunités et
                collaborations.
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:lolaroth08@gmail.com"
                  class="px-8 py-4 bg-gradient-to-r from-violet-pastel to-rose-soft text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  ✉️ Me contacter
                </a>
                <a
                  href="https://www.linkedin.com/in/lolaroth/"
                  target="_blank"
                  rel="noopener"
                  class="px-8 py-4 bg-white text-violet-pastel border-2 border-violet-pastel/30 rounded-full font-medium hover:border-violet-pastel transition-all"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Animation wave emoji */
@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-10deg);
  }
}

.animate-wave {
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}
</style>
