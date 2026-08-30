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

const alarmTime = computed(() => {
  if (!props.alarm.alarmDate) return null
  return new Date(props.alarm.alarmDate * 1000).toLocaleTimeString('de-DE', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
})

const { elapsed } = useElapsed(() => props.alarm.alarmDate ?? null)

</script>

<template>
  <header class="header">
    <div class="left">
      <div class="badge">
        {{ parsedTitle.code }}
        <span v-if="alarm.label"> · {{ alarm.label }}</span>
        <span v-else-if="parsedTitle.code" class="no-rule">Keine AAO hinterlegt</span>
      </div>
      <div class="keyword">{{ parsedTitle.description }}</div>
      <div v-if="alarm.address" class="address">{{ alarm.address }}</div>
    </div>
    <div v-if="alarm.alarmDate" class="right">
      <div class="meta">
        <span class="elapsed">{{ elapsed }}</span>
        <span class="alarm-time">ALARM {{ alarmTime }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: stretch;
  background-color: var(--bg-surface);
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 18px 18px;
  border-bottom: 1px solid var(--border-tile);
  border-top: 4px solid v-bind('alarm.color');
}

.left {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.15rem;
}

.badge {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.7rem, 2.4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: v-bind('alarm.color');
  margin-bottom: 0.2rem;
}

.keyword {
  font-size: clamp(2rem, 5.5vw, 5rem);
  font-weight: 900;
  color: var(--text-bright);
  line-height: 1;
}

.address {
  font-size: clamp(0.8rem, 3vw, 3rem);
  color: var(--text-bright);
  margin-top: 0.2rem;
}

.right {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1.5vh, 1.5rem);
  align-items: flex-end;
  justify-content: center;
  padding: clamp(0.8rem, 1.5vw, 1.5rem) clamp(1rem, 2.5vw, 2.5rem);
  border-left: 1px solid var(--border-tile);
  min-width: max-content;
}

.meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1em;
}

.label {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.65rem, 1vw, 1rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.val {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(1.5rem, 3.5vw, 4rem);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text-bright);
  letter-spacing: 0.05em;
  line-height: 1;
}

.elapsed {
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: 900;
  color: var(--color-elapsed);
  font-variant-numeric: tabular-nums;
}

.alarm-time {
  font-size: clamp(0.6rem, 1.2vw, 1rem);
  letter-spacing: 0.12em;
  color: var(--text-secondary);
}
.no-rule { color: var(--color-elapsed); font-weight: 800; letter-spacing: 0.1em; }
</style>
