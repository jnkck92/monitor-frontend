<script setup lang="ts">
import { computed } from 'vue'
import AlarmHeader from '@/components/AlarmHeader.vue'
import UnitGrid from '@/components/UnitGrid.vue'
import AlarmMap from '@/components/AlarmMap.vue'

import type { Unit, Alarm } from '@/types/api'

const props = defineProps<{
  alarm: Alarm
  units: Unit[]
}>()

const hasCoords = computed(() => props.alarm.lat != null && props.alarm.lon != null)
</script>

<template>
  <div class="wrapper">
    <AlarmHeader :alarm="alarm" :show-address="false" />
    <div class="content">
      <UnitGrid class="units" :units="units" show-alert-state />
      <div class="side">
        <div class="map-block">
          <div v-if="hasCoords && alarm.address" class="address">
            <span class="street">{{ alarm.address }}</span>
          </div>
          <AlarmMap v-if="hasCoords" :lat="alarm.lat!" :lon="alarm.lon!" />
          <div v-else class="map-empty">
            <span class="map-empty-title">Keine Kartenposition</span>
            <span v-if="alarm.address" class="map-empty-text">{{ alarm.address }}</span>
            <span v-else class="map-empty-text">Es wurde kein Standort übermittelt</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.content {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 1rem;
  padding: 1rem;
}

.units {
  flex: 1;
  min-width: 0;
}

.side {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.map-block {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  min-height: 0;
}

.address {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.15;
  padding: 0.5rem 1rem;
  color: #fff;
  background: var(--color-alarm, #1a6bff);
  border-radius: var(--border-radius);
}
.street { font-size: clamp(1.6rem, 4vw, 3.4rem); font-weight: 800; }
.city   { font-size: clamp(1rem, 2vw, 1.6rem); font-weight: 600; opacity: 0.9; }

.map-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  padding: 1rem;
  border: 1px dashed var(--border-faint);
  border-radius: var(--border-radius);
  color: var(--text-subtle);
}
.map-empty-title { font-size: clamp(1rem, 2vw, 1.6rem); text-transform: uppercase; letter-spacing: .05em; }
.map-empty-text { font-size: clamp(1.2rem, 3vw, 2.6rem); color: var(--text-bright); }
</style>
