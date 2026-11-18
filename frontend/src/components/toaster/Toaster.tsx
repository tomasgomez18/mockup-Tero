import { CircleAlert, CircleCheck, X } from 'lucide-react'
import { useToasts } from '@/hooks/useToasts'
import { dismissToast } from '@/state/toastStore'

function Toaster() {
  const toasts = useToasts()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[80] flex flex-col items-end gap-2 sm:left-auto"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full items-center gap-3 rounded-card bg-brand-600 px-4 py-3 text-sm text-white shadow-lg sm:w-auto sm:min-w-72"
        >
          {toast.variant === 'success' ? (
            <CircleCheck className="size-5 shrink-0 text-emerald-400" />
          ) : (
            <CircleAlert className="size-5 shrink-0 text-red-400" />
          )}
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => dismissToast(toast.id)}
            className="rounded-full p-1 text-neutral-400 transition-colors hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toaster
