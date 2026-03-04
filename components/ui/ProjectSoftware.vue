<script setup lang="ts">
interface Props {
  tools: string[];
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

// Mapping nom (normalisé) → { slug SimpleIcons, couleur brand, label affiché }
const TOOL_MAP: Record<string, { slug: string; color: string; label: string }> =
  {
    figma: { slug: "figma", color: "F24E1E", label: "Figma" },
    indesign: { slug: "adobeindesign", color: "FF3366", label: "InDesign" },
    adobeindesign: {
      slug: "adobeindesign",
      color: "FF3366",
      label: "InDesign",
    },
    illustrator: {
      slug: "adobeillustrator",
      color: "FF9A00",
      label: "Illustrator",
    },
    adobeillustrator: {
      slug: "adobeillustrator",
      color: "FF9A00",
      label: "Illustrator",
    },
    photoshop: { slug: "adobephotoshop", color: "31A8FF", label: "Photoshop" },
    adobephotoshop: {
      slug: "adobephotoshop",
      color: "31A8FF",
      label: "Photoshop",
    },
    aftereffects: {
      slug: "adobeaftereffects",
      color: "9999FF",
      label: "After Effects",
    },
    adobeaftereffects: {
      slug: "adobeaftereffects",
      color: "9999FF",
      label: "After Effects",
    },
    "after effects": {
      slug: "adobeaftereffects",
      color: "9999FF",
      label: "After Effects",
    },
    premierepro: {
      slug: "adobepremierepro",
      color: "9999FF",
      label: "Premiere Pro",
    },
    adobepremierepro: {
      slug: "adobepremierepro",
      color: "9999FF",
      label: "Premiere Pro",
    },
    "premiere pro": {
      slug: "adobepremierepro",
      color: "9999FF",
      label: "Premiere Pro",
    },
    xd: { slug: "adobexd", color: "FF61F6", label: "Adobe XD" },
    adobexd: { slug: "adobexd", color: "FF61F6", label: "Adobe XD" },
    lightroom: {
      slug: "adobelightroom",
      color: "31A8FF",
      label: "Lightroom",
    },
    blender: { slug: "blender", color: "E87D0D", label: "Blender" },
    unity: { slug: "unity", color: "000000", label: "Unity" },
    sketch: { slug: "sketch", color: "F7B500", label: "Sketch" },
    canva: { slug: "canva", color: "00C4CC", label: "Canva" },
    notion: { slug: "notion", color: "000000", label: "Notion" },
    vscode: { slug: "visualstudiocode", color: "007ACC", label: "VS Code" },
    "vs code": { slug: "visualstudiocode", color: "007ACC", label: "VS Code" },
    nuxt: { slug: "nuxtdotjs", color: "00DC82", label: "Nuxt" },
    vue: { slug: "vuedotjs", color: "4FC08D", label: "Vue.js" },
    tailwind: { slug: "tailwindcss", color: "06B6D4", label: "Tailwind CSS" },
    typescript: { slug: "typescript", color: "3178C6", label: "TypeScript" },
    davinci: {
      slug: "davinciresolve",
      color: "233A51",
      label: "DaVinci Resolve",
    },
    "davinci resolve": {
      slug: "davinciresolve",
      color: "233A51",
      label: "DaVinci Resolve",
    },
  };

const sizeConfig = computed(() => {
  const configs = {
    sm: { icon: "w-5 h-5", text: "text-xs", gap: "gap-1.5", pill: "px-2 py-1" },
    md: { icon: "w-7 h-7", text: "text-sm", gap: "gap-2", pill: "px-3 py-1.5" },
    lg: {
      icon: "w-9 h-9",
      text: "text-base",
      gap: "gap-2.5",
      pill: "px-4 py-2",
    },
  };
  return configs[props.size];
});

// Normalise le nom pour le lookup (lowercase, trim)
function normalize(name: string) {
  return name.toLowerCase().trim();
}

function isSpecialLocal(name: string) {
  return normalize(name) === "unreal";
}
function getToolInfo(name: string) {
  return TOOL_MAP[normalize(name)] || null;
}

function getIconUrl(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

function iconCandidates(name: string) {
  const info = getToolInfo(name);
  const base = normalize(name).replace(/\s+/g, "");
  const labelSlug = info ? info.label.toLowerCase().replace(/\s+/g, "") : null;
  const candidates = [
    `/icons/${base}.svg`,
    info ? `/icons/${info.slug}.svg` : null,
    labelSlug ? `/icons/${labelSlug}.svg` : null,
    info ? getIconUrl(info.slug, info.color) : null,
  ].filter(Boolean) as string[];
  return candidates;
}

function getInitialIconUrl(name: string) {
  const list = iconCandidates(name);
  return list.length ? list[0] : "";
}

function onIconError(e: Event, name: string) {
  const img = e.target as HTMLImageElement;
  const tried = img.dataset.tried ? img.dataset.tried.split("|") : [];
  const list = iconCandidates(name);
  const next = list.find((c) => !tried.includes(c));
  if (next) {
    tried.push(next);
    img.dataset.tried = tried.join("|");
    img.src = next;
  } else {
    // final fallback: transparent 1x1 or a generic local icon
    img.src = "/icons/html.svg";
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <template v-for="tool in tools" :key="tool">
      <div
        :class="[
          'flex items-center rounded-xl transition border border-gray-100 bg-white shadow-sm hover:shadow-md',
          sizeConfig.pill,
          // give a bit more gap for unreal specifically
          isSpecialLocal(tool)
            ? 'gap-3'
            : getToolInfo(tool)
              ? sizeConfig.gap
              : sizeConfig.text,
        ]"
      >
        <img
          :src="getInitialIconUrl(tool)"
          :data-tried="getInitialIconUrl(tool)"
          @error="(e) => onIconError(e, tool)"
          :alt="(getToolInfo(tool) && getToolInfo(tool)!.label) || tool"
          :class="[
            sizeConfig.icon,
            'object-contain flex-shrink-0',
            isSpecialLocal(tool) ? 'mr-2' : 'mr-1.5',
          ]"
        />
        <span
          :class="[
            'font-body font-medium',
            getToolInfo(tool) ? 'text-gray-700' : 'text-violet-pastel',
            sizeConfig.text,
          ]"
        >
          {{ (getToolInfo(tool) && getToolInfo(tool)!.label) || tool }}
        </span>
      </div>
    </template>
  </div>
</template>
