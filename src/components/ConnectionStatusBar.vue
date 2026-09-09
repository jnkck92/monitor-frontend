<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  connectionOk: boolean
  since: number | null
}>()

const sinceFormatted = computed(() => {
  if (props.since === null) return null
  return new Date(props.since * 1000).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
})

const version = __APP_VERSION__
</script>

<template>
  <div class="status-bar" :class="connectionOk ? 'ok' : 'err'">
    <span class="dot" />
    <span class="label">{{ connectionOk ? 'Verbunden' : 'Keine Verbindung' }}</span>
    <span v-if="!connectionOk" class="since">seit {{ sinceFormatted }}</span>
    <span class="version">v{{ version }}</span>
  </div>
</template>

<style scoped>
.status-bar {
  display: flex;
  align-items: center;
  gap: 0.6em;
  flex-shrink: 0;
  padding: 0.3rem clamp(0.8rem, 2vw, 2rem);
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.6rem, 1vw, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  background-color: var(--bg-header);
  border-top: 1px solid var(--border-tile);
}

.dot {
  width: 0.6em;
  height: 0.6em;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.status-bar.ok  { color: var(--color-ok); }
.status-bar.err { color: var(--color-error); }

.label { text-transform: uppercase; }

.since {
  color: var(--text-secondary);
  font-weight: 400;
}

.version {
  color: var(--text-faint);
  font-weight: 400;
  margin-left: auto;
}
</style>
