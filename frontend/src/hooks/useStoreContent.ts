import { useSyncExternalStore } from 'react'
import { contentStore } from '@/state/contentStore'

export function useStoreContent() {
  return useSyncExternalStore(contentStore.subscribe, contentStore.getSnapshot)
}
