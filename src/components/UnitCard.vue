<script setup lang="ts">
import type { Unit } from '@/types/api'
import Badge from '@/components/BadgeComponent.vue'

withDefaults(defineProps<{
  unit: Unit
  showAlertState?: boolean
}>(), { showAlertState: false })
</script>

<template>
  <div class="card" :class="{ inactive: showAlertState && !unit.alerted, own: unit.ownVehicle }" :style="{ '--status-color': unit.radioStatus.color }">
    <div class="info">
      <Badge>{{ unit.callSign }}</Badge>
      <span class="name">{{ unit.name }}</span>
    </div>
    <Badge v-if="unit.radioStatus !== null" :color="unit.radioStatus.color">
      {{ unit.radioStatus.label }}
    </Badge>
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
  overflow: hidden;
  background-color: var(--bg-tile);
  container-type: size;
}

.card.own {
  border: 1px solid var(--border-own);
  background-color: color-mix(in srgb, white 4%, var(--bg-tile));
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(0.5em, 3cqw, 4em);
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.name {
  font-size: 200cqh;
  line-height: 1;
  font-weight: 400;
  color: var(--text-bright);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.card.inactive {
  opacity: 0.2;
  filter: grayscale(60%);
}

.card.type-person  { border-left: 3px solid var(--color-person); }
.card.type-vehicle { border-left: 3px solid var(--color-vehicle); }
</style>
