<script setup lang="ts">
// Composant Footer
const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/lolaroth/",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:lolaroth08@gmail.com",
    icon: "email",
  },
];
</script>

<template>
  <footer class="bg-beige-dark py-12 mt-auto">
    <div class="container-portfolio">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <!-- Logo et description -->
        <div>
          <NuxtLink to="/" class="flex items-center gap-2 mb-4">
            <img
              src="/images/mascot.png"
              alt="icone de la mascotte"
              class="w-40 h-40 object-contain"
            />
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-display text-lg text-violet-pastel mb-4">
            Navigation
          </h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-600 hover:text-violet-pastel transition-colors font-body text-body-sm"
              >
                Accueil
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projets"
                class="text-gray-600 hover:text-violet-pastel transition-colors font-body text-body-sm"
              >
                Projets
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/a-propos"
                class="text-gray-600 hover:text-violet-pastel transition-colors font-body text-body-sm"
              >
                À propos
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-display text-lg text-violet-pastel mb-4">Contact</h4>
          <p class="text-gray-600 font-body text-body-sm mb-4">
            Envie de collaborer ? N'hésitez pas à me contacter.
          </p>
          <a
            href="mailto:lolaroth08@gmail.com"
            class="text-violet-pastel hover:text-rose-soft transition-colors font-body text-body-sm block mb-4"
          >
            lolaroth08@gmail.com
          </a>
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              :target="social.url.startsWith('mailto') ? '_self' : '_blank'"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-violet-light flex items-center justify-center text-violet-pastel hover:bg-violet-pastel hover:text-white transition-all duration-300"
            >
              <span class="sr-only">{{ social.name }}</span>
              <!-- Icône -->
              <span class="text-sm font-bold">{{
                social.icon === "linkedin" ? "in" : "✉"
              }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="pt-8 border-t border-violet-light/30 text-center">
        <p class="text-gray-500 font-body text-body-sm">
          © Portfolio Lola Roth {{ currentYear }}. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>
