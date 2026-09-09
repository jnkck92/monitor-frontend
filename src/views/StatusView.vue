<script setup lang="ts">
import { computed } from 'vue'
import { useStatus } from '@/composables/useStatus'
import StandbyView from './StandbyView.vue'
import StateScreen from '@/components/StateScreen.vue'
import AlarmView from './AlarmView.vue'
import ConnectionStatusBar from '@/components/ConnectionStatusBar.vue'

const { monitor, fetchError, loading, connectedSince, disconnectedSince } = useStatus()
const connectionOk = computed(() => fetchError.value === null)
const connectionSince = computed(() => connectionOk.value ? connectedSince.value : disconnectedSince.value)

const units = computed(() => {
  if (!monitor.value) return []
  return [
    ...monitor.value.vehicles.map(v => ({ ...v, type: 'vehicle' as const })),
    ...monitor.value.persons.map(p => ({ ...p, type: 'person' as const })),
  ]
})

</script>

<template>

  <div class="app-shell">

    <div class="content">
      <StateScreen v-if="loading && !monitor">Verbinde…</StateScreen>

      <AlarmView v-else-if="monitor?.alarm" :alarm="monitor.alarm" :units="units" />

      <StandbyView
        v-else-if="monitor"
        :department-name="monitor.departmentName"
        :units="units"
        :connection-ok="connectionOk"
      />

      <StateScreen v-else variant="error">
        <p>Keine Verbindung zum Server</p>
        <p class="hint">Erneuter Versuch läuft automatisch …</p>
      </StateScreen>

    </div>

    <ConnectionStatusBar :connection-ok="connectionOk" :since="connectionSince" />
  </div>

</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.hint {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}
</style>
