<script setup lang="ts">
import { computed } from 'vue'
import { useElapsed } from '@/composables/useElapsed'
import type { Alarm } from '@/types/api'

const props = defineProps<{ alarm: Alarm }>()

const parsedTitle = computed(() => {
  const title = props.alarm.title ?? ''
  const [, code, description] = title.match(/^([A-Za-z]+\s*\d+)\s*-\s*(.+)$/) ?? []
  if (code && description) return { code: code.trim(), description: description.trim() }
  return { code: null, description: title }
})

const alarmDateObj = computed(() => props.alarm.timestamp ? new Date(props.alarm.timestamp) : null)

const alarmTime = computed(() => {
  if (!alarmDateObj.value) return null
  return alarmDateObj.value.toLocaleTimeString('de-DE', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
})

const { elapsed } = useElapsed(() =>
  alarmDateObj.value ? Math.floor(alarmDateObj.value.getTime() / 1000) : null
)
</script>

<template>
  <header class="header">
    <div class="priority-bar" :style="{ backgroundColor: alarm.color }">
      <span v-if="parsedTitle.code">{{ parsedTitle.code }}</span>
      <span v-if="alarm.label"> · {{ alarm.label }}</span>
      <span v-else-if="parsedTitle.code" class="no-rule">Keine AAO hinterlegt</span>
    </div>

    <div class="body">
      <div class="keyword">{{ parsedTitle.description }}</div>
      <div v-if="alarm.address" class="address">{{ alarm.address }}</div>
    </div>

    <div v-if="alarm.timestamp" class="kpi-strip">
      <div class="kpi">
        <span class="kpi-value elapsed">{{ elapsed }}</span>
      </div>
      <div class="kpi">
        <span class="kpi-value">{{ alarmTime }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-tile);
}

.priority-bar {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.9rem, 1.8vw, 1.6rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  padding: 0.4rem 1rem;
}

.body {
  padding: clamp(0.8rem, 1.5vw, 1.5rem) 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.keyword {
  font-size: clamp(2rem, 5.5vw, 7rem);
  font-weight: 900;
  color: var(--text-bright);
  line-height: 1;
}

.address {
  font-size: clamp(0.9rem, 2.5vw, 2.2rem);
  color: var(--text-secondary);
}

.kpi-strip {
  display: flex;
  border-top: 1px solid var(--border-tile);
}

.kpi {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  gap: 0.4em;
  padding: clamp(0.25rem, 0.6vh, 0.5rem);
  border-right: 1px solid var(--border-tile);
}

.kpi:last-child { border-right: none; }

.kpi-label {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.55rem, 0.9vw, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-subtle);
}

.kpi-value {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.9rem, 1.8vw, 1.4rem);
  font-weight: 900;
  color: var(--text-bright);
  font-variant-numeric: tabular-nums;
}

.kpi-value.elapsed { color: var(--color-elapsed); }

.no-rule { color: #fff; font-weight: 800; }
</style>
