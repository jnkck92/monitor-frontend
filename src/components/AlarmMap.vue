<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{ lat: number; lon: number }>()
const el = ref<HTMLDivElement>()
let map: L.Map
let marker: L.Marker
const ZOOM = 17
let area: L.Circle

onMounted(() => {
  map = L.map(el.value!, {
    zoomControl: false,
    attributionControl: true,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    boxZoom: false,
    keyboard: false,
  }).setView([props.lat, props.lon], ZOOM)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Einsatzlog112',
    maxZoom: 19,
  }).addTo(map)

  area = L.circle([props.lat, props.lon], {
    radius: 300, color: '#ef4444', weight: 2, fillOpacity: 0.05, dashArray: '6 6',
  }).addTo(map)

  L.control.scale({ imperial: false }).addTo(map)

  const icon = L.divIcon({
    className: 'alarm-pin',
    html: '<span class=""></span><span class="pin"></span>',
    iconSize: [72, 60],
    iconAnchor: [36, 53],
  })
  marker = L.marker([props.lat, props.lon], { icon, interactive: false }).addTo(map)
})

watch(() => [props.lat, props.lon] as const, ([lat, lon]) => {
  map.setView([lat, lon], ZOOM)
  marker.setLatLng([lat, lon])
  area.setLatLng([lat, lon])
})
</script>

<template>
  <div ref="el" class="map" />
</template>

<style scoped>
.map {
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 1px solid var(--border-faint);
  height: 100%;
  min-height: 0;
}

.map :deep(.alarm-pin) { position: relative; }
.map :deep(.pin) {
  position: absolute; left: 14px; top: 0;
  width: 44px; height: 44px;
  background: #ef4444; border: 5px solid #fff;
  border-radius: 50% 50% 50% 0; transform: rotate(-45deg);
  box-shadow: 0 3px 10px rgb(0 0 0 / .6);
}
.map :deep(.pin)::after {
  content: ''; position: absolute; inset: 25%;
  background: #fff; border-radius: 50%;
}
.map :deep(.pulse) {
  position: absolute; left: 0; top: 41px;
  width: 72px; height: 24px; border-radius: 50%;
  background: rgb(239 68 68 / .5);
  animation: pulse 1.6s ease-out infinite;
}
</style>
