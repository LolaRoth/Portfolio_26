<script setup lang="ts">
const props = withDefaults(defineProps<{ src: string; alt?: string; size?: string }>(), {
  alt: "Photo",
  size: "md",
});
</script>

<template>
  <div class="vintage-photo relative inline-block" role="img" :aria-label="props.alt">
    <div class="strip strip-back" />
    <div class="strip strip-mid" />
    <div class="strip strip-front">
      <img :src="props.src" :alt="props.alt" class="photo" />
      <div class="caption">souvenirs</div>
    </div>
  </div>
</template>

<style scoped>
.vintage-photo {
  width: 320px;
  height: 420px;
}
.strip {
  position: absolute;
  width: 260px;
  height: 360px;
  left: 20px;
  top: 20px;
  border-radius: 6px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  border: 6px solid #f6f3eb; /* paper border */
  overflow: hidden;
  background: #f6f3eb;
}
.strip-back { transform: rotate(-8deg) translate(-8px, 6px); filter: grayscale(60%) contrast(0.9) brightness(0.95); }
.strip-mid { transform: rotate(-4deg) translate(-4px, 3px); filter: saturate(0.9) contrast(0.95); }
.strip-front { transform: rotate(0deg); display:flex; align-items:center; justify-content:center; background:#fff; }
.strip .photo { width:100%; height:100%; object-fit:cover; display:block; filter: sepia(0.08) contrast(0.98); }
.strip-front .caption { position:absolute; bottom:10px; left:0; right:0; text-align:center; font-family: 'Courier New', monospace; font-size:12px; color:#9b6b4a; letter-spacing:1px; }

/* small film perforation effect */
.vintage-photo::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 6px;
  width: 6px;
  background-image: radial-gradient(circle at center, rgba(0,0,0,0.07) 50%, transparent 51%);
  background-size: 100% 28px;
  border-radius: 4px;
  pointer-events: none;
}
</style>
