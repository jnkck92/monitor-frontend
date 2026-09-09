<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'default' | 'error' }>(), { variant: 'default' })
</script>

<template>
  <div class="state-screen" :class="variant">
    <slot />
  </div>
</template>

<style scoped>
.state-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 2rem;
  color: var(--text-secondary);
  background: var(--bg-surface);
  text-align: center;
  padding: 2rem;
}

.state-screen.error { color: #e74c3c; }
</style>
