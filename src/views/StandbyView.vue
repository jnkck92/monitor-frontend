<script setup lang="ts">
import { computed } from 'vue'

import StandbyHeader from '@/components/StandbyHeader.vue'
import UnitGrid from '@/components/UnitGrid.vue';

import type { Unit } from '@/types/api'

const props = defineProps<{
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
