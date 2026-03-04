<script setup lang="ts">
interface Props {
  url: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Vidéo",
});

// Détecter le type de vidéo (YouTube, Vimeo, ou URL directe)
const videoInfo = computed(() => {
  const url = props.url;

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
  );
  if (youtubeMatch) {
    return {
      type: "youtube",
      id: youtubeMatch[1],
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // URL directe (MP4, WebM, etc.)
  return {
    type: "direct",
    id: null,
    embedUrl: url,
  };
});
</script>

<template>
  <div
    class="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-900"
  >
    <!-- YouTube / Vimeo -->
    <iframe
      v-if="videoInfo.type === 'youtube' || videoInfo.type === 'vimeo'"
      :src="videoInfo.embedUrl"
      :title="title"
      class="absolute inset-0 w-full h-full"
      frameborder="0"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
      "
      allowfullscreen
    />

    <!-- Vidéo directe -->
    <video
      v-else
      :src="videoInfo.embedUrl"
      :title="title"
      class="absolute inset-0 w-full h-full object-contain"
      controls
      preload="metadata"
    >
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  </div>
</template>
