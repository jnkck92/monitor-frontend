<script setup lang="ts">
import type { Weather } from '@/types/api'

defineProps<{ weather: Weather }>()
</script>

<template>
  <div class="weather">
    <span class="temp">{{ Math.round(weather.tempC) }}°C</span>
    <span class="condition">{{ weather.condition }}</span>
    <span class="wind">{{ Math.round(weather.windKph) }} km/h Wind</span>
  </div>
</template>

<style scoped>
.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: clamp(0.5rem, 1.5vh, 1rem);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-faint);
  background-color: var(--bg-tile);
}

.temp {
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 900;
  color: var(--text-bright);
}

.condition { color: var(--text-secondary); }
.wind { font-size: 0.85rem; color: var(--text-subtle); }
</style>
