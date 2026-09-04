import { ref, onUnmounted } from 'vue'
import type { Monitor } from '@/types/api'
import { useRoute } from 'vue-router'

export function useStatus() {

  const route = useRoute()
  const slug = route.params.slug as string

  const POLL_INTERVAL_MS = 5_000
  const STATUS_URL = `/api/v1/monitor/${slug}/status`

  const monitor = ref<Monitor | null>(null)
  const fetchError = ref<string | null>(null)
  const loading = ref(true)

  let intervalId: ReturnType<typeof setInterval> | null = null

  function startPolling() {
    async function fetchStatus() {
      try {
        const response = await fetch(STATUS_URL)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        monitor.value = (await response.json()) as Monitor
        fetchError.value = null
      } catch (e) {
        fetchError.value = e instanceof Error ? e.message : 'Unbekannter Fehler'
      } finally {
        loading.value = false
      }
    }
    fetchStatus()
    intervalId = setInterval(fetchStatus, POLL_INTERVAL_MS)
  }

  startPolling()

  onUnmounted(() => {
    if (intervalId !== null) clearInterval(intervalId)
  })

  return { monitor, fetchError, loading }
}
