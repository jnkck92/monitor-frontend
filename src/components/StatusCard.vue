<script setup lang="ts">
import type { Unit } from '@/types/api'

withDefaults(defineProps<{
  unit: Unit
  isOwn?: boolean
}>(), { isOwn: false })
</script>

<template>
  <div class="card" :class="{ inactive: !unit.alerted }" :style="{ borderLeftColor: unit.radioStatus.color }">
    <div class="info">
      <span class="name">{{ unit.name }}</span>
      <span class="type">{{ unit.callSign }}</span>
    </div>
    <span v-if="unit.radioStatus !== null" class="status" :style="{ color: unit.radioStatus.color }">
      {{ unit.radioStatus.label }}
    </span>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 0;
  padding: clamp(0.4rem, 1.5vh, 1rem) clamp(0.8rem, 2vw, 2rem);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-faint);
  border-left: 4px solid;
  overflow: hidden;
  background-color: var(--bg-tile);
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 18px 18px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.15em;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.name {
  font-size: clamp(1rem, 4vh, 5rem);
  font-weight: 700;
  color: var(--text-bright);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.type {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.5rem, 2vh, 2.5rem);
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status {
  font-family: 'Courier New', monospace;
  font-size: clamp(0.7rem, 2.5vh, 3rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  flex-shrink: 0;
  padding: 0.15em 0.5em;
  background: color-mix(in srgb, currentColor 15%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  border-radius: var(--border-radius);
}

.card.inactive {
  opacity: 0.2;
  filter: grayscale(60%);
}
</style>
