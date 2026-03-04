<script setup lang="ts">
// Composant CorkBoard - Tableau en liège interactif
// Affiche des éléments personnels avec des tooltips explicatifs

interface BoardItem {
  id: string;
  type:
    | "photo"
    | "sticker"
    | "album"
    | "note"
    | "polaroid"
    | "ticket"
    | "badge";
  image?: string;
  emoji?: string;
  text?: string;
  title: string;
  description: string;
  position: { x: number; y: number };
  rotation?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
}

interface Props {
  items: BoardItem[];
}

const props = defineProps<Props>();

// État du tooltip
const activeItem = ref<BoardItem | null>(null);
const tooltipPosition = ref({ x: 0, y: 0 });
const boardRef = ref<HTMLDivElement | null>(null);

const handleMouseEnter = (event: MouseEvent, item: BoardItem) => {
  activeItem.value = item;
  updateTooltipPosition(event);
};

const handleMouseMove = (event: MouseEvent) => {
  if (activeItem.value) {
    updateTooltipPosition(event);
  }
};

const handleMouseLeave = () => {
  activeItem.value = null;
};

const updateTooltipPosition = (event: MouseEvent) => {
  if (!boardRef.value) return;
  const rect = boardRef.value.getBoundingClientRect();
  tooltipPosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top - 10,
  };
};

// Calcule la taille en pixels selon le size
const getSizeClass = (size?: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "w-16 h-16 md:w-20 md:h-20";
    case "lg":
      return "w-32 h-32 md:w-40 md:h-40";
    default:
      return "w-24 h-24 md:w-28 md:h-28";
  }
};
</script>

<template>
  <div
    ref="boardRef"
    class="cork-board relative w-full min-h-[500px] md:min-h-[600px] rounded-2xl overflow-hidden"
    @mousemove="handleMouseMove"
  >
    <!-- Texture du liège -->
    <div class="cork-texture absolute inset-0"></div>

    <!-- Cadre du tableau -->
    <div
      class="absolute inset-0 border-[12px] md:border-[16px] border-amber-900/80 rounded-2xl pointer-events-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"
    ></div>

    <!-- Items du tableau -->
    <div
      v-for="item in items"
      :key="item.id"
      class="board-item absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:z-50"
      :style="{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
        transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
      }"
      @mouseenter="(e) => handleMouseEnter(e, item)"
      @mouseleave="handleMouseLeave"
    >
      <!-- Punaise -->
      <div
        class="pin absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-md z-10 border border-red-700"
      ></div>

      <!-- Photo polaroid -->
      <template v-if="item.type === 'polaroid'">
        <div
          class="polaroid-item bg-white p-2 pb-8 shadow-lg"
          :class="getSizeClass(item.size)"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-violet-light/40 to-rose-soft/40 flex items-center justify-center"
          >
            <span class="text-3xl">{{ item.emoji || "📷" }}</span>
          </div>
          <p
            v-if="item.text"
            class="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-600 font-handwriting"
          >
            {{ item.text }}
          </p>
        </div>
      </template>

      <!-- Photo simple -->
      <template v-else-if="item.type === 'photo'">
        <div
          class="photo-item shadow-lg rounded overflow-hidden"
          :class="getSizeClass(item.size)"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover"
          />
        </div>
      </template>

      <!-- Album/CD -->
      <template v-else-if="item.type === 'album'">
        <div
          class="album-item shadow-xl rounded"
          :class="getSizeClass(item.size)"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover rounded"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded flex items-center justify-center"
          >
            <span class="text-3xl">💿</span>
          </div>
        </div>
      </template>

      <!-- Sticker -->
      <template v-else-if="item.type === 'sticker'">
        <div
          class="sticker-item flex items-center justify-center drop-shadow-md"
          :class="getSizeClass(item.size)"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-contain"
          />
          <span v-else class="text-4xl md:text-5xl">{{
            item.emoji || "⭐"
          }}</span>
        </div>
      </template>

      <!-- Note / Post-it -->
      <template v-else-if="item.type === 'note'">
        <div
          class="note-item p-3 shadow-md"
          :class="getSizeClass(item.size)"
          :style="{ backgroundColor: item.color || '#FEF3C7' }"
        >
          <p
            class="text-xs md:text-sm text-gray-700 font-handwriting leading-tight"
          >
            {{ item.text || item.title }}
          </p>
        </div>
      </template>

      <!-- Ticket -->
      <template v-else-if="item.type === 'ticket'">
        <div
          class="ticket-item bg-white shadow-md rounded overflow-hidden"
          :class="getSizeClass(item.size)"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-r from-amber-100 to-amber-50 flex items-center justify-center p-2"
          >
            <span class="text-2xl">🎟️</span>
          </div>
        </div>
      </template>

      <!-- Badge -->
      <template v-else-if="item.type === 'badge'">
        <div
          class="badge-item rounded-full flex items-center justify-center shadow-lg border-4 border-white"
          :class="getSizeClass(item.size)"
          :style="{ backgroundColor: item.color || '#A78BFA' }"
        >
          <span class="text-2xl md:text-3xl">{{ item.emoji || "🏆" }}</span>
        </div>
      </template>
    </div>

    <!-- Tooltip -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="activeItem"
        class="tooltip absolute z-[100] pointer-events-none"
        :style="{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          transform: 'translate(-50%, -100%)',
        }"
      >
        <div
          class="bg-white rounded-xl shadow-2xl p-4 max-w-[250px] border border-violet-light/30"
        >
          <h4 class="font-display text-violet-pastel text-sm mb-1">
            {{ activeItem.title }}
          </h4>
          <p class="font-body text-gray-600 text-xs leading-relaxed">
            {{ activeItem.description }}
          </p>
        </div>
        <!-- Flèche -->
        <div
          class="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"
        ></div>
      </div>
    </Transition>

    <!-- Instruction -->
    <div
      class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
    >
      <p class="font-body text-xs text-gray-500 flex items-center gap-2">
        <span class="animate-pulse">✨</span>
        Survolez les éléments pour en savoir plus
      </p>
    </div>
  </div>
</template>

<style scoped>
.cork-texture {
  background-color: #c9a66b;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-blend-mode: overlay;
  opacity: 0.95;
}

.cork-texture::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 20% 30%,
      rgba(139, 90, 43, 0.3) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 70%,
      rgba(139, 90, 43, 0.2) 0%,
      transparent 40%
    ),
    radial-gradient(
      ellipse at 50% 50%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 60%
    );
}

.board-item {
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
}

.polaroid-item {
  position: relative;
}

.note-item {
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    0 100%
  );
}

.font-handwriting {
  font-family: "Courier New", monospace;
}

/* Animation des items */
.board-item {
  animation: float 6s ease-in-out infinite;
}

.board-item:nth-child(odd) {
  animation-delay: -3s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg));
  }
  50% {
    transform: translate(-50%, calc(-50% - 3px)) rotate(var(--rotation, 0deg));
  }
}
</style>
