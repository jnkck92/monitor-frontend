import { ref, onUnmounted } from 'vue'
import type { Monitor } from '@/types/api'

const POLL_INTERVAL_MS = 5_000
const STATUS_URL = '/api/v1/monitor/status'
const STREAM_URL = '/api/v1/monitor/stream'

export function useStatus() {
  const monitor = ref<Monitor | null>(null)
  const fetchError = ref<string | null>(null)
  const loading = ref(true)

  let es: EventSource | null = null
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

  if (typeof EventSource !== 'undefined') {
    es = new EventSource(STREAM_URL)

    es.addEventListener('state', (event: MessageEvent) => {
      try {
        monitor.value = JSON.parse(event.data) as Monitor
        fetchError.value = null
      } catch {
        fetchError.value = 'Ungültige Daten vom Server'
      } finally {
        loading.value = false
      }
    })

    // SSE not available or broken — fall back to polling
    es.onerror = () => {
      fetchError.value = 'SSE-Verbindung unterbrochen'
      es?.close()
      es = null
      startPolling()
    }
  } else {
    startPolling()
  }

  onUnmounted(() => {
    es?.close()
    if (intervalId !== null) clearInterval(intervalId)
  })

  return { monitor, fetchError, loading }
}
