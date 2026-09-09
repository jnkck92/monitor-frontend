import { ref, computed, onUnmounted } from 'vue'
import type { Monitor } from '@/types/api'
import { useRoute } from 'vue-router'
import { useConnectionTracking } from './useConnectionTracking'

export function useStatus() {
  const route = useRoute()
  const slug = route.params.slug as string
  const vehicleParam = route.query.vehicle
  const vehicle = Array.isArray(vehicleParam) ? vehicleParam[0] : vehicleParam

  const POLL_INTERVAL_MS = 5_000
    const STATUS_URL = `/api/v1/monitor/${slug}/status${
    vehicle ? `?vehicle=${encodeURIComponent(vehicle)}` : ''
  }`

  const monitor = ref<Monitor | null>(null)
  const fetchError = ref<string | null>(null)
  const loading = ref(true)

  const connectionOk = computed(() => fetchError.value === null)
  const { connectedSince, disconnectedSince } = useConnectionTracking(connectionOk)

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

  return { monitor, fetchError, loading, connectedSince, disconnectedSince }
}
