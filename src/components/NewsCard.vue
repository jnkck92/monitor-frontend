<script setup lang="ts">
import type { NewsItem } from '@/types/api'

defineProps<{ item: NewsItem }>()

</script>

<template>
  <div class="card">
    <div class="header">
      <span class="title">{{ item.title }}</span>
      <span class="date">{{ new Date(item.timestamp).toLocaleDateString('de-DE') }}</span>
    </div>
    <!--<p class="text">{{ item.description }}</p>-->
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: clamp(0.4rem, 1.5vh, 1rem) clamp(0.8rem, 2vw, 2rem);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-faint);
  background-color: var(--bg-tile);
}

.header { display: flex; justify-content: space-between; gap: 1rem; }
.title { font-size: clamp(1rem, 2vw, 1.6rem); font-weight: 700; color: var(--text-bright); }
.date { font-size: clamp(0.8rem, 1.4vw, 1.1rem); color: var(--text-subtle); white-space: nowrap; }
.text { font-size: clamp(0.95rem, 1.8vw, 1.4rem); color: var(--text-secondary); line-height: 1.4; }
</style>
