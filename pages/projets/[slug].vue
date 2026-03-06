<script setup lang="ts">
// Page de détail d'un projet
definePageMeta({
  layout: "default",
});

const route = useRoute();
const slug = route.params.slug as string;

const { fetchProjectBySlug, currentProject, projectTechnologies, loading, fetchProjects, featuredProjects } =
  useProjects();

// Charger le projet et les projets à la une
await Promise.all([fetchProjectBySlug(slug), fetchProjects()]);

// Projets à la une (excluant le projet actuel)
const otherFeaturedProjects = computed(() => 
  featuredProjects.value.filter(p => p.slug !== slug).slice(0, 3)
);

// Gestion de l'erreur 404
if (!currentProject.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Projet non trouvé",
  });
}

// Meta
useHead({
  title: currentProject.value.title,
});

// Labels pour le type de projet
const typeLabels: Record<string, string> = {
  personnel: "Projet personnel",
  scolaire: "Projet scolaire",
  professionnel: "Projet professionnel",
};

// Labels pour les tags
const tagLabels: Record<string, string> = {
  design: "Design",
  communication: "Communication",
  "developpement-web": "Développement Web",
  "3d": "3D",
  audiovisuel: "Audiovisuel",
};

// Formater l'année
const yearDisplay = computed(() => currentProject.value?.year.toString() || "");
</script>

<template>
  <div v-if="currentProject">
    <!-- Header du projet -->
    <section class="pt-12 pb-8">
      <div class="container-portfolio">
        <!-- Breadcrumb -->
        <nav class="mb-8 font-body text-sm text-gray-500">
          <NuxtLink to="/" class="hover:text-violet-pastel">Accueil</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/projets" class="hover:text-violet-pastel"
            >Projets</NuxtLink
          >
          <span class="mx-2">/</span>
          <span class="text-violet-pastel">{{ currentProject.title }}</span>
        </nav>

        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <!-- Infos du projet -->
          <div>
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="tag-primary">
                {{ currentProject.category?.name || "Autre" }}
              </span>
              <span class="tag-secondary">
                {{ typeLabels[currentProject.type] || currentProject.type }}
              </span>
              <span
                v-if="currentProject.is_3d"
                class="tag bg-gray-800 text-white"
              >
                3D
              </span>
              <span
                v-if="currentProject.is_game"
                class="tag bg-gray-800 text-white"
              >
                Jeu vidéo
              </span>
              <span
                v-if="currentProject.is_audiovisual"
                class="tag bg-gray-800 text-white"
              >
                Audiovisuel
              </span>
            </div>

            <!-- Titre -->
            <h1 class="title-primary mb-4">{{ currentProject.title }}</h1>

            <!-- Année et Prestataire -->
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <p class="font-body text-gray-500">{{ yearDisplay }}</p>
              <span
                v-if="currentProject.prestataire"
                class="flex items-center gap-2"
              >
                <span class="w-1 h-1 rounded-full bg-gray-400"></span>
                <p class="font-body text-gray-500">
                  Pour
                  <span class="text-violet-pastel font-medium">{{
                    currentProject.prestataire
                  }}</span>
                </p>
              </span>
            </div>

            <!-- Description courte -->
            <p
              class="text-body-lg text-gray-600 mb-8"
              style="font-family: 'Poppins', sans-serif"
            >
              {{ currentProject.short_description }}
            </p>

            <!-- Technologies (stack dev via join table) -->
            <div v-if="projectTechnologies.length > 0" class="mb-8">
              <h3 class="font-display text-lg text-violet-pastel mb-3">
                Technologies
              </h3>
              <UiTechStack :technologies="projectTechnologies" />
            </div>

            <!-- Logiciels utilisés -->
            <div v-if="currentProject.tools?.length" class="mb-8">
              <h3 class="font-display text-lg text-violet-pastel mb-3">
                Logiciels
              </h3>
              <UiProjectSoftware :tools="currentProject.tools" />
            </div>

            <!-- Lien externe (bouton dans la colonne infos) -->
            <div v-if="currentProject.external_url" class="flex gap-4">
              <a
                :href="currentProject.external_url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                Voir le projet
                <svg
                  class="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Image de couverture -->
          <div class="relative">
            <div class="card overflow-hidden">
              <a
                :href="
                  currentProject.cover_image ||
                  '/images/placeholder-project.jpg'
                "
                target="_blank"
                rel="noopener noreferrer"
                :title="`Ouvrir ${currentProject.title} en grand`"
              >
                <img
                  :src="
                    currentProject.cover_image ||
                    '/images/placeholder-project.jpg'
                  "
                  :alt="currentProject.title"
                  class="w-full aspect-project object-cover cursor-zoom-in"
                />
              </a>
            </div>
            <!-- Lien externe en coin sur la cover -->
            <div
              v-if="currentProject.external_url"
              class="absolute top-3 right-3"
            >
              <a
                :href="currentProject.external_url"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir le projet dans un nouvel onglet"
                class="w-10 h-10 flex items-center justify-center bg-white/90 text-violet-pastel rounded-full shadow hover:scale-105 transform transition"
              >
                <svg
                  class="w-4 h-4 -rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 17L17 7M7 7h10v10"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Description longue -->
    <section
      v-if="currentProject.long_description"
      class="section-padding pt-8"
    >
      <div class="container-portfolio">
        <div>
          <h2 class="title-secondary mb-6">À propos du projet</h2>
          <div class="prose prose-lg text-gray-600">
            <p
              class="whitespace-pre-line"
              style="font-family: 'Poppins', sans-serif"
            >
              {{ currentProject.long_description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Vidéo -->
    <section v-if="currentProject.video_url" class="section-padding pt-8">
      <div class="container-portfolio">
        <h2 class="title-secondary mb-6">Vidéo</h2>
        <UiVideoEmbed
          :url="currentProject.video_url"
          :title="currentProject.title"
        />
      </div>
    </section>

    <!-- Galerie d'images - Section améliorée -->
    <section
      v-if="currentProject.gallery && currentProject.gallery.length > 0"
      class="section-padding pt-8 bg-gradient-to-b from-transparent via-violet-light/5 to-transparent"
    >
      <div class="container-portfolio">
        <div class="mb-6">
          <h2 class="title-secondary !mb-1">En voir plus</h2>
          <p class="text-gray-500 text-sm">
            {{ currentProject.gallery.length }} image{{
              currentProject.gallery.length > 1 ? "s" : ""
            }}
          </p>
        </div>
        <div class="max-w-4xl">
          <UiImageGallery
            :images="currentProject.gallery"
            :alt="currentProject.title"
          />
        </div>
      </div>
    </section>

    <!-- Projets à la une -->
    <section v-if="otherFeaturedProjects.length" class="section-padding bg-gradient-to-b from-white/50 to-violet-light/10">
      <div class="container-portfolio">
        <h2 class="title-tertiary mb-8 text-center">Découvrir d'autres projets</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <NuxtLink
            v-for="project in otherFeaturedProjects"
            :key="project.id"
            :to="`/projets/${project.slug}`"
            class="group block"
          >
            <div class="card overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
              <div class="aspect-video overflow-hidden">
                <img
                  :src="project.cover_image || '/images/placeholder-project.jpg'"
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div class="p-4">
                <span class="text-xs font-medium text-violet-pastel">{{ project.category?.name }}</span>
                <h3 class="font-display font-semibold text-gray-800 mt-1 group-hover:text-violet-pastel transition-colors">{{ project.title }}</h3>
                <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ project.short_description }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="text-center">
          <NuxtLink to="/projets" class="btn-outline">
            Voir tous les projets
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <!-- Loading state -->
  <div
    v-else-if="loading"
    class="min-h-screen flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="w-12 h-12 border-4 border-violet-light border-t-violet-pastel rounded-full animate-spin mx-auto mb-4"
      />
      <p class="font-body text-gray-600">Chargement du projet...</p>
    </div>
  </div>
</template>
