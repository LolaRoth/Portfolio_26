<script setup lang="ts">
interface Props {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  text: "",
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };
  return sizes[props.size];
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div
      :class="[
        'rounded-full border-violet-light border-t-violet-pastel animate-spin',
        sizeClasses,
      ]"
    />
    <p v-if="text" class="font-body text-gray-600 text-body-sm">
      {{ text }}
    </p>
  </div>
</template>
