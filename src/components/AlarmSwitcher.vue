<script setup lang="ts">
import type { Alarm } from '@/types/api'

defineProps<{ alarm: Alarm | null }>()
</script>

<template>
  <slot v-if="alarm" name="alarm" :alarm="alarm" />
  <slot v-else name="standby" />
</template>
