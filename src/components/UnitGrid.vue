<script setup lang="ts">
import { computed } from 'vue'
import type { Unit } from '@/types/api'
import UnitCard from '@/components/UnitCard.vue'

const props = withDefaults(defineProps<{
  units: Unit[]
  showAlertState?: boolean
}>(), { showAlertState: false })

const vehicles = computed(() => props.units.filter(u => u.type === 'vehicle'))
const persons = computed(() => props.units.filter(u => u.type === 'person'))
</script>

<template>
  <div class="panels">
    <section class="panel">
      <div class="card-grid">
        <UnitCard v-for="v in vehicles" :key="v.id" :unit="v" :show-alert-state="showAlertState" />
      </div>
    </section>
    <section v-if="persons.length" class="panel">
      <div class="card-grid person-row" :style="{ '--cols': persons.length }">
        <UnitCard v-for="p in persons" :key="p.id" :unit="p" compact :show-alert-state="showAlertState" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.panels {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: 2fr 1fr;
  gap: clamp(0.4rem, 2rem, 2rem);
}

.panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  background-color: var(--bg-surface);
}

.panel-title {
  flex-shrink: 0;
  margin: 0 0 0.6rem;
  font-size: clamp(1rem, 2vw, 1.6rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-subtle);
}

.card-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-auto-rows: 1fr;
  gap: clamp(0.4rem, 0.8vh, 1rem);
}

.panels:has(.panel-persons:only-child) {
  grid-template-rows: 1fr;
}

.panels {
  grid-template-rows: minmax(0, 1fr) auto; /* Fahrzeuge nehmen den Rest */
}

.person-row {
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  grid-auto-rows: auto;
}

</style>
