<script setup lang="ts">
import StandbyHeader from '@/components/StandbyHeader.vue'
import UnitGrid from '@/components/UnitGrid.vue'
import AppointmentCard from '@/components/AppointmentCard.vue'
import NewsCard from '@/components/NewsCard.vue'
import { useInfo } from '@/composables/useInfo'

import type { Unit } from '@/types/api'

const props = defineProps<{
  departmentName: string
  connectionOk: boolean
  units: Unit[]
  tenant: string
}>()

const { news, events } = useInfo(props.tenant)
</script>

<template>
  <div class="wrapper">
    <StandbyHeader :department-name="departmentName" :connection-ok="connectionOk" />
    <div class="content">
      <UnitGrid class="units" :units="units" />
      <div class="side">
        <section class="column">
          <h2 class="section-title">Termine</h2>
          <div class="list">
            <AppointmentCard v-for="e in events" :key="e.id" :event="e" />
          </div>
        </section>
        <section class="column">
          <h2 class="section-title">News</h2>
          <div class="list">
            <NewsCard v-for="n in news" :key="n.id" :item="n" />
          </div>
        </section>
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
  overflow: hidden;
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
  min-height: 0;
  overflow: hidden;
}


.column {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.section-title {
  font-size: clamp(1.1rem, 2.2vw, 1.8rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-subtle);
}

.list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 0.8vh, 1rem);
}
</style>
