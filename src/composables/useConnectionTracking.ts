import { ref, watch, type Ref } from 'vue'

export function useConnectionTracking(ok: Ref<boolean>) {
  const connectedSince = ref<number | null>(null)
  const disconnectedSince = ref<number | null>(null)
  let wasConnected: boolean | null = null

  watch(ok, (isOk) => {
    if (wasConnected === isOk) return
    const now = Math.floor(Date.now() / 1000)
    if (isOk) connectedSince.value = now
    else disconnectedSince.value = now
    wasConnected = isOk
  }, { immediate: true })

  return { connectedSince, disconnectedSince }
}
