<script setup lang="ts">
import AlarmHeader from '@/components/AlarmHeader.vue'
import UnitGrid from '@/components/UnitGrid.vue'
import AlarmMap from '@/components/AlarmMap.vue'
import WeatherWidget from '@/components/WeatherWidget.vue'
//import AlarmResponses from '@/components/AlarmResponses.vue'

import type { Unit, Alarm } from '@/types/api'

defineProps<{
  alarm: Alarm
  units: Unit[]
}>()

// Dummy-Werte, bis Backend location/weather liefert
const dummyLocation = { lat: 53.1751688, lon: 8.7377744 }
const dummyWeather = { tempC: 14, condition: 'Bewölkt', windKph: 12 }
const dummyResponses = { coming: 8, notComing: 3, unknown: 5 }
</script>

<template>
  <div class="wrapper">
    <AlarmHeader :alarm="alarm" />
    <div class="content">
      <UnitGrid class="units" :vehicles="units" show-alert-state />
      <div class="side">
        <!--<AlarmResponses :responses="alarm.responses ?? dummyResponses" />-->
        <div class="map-block">
          <AlarmMap v-if="alarm.lat != null && alarm.lon != null" :lat="alarm.lat" :lon="alarm.lon" />
          <div v-else class="map-pending">Standort wird ermittelt …</div>
          <span v-if="alarm.address" class="address">{{ alarm.address }}</span>
        </div>
        <WeatherWidget :weather="alarm.weather ?? dummyWeather" />
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
  flex: 1;
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
  font-size: clamp(1rem, 2vw, 1.6rem);
  font-weight: 600;
  color: var(--text-bright);
  text-align: center;
}
</style>
