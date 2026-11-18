import { useSyncExternalStore } from 'react'
import { authStore } from '@/state/authStore'

export function useAuth() {
  const email = useSyncExternalStore(authStore.subscribe, authStore.getSnapshot)
  return { email, isAuthenticated: Boolean(email) }
}
