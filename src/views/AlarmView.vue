<script setup lang="ts">
import AlarmHeader from '@/components/AlarmHeader.vue'
import StatusCard from '@/components/StatusCard.vue'
import type { Unit, Alarm } from '@/types/api'

defineProps<{
  alarm: Alarm
  persons: Unit[]
  vehicles: Unit[]
}>()

</script>

<template>
  <div class="wrapper">
    <AlarmHeader :alarm="alarm" />
    <div class="persons-bar">
      <StatusCard v-for="v in persons" :key="v.id" :unit="v" />
    </div>
    <div class="card-grid">
      <StatusCard v-for="v in vehicles" :key="v.id" :unit="v"/>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.persons-bar {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: clamp(0.3rem, 0.8vw, 1rem);
  padding: clamp(0.4rem, 0.8vw, 0.8rem) clamp(0.5rem, 1vw, 1rem);
  border-bottom: 1px solid var(--border-tile);
  background-color: var(--bg-surface);
}

.card-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: clamp(0.4rem, 0.8vh, 1rem);
  padding: clamp(0.5rem, 1vw, 1rem);
  background-color: var(--bg-surface);
}
</style>
