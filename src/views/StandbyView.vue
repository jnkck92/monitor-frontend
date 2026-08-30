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
      <div
        v-for="v in persons"
        :key="v.id"
        class="person-badge"
        :style="{ '--status-color': v.radioStatus.color }">
        <div class="person-info">
          <span class="person-name">{{ v.name }}</span>
          <span class="person-ric">{{ v.callSign }}</span>
        </div>
        <span v-if="v.radioStatus !== null" class="person-status" :style="{ color: v.radioStatus.color }">
          {{ v.radioStatus.label }}
        </span>
      </div>
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

.card-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: clamp(0.4rem, 0.8vh, 1rem);
  padding: clamp(0.5rem, 1vw, 1rem);
  background-color: var(--bg-surface);
}

.persons-bar {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.3rem, 0.8vw, 1rem);
  padding: clamp(0.4rem, 0.8vw, 0.8rem) clamp(0.5rem, 1vw, 1rem);
  border-bottom: 1px solid var(--border-tile);
  background-color: var(--bg-surface);
}

.person-badge {
  display: flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.3em 0.8em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-faint);  /* kein border-left-width mehr */
  /* box-shadow: 0 0 0 2px color-mix(in srgb, var(--status-color) 50%, transparent); */
  background-color: var(--bg-tile);
  background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 18px 18px;
  flex: 1;
  min-width: max-content;
}

.person-info {
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  min-width: 0;
}

.person-name {
  font-size: clamp(1rem, 2.2vw, 2rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-bright);
  white-space: nowrap;
}

.person-status {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.7rem, 1.4vw, 1.3rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  white-space: nowrap;
  opacity: 0.85;
  margin-left: auto;    /* ← nach rechts schieben */
  padding: 0.15em 0.5em;
    /* Hintergrund in Statusfarbe, dezent */
  background: color-mix(in srgb, currentColor 15%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  border-radius: var(--border-radius);
}

.person-ric {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.5rem, 1vw, 0.9rem);
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

</style>
