<script setup lang="ts">
import { computed } from 'vue'
import type { Monitor } from '@/types/api'
import StateScreen from './StateScreen.vue'
import ConnectionStatusBar from './ConnectionStatusBar.vue'

const props = defineProps<{
  monitor: Monitor | null
  loading: boolean
  connectionOk: boolean
  connectedSince: number | null
  disconnectedSince: number | null
}>()

const connectionSince = computed(() => (props.connectionOk ? props.connectedSince : props.disconnectedSince))
</script>

<template>
  <div class="app-shell">
    <div class="content">
      <StateScreen v-if="loading && !monitor">Verbinde…</StateScreen>
      <slot v-else-if="monitor" />
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
