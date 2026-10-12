<script setup lang="ts">
import type { Unit } from '@/types/api'
import Badge from '@/components/BadgeComponent.vue'

withDefaults(defineProps<{
  unit: Unit
  showAlertState?: boolean
  compact?: boolean
}>(), { showAlertState: false, compact: false })
</script>

<template>
  <div class="card" :class="{ inactive: showAlertState && !unit.alerted, own: unit.ownVehicle, compact }" :style="{ '--status-color': unit.radioStatus.color }">
    <div class="info">

      <Badge :color="'white'" :class="{ 'name-badge': !compact }">{{ unit.name }}</Badge>
    </div>
    <Badge v-if="!compact">{{ unit.callSign }}</Badge>
    <Badge v-if="unit.radioStatus !== null" :color="unit.radioStatus.color" class="status-badge">
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
  padding: clamp(0.2rem, 0.8vh, 0.6rem) clamp(0.8rem, 2vw, 2rem);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-faint);
  overflow: hidden;
  background-color: var(--bg-tile);
  container-type: size;
  gap: clamp(1rem, 1cqw, 2em);
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

.card.inactive {
  opacity: 0.2;
  filter: grayscale(60%);
}

.card.type-person  { border-left: 3px solid var(--color-person); }
.card.type-vehicle { border-left: 3px solid var(--color-vehicle); }

.card.compact {
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.4rem 0.3rem;
  container-type: normal;
  font-size: 0.8em;
  text-align: center;
}

.card.compact .info {
  flex: none;
  justify-content: center;
}

.card .name-badge.name-badge.name-badge {
  font-size: clamp(0.6rem, 68cqh, 4rem);
  line-height: 1.1;
  padding: 0.1em 0.6em;
  background: color-mix(in srgb, white 22%, transparent);
  border-color: color-mix(in srgb, white 70%, transparent);
}

.card .call-badge.call-badge.call-badge {
  font-size: clamp(0.6rem, 2vh, 2rem);
  font-weight: 400;
  opacity: 0.7;
  background: none;
  border-color: transparent;
}

.card .call-badge.call-badge.call-badge,
.card .name-badge.name-badge.name-badge,
.card .status-badge.status-badge.status-badge {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
}

.card .call-badge.call-badge.call-badge   { width: 7.5em; }
.card .name-badge.name-badge.name-badge   { width: 4.5em; }
.card .status-badge.status-badge.status-badge { width: 13em; }

.card .call-badge.call-badge.call-badge { margin-right: clamp(1rem, 4cqw, 6em); }

.card.compact .info {
  align-self: stretch;
}

.card.compact .info > :deep(.badge),
.card.compact .status-badge.status-badge.status-badge {
  width: 100%;
}

</style>
