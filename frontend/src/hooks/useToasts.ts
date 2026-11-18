import { useSyncExternalStore } from 'react'
import { toastStore } from '@/state/toastStore'

export function useToasts() {
  return useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot)
}
