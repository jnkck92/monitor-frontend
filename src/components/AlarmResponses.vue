<script setup lang="ts">
import type { AlarmResponses } from '@/types/api'

defineProps<{ responses: AlarmResponses }>()
</script>

<template>
  <div class="responses">
    <div class="response coming">
      <span class="count">{{ responses.coming }}</span>
      <span class="label">Kommt</span>
    </div>
    <div class="response not-coming">
      <span class="count">{{ responses.notComing }}</span>
      <span class="label">Kommt nicht</span>
    </div>
    <div class="response unknown">
      <span class="count">{{ responses.unknown }}</span>
      <span class="label">Keine Rückmeldung</span>
    </div>
  </div>
</template>

<style scoped>
.responses {
  display: flex;
  flex-direction: row;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-faint);
  overflow: hidden;
  background-color: var(--bg-tile);
}

.response {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  padding: clamp(0.5rem, 1.5vh, 1rem) 0.25rem;
  border-right: 1px solid var(--border-faint);
}

.response:last-child { border-right: none; }

.count {
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  font-weight: 900;
  color: var(--text-bright);
}

.label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-subtle);
  text-align: center;
}

.response.coming .count { color: var(--color-ok); }
.response.not-coming .count { color: var(--color-error); }
</style>
