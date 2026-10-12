<script setup lang="ts">
import AlarmHeader from '@/components/AlarmHeader.vue'
import UnitGrid from '@/components/UnitGrid.vue';

import type { Unit, Alarm } from '@/types/api'

defineProps<{
  alarm: Alarm
  units: Unit[]
}>()
</script>

<template>
  <div class="wrapper">
    <AlarmHeader :alarm="alarm" :show-address="true" />
    <div class="unitGridWrapper">
      <UnitGrid :units="units" show-alert-state/>
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

.unitGridWrapper{
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 1rem;
}
</style>
