import { defineNuxtPlugin } from "#app";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  // Enregistrer ScrollTrigger uniquement côté client
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger);
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  };
});
