import type { Toast, ToastVariant } from '@/types/toast'
import { createId } from '@/utils/createId'

const DURATION_MS = 3500

let toasts: Toast[] = []
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export const toastStore = {
  getSnapshot: () => toasts,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

export function dismissToast(id: string) {
  toasts = toasts.filter((toast) => toast.id !== id)
  notify()
}

export function showToast(message: string, variant: ToastVariant = 'success') {
  const id = createId()
  toasts = [...toasts, { id, message, variant }]
  notify()
  setTimeout(() => dismissToast(id), DURATION_MS)
}
