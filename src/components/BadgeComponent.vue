<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
  size?: 'sm' | 'lg'
}>(), { color: 'var(--text-secondary)', size: 'sm' })
</script>

<template>
  <span class="badge" :class="size" :style="{ color }">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  font-family: 'Courier New', 'Consolas', monospace;
  font-weight: 700;
  flex-shrink: 0;
  padding: 0.15em 0.5em;
  background: color-mix(in srgb, currentColor 15%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  border-radius: var(--border-radius);
}

.badge.sm { font-size: clamp(0.6rem, 2.5vh, 3rem); }
.badge.lg { font-size: clamp(0.7rem, 2.5vh, 3rem); }
</style>
