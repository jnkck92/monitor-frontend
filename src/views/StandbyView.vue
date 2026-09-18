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
    <div class="content">
      <UnitGrid :vehicles="units" />
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
  flex: 1;
  display: flex;
  padding: 1rem;
}

</style>
