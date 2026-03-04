<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Type simplifié pour les domaines (pas besoin de tous les champs Category)
interface DomainCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image?: string;
}

interface Props {
  categories: DomainCategory[];
}

const props = defineProps<Props>();

// État pour afficher/masquer les polaroids
const showPolaroids = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);
const isLoading = ref(true);

// État pour l'interaction drag
const isDragging = ref(false);
const previousMousePosition = ref({ x: 0, y: 0 });
const targetRotation = ref({ x: 0.3, y: 0 });
const currentRotation = ref({ x: 0.3, y: 0 });

// Emojis de fallback pour chaque catégorie (si pas d'image)
const categoryEmojis: Record<string, string> = {
  design: "🎨",
  communication: "📢",
  "developpement-web": "💻",
};

// Configuration Three.js
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let polaroidModel: THREE.Group | null = null;
let animationId: number;

const initThreeJS = () => {
  if (!containerRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = 400;

  // Scene
  scene = new THREE.Scene();
  scene.background = null;

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 1, 8);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  containerRef.value.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Load GLTF model
  const loader = new GLTFLoader();
  loader.load(
    "/models/polaroid/scene.gltf",
    (gltf) => {
      polaroidModel = gltf.scene;
      polaroidModel.scale.set(0.8, 0.8, 0.8);
      polaroidModel.position.set(0, -0.5, 0);
      polaroidModel.rotation.x = 0.3; // Légère inclinaison pour mieux voir
      scene.add(polaroidModel);
      isLoading.value = false;
    },
    undefined,
    (error) => {
      console.error("Error loading 3D model:", error);
      isLoading.value = false;
    },
  );

  // Animation loop avec smooth rotation
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    if (polaroidModel && !showPolaroids.value) {
      // Smooth interpolation vers la rotation cible
      currentRotation.value.x += (targetRotation.value.x - currentRotation.value.x) * 0.08;
      currentRotation.value.y += (targetRotation.value.y - currentRotation.value.y) * 0.08;
      
      polaroidModel.rotation.x = currentRotation.value.x;
      polaroidModel.rotation.y = currentRotation.value.y;
    }

    renderer.render(scene, camera);
  };
  animate();

  // Mouse/Touch event handlers pour drag
  const onMouseDown = (e: MouseEvent) => {
    isDragging.value = true;
    previousMousePosition.value = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return;
    
    const deltaX = e.clientX - previousMousePosition.value.x;
    const deltaY = e.clientY - previousMousePosition.value.y;
    
    targetRotation.value.y += deltaX * 0.01;
    targetRotation.value.x += deltaY * 0.005;
    
    // Limiter la rotation X
    targetRotation.value.x = Math.max(-0.5, Math.min(0.8, targetRotation.value.x));
    
    previousMousePosition.value = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDragging.value = false;
  };

  // Touch events pour mobile
  const onTouchStart = (e: TouchEvent) => {
    isDragging.value = true;
    previousMousePosition.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging.value) return;
    
    const deltaX = e.touches[0].clientX - previousMousePosition.value.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.value.y;
    
    targetRotation.value.y += deltaX * 0.01;
    targetRotation.value.x += deltaY * 0.005;
    
    targetRotation.value.x = Math.max(-0.5, Math.min(0.8, targetRotation.value.x));
    
    previousMousePosition.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = () => {
    isDragging.value = false;
  };

  // Ajouter les event listeners
  renderer.domElement.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  renderer.domElement.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('touchend', onTouchEnd);

  // Handle resize
  const handleResize = () => {
    if (!containerRef.value) return;
    const newWidth = containerRef.value.clientWidth;
    camera.aspect = newWidth / height;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, height);
  };
  window.addEventListener("resize", handleResize);
};

const handleClick = () => {
  showPolaroids.value = true;
};

onMounted(() => {
  initThreeJS();
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  if (renderer) renderer.dispose();
});
</script>

<template>
  <div class="relative">
    <!-- 3D Polaroid Model (visible quand pas encore cliqué) -->
    <div
      v-show="!showPolaroids"
      class="relative"
    >
      <!-- Éléments décoratifs -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- Formes flottantes -->
        <div class="absolute top-10 left-10 w-20 h-20 bg-violet-pastel/10 rounded-full blur-xl animate-float-slow"></div>
        <div class="absolute top-20 right-16 w-16 h-16 bg-rose-soft/15 rounded-full blur-lg animate-float-delayed"></div>
        <div class="absolute bottom-16 left-20 w-12 h-12 bg-violet-light/20 rounded-full blur-md animate-float"></div>
        <div class="absolute bottom-10 right-10 w-24 h-24 bg-violet-pastel/8 rounded-full blur-2xl animate-float-slow"></div>
        
        <!-- Petites étoiles/points décoratifs -->
        <div class="absolute top-16 left-1/4 text-violet-pastel/40 text-xl animate-twinkle">✦</div>
        <div class="absolute top-24 right-1/4 text-rose-soft/50 text-sm animate-twinkle-delayed">✧</div>
        <div class="absolute bottom-20 left-1/3 text-violet-light/40 text-lg animate-twinkle">✦</div>
        <div class="absolute bottom-28 right-1/3 text-violet-pastel/30 text-xs animate-twinkle-delayed">✧</div>
        
        <!-- Lignes décoratives subtiles -->
        <div class="absolute top-1/4 left-8 w-16 h-px bg-gradient-to-r from-transparent via-violet-pastel/20 to-transparent"></div>
        <div class="absolute bottom-1/4 right-8 w-20 h-px bg-gradient-to-r from-transparent via-rose-soft/20 to-transparent"></div>
      </div>

      <!-- Container 3D -->
      <div
        ref="containerRef"
        class="w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing relative z-10"
        :class="{ 'cursor-grabbing': isDragging }"
      >
        <div v-if="isLoading" class="text-center">
          <div
            class="w-12 h-12 border-4 border-violet-pastel border-t-transparent rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p class="font-body text-gray-500">Chargement du modèle 3D...</p>
        </div>
      </div>

      <!-- Instructions -->
      <div class="text-center mt-4 space-y-2">
        <p class="font-body text-gray-600 text-body-sm">
          👆 Faites glisser pour faire tourner le polaroid
        </p>
        <button 
          @click="handleClick"
          class="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-pastel to-rose-soft text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <span>Découvrir mes domaines</span>
          <span class="text-lg">→</span>
        </button>
      </div>
    </div>

    <!-- Polaroid Cards (visibles après clic) -->
    <Transition
      enter-active-class="transition-all duration-700 ease-out"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
    >
      <div v-if="showPolaroids" class="grid md:grid-cols-3 gap-8 md:gap-12">
        <NuxtLink
          v-for="(category, index) in categories"
          :key="category.id"
          :to="`/projets?tag=${category.slug}`"
          class="polaroid-card group"
          :style="{
            '--delay': `${index * 150}ms`,
            transform: `rotate(${index === 0 ? '-3deg' : index === 2 ? '3deg' : '0deg'})`,
          }"
        >
          <!-- Photo area -->
          <div class="polaroid-image">
            <!-- Image si fournie -->
            <img
              v-if="category.image"
              :src="category.image"
              :alt="category.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <!-- Fallback gradient with emoji if no image -->
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
              :style="{
                background: `linear-gradient(135deg, ${category.color || '#A78BFA'}30, ${category.color || '#A78BFA'}60)`,
              }"
            >
              <span
                class="text-6xl opacity-80 transition-transform duration-300 group-hover:scale-125"
              >
                {{ categoryEmojis[category.slug] || "✨" }}
              </span>
            </div>
          </div>

          <!-- Caption area (like polaroid bottom) -->
          <div class="polaroid-caption">
            <h3 class="font-display text-xl text-violet-pastel mb-1">
              {{ category.name }}
            </h3>
            <p class="font-body text-gray-500 text-body-sm leading-tight">
              {{ category.description || "Découvrez mes projets" }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </Transition>

    <!-- Bouton pour revoir le modèle 3D -->
    <div v-if="showPolaroids" class="text-center mt-8">
      <button
        @click="showPolaroids = false"
        class="font-body text-gray-400 hover:text-violet-pastel text-sm transition-colors"
      >
        ← Revoir le polaroid 3D
      </button>
    </div>
  </div>
</template>

<style scoped>
.polaroid-card {
  background-color: #ffffff;
  padding: 0.75rem 0.75rem 3rem 0.75rem; /* p-3 pb-12 */
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 4px 6px -4px rgba(0, 0, 0, 0.08); /* approximates shadow-xl */
  border-radius: 0.125rem; /* rounded-sm */
  cursor: pointer;
  animation: polaroidAppear 0.6s ease-out both;
  animation-delay: var(--delay, 0ms);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.polaroid-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* approximates shadow-2xl */
  transform: rotate(0deg) translateY(-8px) !important;
}

.polaroid-image {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: #f3f4f6; /* bg-gray-100 */
}

.polaroid-caption {
  padding-top: 1rem; /* pt-4 */
  text-align: center;
}

@keyframes polaroidAppear {
  0% {
    opacity: 0;
    transform: translateY(30px) rotate(10deg);
  }
  100% {
    opacity: 1;
  }
}

/* Animations pour les éléments décoratifs */
.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 5s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

.animate-twinkle-delayed {
  animation: twinkle 3s ease-in-out infinite;
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}
</style>
