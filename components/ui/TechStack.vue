<script setup lang="ts">
import type { Technology } from "~/types";

interface Props {
  technologies: Technology[];
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };
  return sizes[props.size];
});

function normalize(name: string) {
  return name.toLowerCase().trim();
}

function techIconCandidates(tech: Technology) {
  const nameBase = tech.icon || tech.name || "";
  const base = normalize(nameBase).replace(/\s+/g, "");
  const candidates = [`/icons/${base}.svg`];
  return candidates;
}

function getTechInitialIcon(tech: Technology) {
  const list = techIconCandidates(tech);
  return list.length ? list[0] : "";
}

function onTechIconError(e: Event, tech: Technology) {
  const img = e.target as HTMLImageElement;
  const tried = img.dataset.tried ? img.dataset.tried.split("|") : [];
  const list = techIconCandidates(tech);
  const next = list.find((c) => !tried.includes(c));
  if (next) {
    tried.push(next);
    img.dataset.tried = tried.join("|");
    img.src = next;
  } else {
    img.src = "/icons/html.svg";
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div
      v-for="tech in technologies"
      :key="tech.id"
      :class="[
        'flex items-center gap-2 rounded-full border border-gray-100 bg-white/60',
        sizeClasses,
      ]"
      :style="
        tech.color
          ? { backgroundColor: tech.color + '10', color: tech.color }
          : {}
      "
    >
      <img
        :src="getTechInitialIcon(tech)"
        :data-tried="getTechInitialIcon(tech)"
        @error="(e) => onTechIconError(e, tech)"
        class="w-5 h-5 object-contain flex-shrink-0 ml-1"
        :alt="tech.name"
      />
      <span class="pr-2">{{ tech.name }}</span>
    </div>
  </div>
</template>
