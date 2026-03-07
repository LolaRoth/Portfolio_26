<script setup lang="ts">
// Composant Header / Navigation principal
const route = useRoute();

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Projets", to: "/projets" },
  { label: "À propos", to: "/a-propos" },
];

const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Fermer le menu mobile lors de la navigation
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  },
);
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-beige-light/90 backdrop-blur-md"
  >
    <div class="container-portfolio">
      <nav class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <img
            src="/images/mascot.png"
            alt="Portfolio"
            class="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
          />
        </NuxtLink>

        <!-- Navigation Desktop -->
        <ul class="hidden md:flex items-center gap-8">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="nav-link"
              :class="{ active: isActive(item.to) }"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Bouton Contact Desktop -->
        <div class="hidden md:block">
          <NuxtLink to="/a-propos#contact" class="btn-primary">
            Contact
          </NuxtLink>
        </div>

        <!-- Menu Mobile Toggle -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-2"
          @click="toggleMobileMenu"
          aria-label="Menu"
        >
          <span
            class="w-6 h-0.5 bg-violet-pastel transition-all duration-300"
            :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"
          />
          <span
            class="w-6 h-0.5 bg-violet-pastel transition-all duration-300"
            :class="{ 'opacity-0': isMobileMenuOpen }"
          />
          <span
            class="w-6 h-0.5 bg-violet-pastel transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
          />
        </button>
      </nav>
    </div>

    <!-- Menu Mobile -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-beige-light border-t border-violet-light/30"
      >
        <div class="container-portfolio py-6">
          <ul class="flex flex-col gap-4">
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="block py-2 text-lg font-body"
                :class="
                  isActive(item.to) ? 'text-violet-pastel' : 'text-gray-600'
                "
              >
                {{ item.label }}
              </NuxtLink>
            </li>
            <li class="pt-4">
              <NuxtLink
                to="/a-propos#contact"
                class="btn-primary w-full text-center"
              >
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </header>
</template>
