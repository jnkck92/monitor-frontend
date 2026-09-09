<script setup lang="ts">
import type { Unit } from '@/types/api'

import UnitCard from '@/components/UnitCard.vue'

withDefaults(defineProps<{
  vehicles: Unit[]
  showAlertState?: boolean
}>(), { showAlertState: false })
</script>

<template>
  <div class="card-grid">
    <UnitCard v-for="(v, i) in vehicles" :key="v.id" :unit="v" :show-alert-state="showAlertState" :class="{ 'group-start': i > 0 && vehicles[i - 1]?.type !== v.type }" />
  </div>
</template>

<style scoped>

.card-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: clamp(0.4rem, 0.8vh, 1rem);
  padding: clamp(0.5rem, 1vw, 1rem);
  background-color: var(--bg-surface);
}

.card-grid :deep(.group-start) {
  grid-column: 1;
  margin-top: clamp(0.8rem, 2vh, 1.5rem);
}
</style>
