<script setup lang="ts">
import { computed } from 'vue'
import { useStatus } from '@/composables/useStatus'
import StandbyView from './StandbyView.vue'
import AlarmView from './AlarmView.vue'

const { monitor, fetchError, loading } = useStatus()
const connectionOk = computed(() => fetchError.value === null)
</script>

<template>
  <div v-if="loading && !monitor" class="state-screen">Verbinde…</div>

  <AlarmView
    v-else-if="monitor?.alarm"
    :alarm="monitor.alarm"
    :persons="monitor.persons"
    :vehicles="monitor.vehicles"
  />

  <StandbyView
    v-else-if="monitor"
    :department-name="monitor.departmentName"
    :persons="monitor.persons"
    :vehicles="monitor.vehicles"
    :connection-ok="connectionOk"
  />

  <div v-else class="state-screen error">Fehler: {{ fetchError }}</div>
</template>

<style scoped>
.state-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 2rem;
  color: var(--text-secondary);
  background: var(--bg-surface);
}

.state-screen.error { color: #e74c3c; }
</style>
