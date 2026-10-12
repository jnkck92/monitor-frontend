import { ref, computed, onUnmounted } from 'vue'
import type { Monitor } from '@/types/api'
import { useRoute } from 'vue-router'
import { useConnectionTracking } from './useConnectionTracking'

export function useMonitorData() {
  const route = useRoute()
  const tenant = route.params.slug as string
  const vehicleParam = route.query.vehicle
  const vehicle = Array.isArray(vehicleParam) ? vehicleParam[0] : vehicleParam

  const POLL_INTERVAL_MS = 5_000
  const STATUS_URL = `/api/v1/monitor/${tenant}/status`

  const monitor = ref<Monitor | null>(null)
  const fetchError = ref<string | null>(null)
  const loading = ref(true)

  const connectionOk = computed(() => fetchError.value === null)
  const { connectedSince, disconnectedSince } = useConnectionTracking(connectionOk)

  const units = computed(() => {
    if (!monitor.value) return []
    return [
      ...monitor.value.vehicles.map(v => ({ ...v, type: 'vehicle' as const })),
      ...monitor.value.persons.map(p => ({ ...p, type: 'person' as const })),
    ]
  })

  let intervalId: ReturnType<typeof setInterval> | null = null

  function startPolling() {
    async function fetchStatus() {
      try {
        const response = await fetch(STATUS_URL, {
          headers: {
            ...(vehicle ? { 'X-Vehicle': vehicle } : {}),
          },
        })
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

  return { monitor, fetchError, loading, connectionOk, connectedSince, disconnectedSince, tenant, units }
}
