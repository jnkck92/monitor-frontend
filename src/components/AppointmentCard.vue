<script setup lang="ts">
import type { EventItem } from '@/types/api'

defineProps<{ event: EventItem }>()
</script>

<template>
  <div class="card">
    <div class="date">
      {{ new Date(event.timestamp).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
    </div>
    <div class="info">
      <span class="title">{{ event.title }}</span>
      <span v-if="event.address" class="location">{{ event.address }}</span>
      <span v-if="event.participation" class="participation">{{ event.participation }} Rückmeldungen</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 2vw, 2rem);
  padding: clamp(0.4rem, 1.5vh, 1rem) clamp(0.8rem, 2vw, 2rem);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-faint);
  background-color: var(--bg-tile);
}

.date {
    font-size: clamp(1rem, 1.8vw, 1.4rem);
  font-family: 'Courier New', 'Consolas', monospace;
  font-weight: 700;
  color: var(--color-elapsed);
  white-space: nowrap;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.title { font-size: clamp(1rem, 2vw, 1.6rem); font-weight: 600; color: var(--text-bright); }
.location { font-size: clamp(0.85rem, 1.5vw, 1.2rem); color: var(--text-secondary); }
</style>
