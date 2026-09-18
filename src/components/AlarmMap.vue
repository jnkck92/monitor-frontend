<script setup lang="ts">
defineProps<{ lat: number; lon: number }>()

const bboxOffset = 0.002
</script>

<template>
  <div class="map">
    <iframe
      class="map-frame"
      loading="lazy"
      :src="`https://www.openstreetmap.org/export/embed.html?bbox=${lon - bboxOffset}%2C${lat - bboxOffset}%2C${lon + bboxOffset}%2C${lat + bboxOffset}&marker=${lat}%2C${lon}`"
    />
  </div>
</template>

<style scoped>
.map {
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 1px solid var(--border-faint);
  height: 100%;
}

.map-frame {
  width: 100%;
  height: 100%;
  border: 0;
  filter: grayscale(20%) contrast(1.1);
}
</style>
