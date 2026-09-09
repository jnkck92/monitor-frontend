<script setup lang="ts">
import AlarmHeader from '@/components/AlarmHeader.vue'
import UnitGrid from '@/components/UnitGrid.vue';

import type { Unit, Alarm } from '@/types/api'

const props = defineProps<{
  alarm: Alarm
  units: Unit[]
}>()
</script>

<template>
  <div class="wrapper">
    <AlarmHeader :alarm="alarm" />
    <UnitGrid :vehicles="units" show-alert-state/>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style>
