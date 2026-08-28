import { ref, onUnmounted } from 'vue'
import type { Monitor } from '@/types/api'

const POLL_INTERVAL_MS = 5_000
const STATUS_URL = '/api/v1/monitor/status'

export function useStatus() {
  const monitor = ref<Monitor | null>(null)
  const fetchError = ref<string | null>(null)
  const loading = ref(true)

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
  const intervalId = setInterval(fetchStatus, POLL_INTERVAL_MS)
  onUnmounted(() => clearInterval(intervalId))

  return { monitor, fetchError, loading }
}
