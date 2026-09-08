<script setup lang="ts">
import type { Unit } from '@/types/api'
import Badge from '@/components/BadgeComponent.vue'

withDefaults(defineProps<{
  unit: Unit
  isOwn?: boolean
}>(), { isOwn: false })
</script>

<template>
  <div class="card" :class="{ inactive: !unit.alerted }" :style="{ '--status-color': unit.radioStatus.color }">
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
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 18px 18px;
  container-type: size; /* macht die Card-Höhe für cqh in .name verfügbar */
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4em;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.name {
  font-size: 100cqh;
  line-height: 1;
  font-weight: 700;
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
</style>
