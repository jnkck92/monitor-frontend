import { ref, onUnmounted } from 'vue'

export function useClock() {
  const fmt = (d: Date) => ({
    time: d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    date: d.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }),
  })

  const { time, date } = fmt(new Date())
  const timeRef = ref(time)
  const dateRef = ref(date)

  const id = setInterval(() => {
    const v = fmt(new Date())
    timeRef.value = v.time
    dateRef.value = v.date
  }, 1000)

  onUnmounted(() => clearInterval(id))
  return { time: timeRef, date: dateRef }
}
