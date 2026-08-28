<script setup lang="ts">
import StandbyHeader from '@/components/StandbyHeader.vue'
import StatusCard from '@/components/StatusCard.vue'
import type { Unit } from '@/types/api'

defineProps<{
  departmentName: string
  persons: Unit[]
  vehicles: Unit[]
  connectionOk: boolean
}>()

</script>

<template>
  <div class="wrapper">
    <StandbyHeader :department-name="departmentName" :connection-ok="connectionOk" />
    <div class="persons-bar">
      <StatusCard v-for="v in persons" :key="v.id" :unit="v" />
    </div>
    <div class="card-grid">
      <StatusCard v-for="v in vehicles" :key="v.id" :unit="v" />
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
