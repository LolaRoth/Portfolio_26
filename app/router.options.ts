import type { RouterConfig } from "@nuxt/schema";

// Configuration du router pour réinitialiser le scroll à chaque changement de page
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Si l'utilisateur utilise les boutons précédent/suivant du navigateur
    if (savedPosition) {
      return savedPosition;
    }

    // Si la navigation contient un hash (ancre), scroll vers l'élément
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // Par défaut, scroll en haut de la page
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
};
