<script setup lang="ts">
import { computed } from 'vue'
import { useStatus } from '@/composables/useStatus'
import StandbyView from './StandbyView.vue'
import AlarmView from './AlarmView.vue'
import ConnectionStatusBar from '@/components/ConnectionStatusBar.vue'

const { monitor, fetchError, loading, connectedSince, disconnectedSince } = useStatus()
const connectionOk = computed(() => fetchError.value === null)
const connectionSince = computed(() => connectionOk.value ? connectedSince.value : disconnectedSince.value)
</script>

<template>
  <div class="app-shell">
    <div class="content">
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

      <div v-else class="state-screen error">
        <p>Keine Verbindung zum Server</p>
        <p class="hint">Erneuter Versuch läuft automatisch …</p>
      </div>
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

.state-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 2rem;
  color: var(--text-secondary);
  background: var(--bg-surface);
}

.state-screen.error {
  color: #e74c3c;
  flex-direction: column;
}

.state-screen.error .hint {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}
</style>
