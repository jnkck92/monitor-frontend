<script setup lang="ts">
import StandbyHeader from '@/components/StandbyHeader.vue'
import UnitGrid from '@/components/UnitGrid.vue';

import type { Unit } from '@/types/api'

defineProps<{
  departmentName: string
  units: Unit[]
  connectionOk: boolean
}>()
</script>

<template>
  <div class="wrapper">
    <StandbyHeader :department-name="departmentName" :connection-ok="connectionOk" />
    <UnitGrid :vehicles="units" />
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
