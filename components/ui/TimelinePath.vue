<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";

interface Item {
  id: number | string;
  title: string;
  start_date?: string;
  end_date?: string | null;
  is_current?: boolean;
  company?: string;
  location?: string | null;
  description?: string | null;
}

const props = withDefaults(defineProps<{ items: Item[]; height?: number }>(), {
  height: 280,
});

const svgRef = ref<SVGSVGElement | null>(null);
const pathRef = ref<SVGPathElement | null>(null);
const points = ref<{ x: number; y: number; id: any }[]>([]);
const hovered = ref<any>(null);
const pathLength = ref(0);

function computePoints() {
  points.value = [];
  if (!pathRef.value) return;
  const path = pathRef.value;
  const len = path.getTotalLength();
  pathLength.value = len;
  const n = Math.max(1, props.items.length);
  props.items.forEach((it, idx) => {
    const t = n === 1 ? 0.5 : idx / (n - 1);
    const pt = path.getPointAtLength(len * t);
    points.value.push({ x: pt.x, y: pt.y, id: it.id });
  });
}

const hoveredItem = computed(() =>
  props.items.find((i) => i.id === hovered.value),
);

onMounted(() => {
  computePoints();
});

watch(
  () => props.items,
  () => {
    setTimeout(() => computePoints(), 0);
  },
);
</script>

<template>
  <div
    class="timeline-container relative"
    :style="{ height: props.height + 'px' }"
  >
    <svg
      ref="svgRef"
      viewBox="0 0 1000 280"
      preserveAspectRatio="xMidYMid meet"
      class="w-full h-full"
    >
      <!-- Defs for gradients and filters -->
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#A78BFA" />
          <stop offset="50%" stop-color="#F472B6" />
          <stop offset="100%" stop-color="#A78BFA" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15" />
        </filter>
      </defs>

      <!-- Background decorative elements -->
      <circle cx="100" cy="50" r="30" fill="#F3E8FF" opacity="0.5" />
      <circle cx="900" cy="230" r="40" fill="#FCE7F3" opacity="0.5" />
      <circle cx="500" cy="30" r="20" fill="#ECFDF5" opacity="0.5" />

      <!-- Main path - Road style -->
      <path
        ref="pathRef"
        d="M40,220 C150,220 200,60 350,60 C500,60 550,200 700,200 C850,200 900,100 960,100"
        fill="none"
        stroke="#E9E6FF"
        stroke-width="24"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- Path border -->
      <path
        d="M40,220 C150,220 200,60 350,60 C500,60 550,200 700,200 C850,200 900,100 960,100"
        fill="none"
        stroke="#DDD6FE"
        stroke-width="28"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.5"
      />

      <!-- Animated dashed line overlay -->
      <path
        d="M40,220 C150,220 200,60 350,60 C500,60 550,200 700,200 C850,200 900,100 960,100"
        fill="none"
        stroke="url(#pathGradient)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="12 8"
        class="animate-dash"
      />

      <!-- Milestone points -->
      <g v-for="(pt, idx) in points" :key="pt.id">
        <!-- Point shadow -->
        <circle
          :cx="pt.x"
          :cy="pt.y + 4"
          :r="hovered === pt.id ? 22 : 18"
          fill="rgba(0,0,0,0.1)"
          class="transition-all duration-300"
        />

        <!-- Point background -->
        <circle
          :cx="pt.x"
          :cy="pt.y"
          :r="hovered === pt.id ? 22 : 18"
          :fill="
            idx === 0 || props.items[idx]?.is_current
              ? 'url(#pathGradient)'
              : '#fff'
          "
          :stroke="
            idx === 0 || props.items[idx]?.is_current ? '#A78BFA' : '#DDD6FE'
          "
          stroke-width="3"
          class="cursor-pointer transition-all duration-300"
          :filter="hovered === pt.id ? 'url(#glow)' : ''"
          @mouseenter="hovered = pt.id"
          @mouseleave="hovered = null"
        />

        <!-- Point icon/number -->
        <text
          :x="pt.x"
          :y="pt.y + 5"
          text-anchor="middle"
          :fill="idx === 0 || props.items[idx]?.is_current ? '#fff' : '#A78BFA'"
          font-size="14"
          font-weight="bold"
          class="pointer-events-none font-display"
        >
          {{ idx + 1 }}
        </text>

        <!-- Label below point -->
        <g
          :class="{
            'opacity-100': hovered === pt.id,
            'opacity-70': hovered !== pt.id,
          }"
          class="transition-opacity duration-300"
        >
          <text
            :x="pt.x"
            :y="pt.y + 45"
            text-anchor="middle"
            fill="#7C3AED"
            font-size="11"
            font-weight="600"
            class="font-display"
          >
            {{ props.items[idx]?.company?.substring(0, 20) || "" }}
          </text>
        </g>
      </g>

      <!-- Decorative stars -->
      <text x="150" y="140" font-size="16" opacity="0.3">✨</text>
      <text x="600" y="120" font-size="14" opacity="0.3">⭐</text>
      <text x="800" y="160" font-size="12" opacity="0.3">💫</text>
    </svg>

    <!-- Tooltip card -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-90 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90"
    >
      <div
        v-if="hovered && hoveredItem"
        class="absolute left-1/2 -translate-x-1/2 bottom-0 bg-white rounded-2xl shadow-xl p-5 min-w-[280px] max-w-[350px] border border-violet-light/30"
      >
        <div class="flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-pastel to-rose-soft flex items-center justify-center flex-shrink-0"
          >
            <span class="text-white text-xl">💼</span>
          </div>
          <div class="flex-1">
            <h4 class="font-display text-violet-pastel text-base mb-1">
              {{ hoveredItem.title }}
            </h4>
            <p class="text-sm text-rose-soft font-medium mb-1">
              {{ hoveredItem.company }}
            </p>
            <p class="text-xs text-gray-500">
              {{ hoveredItem.start_date }} →
              {{ hoveredItem.end_date || "Présent" }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.timeline-container {
  position: relative;
}

.timeline-container svg {
  display: block;
}

.font-display {
  font-family: "Motley Forces", cursive;
}

.animate-dash {
  animation: dash 20s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>
