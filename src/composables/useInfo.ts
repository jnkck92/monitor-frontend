import { ref, onUnmounted } from 'vue'
import type { NewsItem, EventItem } from '@/types/api'

const POLL_INTERVAL_MS = 60_000

export function useInfo(tenant: string) {
  const news = ref<NewsItem[]>([])
  const events = ref<EventItem[]>([])

  async function fetchInfo() {
    try {
      const [newsRes, eventsRes] = await Promise.all([
        fetch(`/api/v1/${tenant}/news`),
        fetch(`/api/v1/${tenant}/events`),
      ])
      if (newsRes.ok) news.value = await newsRes.json()
      if (eventsRes.ok) events.value = await eventsRes.json()
    } catch {
      // Info-Daten sind nicht kritisch – Fehler werden hier bewusst ignoriert
    }
  }

  fetchInfo()
  const intervalId = setInterval(fetchInfo, POLL_INTERVAL_MS)
  onUnmounted(() => clearInterval(intervalId))

  return { news, events }
}
