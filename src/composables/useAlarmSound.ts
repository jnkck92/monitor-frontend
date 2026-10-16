import { watch, type Ref } from 'vue'
import type { Monitor } from '@/types/api'

// timestamp ändert sich bei jedem Poll, daher Identität aus stabilen Feldern bilden
let lastPlayedId: string | null = null

export function useAlarmSound(monitor: Ref<Monitor | null>, tenant: string) {
  watch(
    () => {
      const a = monitor.value?.alarm
      return a ? `${a.title}|${a.keyword}|${a.address ?? ''}` : null
    },
    (id) => {
      if (!id) {
        lastPlayedId = null
        return
      }
      if (id === lastPlayedId) return
      lastPlayedId = id

      const filename = monitor.value?.alarm?.audioUrl?.split('/').pop()
      const src = filename
        ? `/api/v1/monitor/audio/${encodeURIComponent(tenant)}/${encodeURIComponent(filename)}`
        : '/alarm.mp3'
      new Audio(src).play().catch(() => {})
    },
  )
}
