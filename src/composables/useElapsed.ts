import { ref, onUnmounted } from 'vue'

export function useElapsed(getTimestamp: () => number | null) {
  function format(s: number): string {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    const mm = String(m).padStart(2, '0')
    const ss = String(sec).padStart(2, '0')
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
  }

  const elapsed = ref('—')

  function update() {
    const ts = getTimestamp()
    if (!ts) { elapsed.value = '—'; return }
    elapsed.value = format(Math.max(0, Math.floor(Date.now() / 1000 - ts)))
  }

  update()
  const id = setInterval(update, 1000)
  onUnmounted(() => clearInterval(id))
  return { elapsed }
}
