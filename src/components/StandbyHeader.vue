<script setup lang="ts">
import { useClock } from '@/composables/useClock'

defineProps<{ departmentName: string; connectionOk: boolean }>()
const { time, date } = useClock()
</script>

<template>
  <div class="header-wrapper">
    <div class="left">
      <div class="name">{{ departmentName }}</div>
      <div class="conn" :class="connectionOk ? 'ok' : 'err'">
        {{ connectionOk ? '● VERBUNDEN' : '● KEINE VERBINDUNG' }}
      </div>
    </div>
    <div class="clock-wrapper">
      <div class="clock">{{ time }}</div>
      <div class="clock-date">{{ date }}</div>
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: clamp(0.8rem, 1.5vw, 1.5rem) clamp(0.8rem, 2vw, 2rem);
  background-color: var(--bg-surface);
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 18px 18px;
  border-bottom: 1px solid var(--border-tile);
  border-top: 2px solid #2563eb
}

.left {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.name {
  font-size: clamp(1.2rem, 3vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-bright);
  overflow-wrap: break-word;
}

.conn {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.55rem, 1vw, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.conn.ok  { color: #1e9e4a; }
.conn.err { color: #c0392b; }

.clock-wrapper { text-align: right; flex-shrink: 0; }

.clock {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(1.2rem, 3vw, 3.5rem);
  font-weight: 700;
  color: var(--text-bright);
  white-space: nowrap;
  letter-spacing: 0.05em;
}

.clock-date {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: clamp(0.7rem, 1.5vw, 1.8rem);
  color: var(--text-secondary);
  white-space: nowrap;
  letter-spacing: 0.03em;
}
</style>
