import { useEffect, useId } from 'react'
import Button from '@/components/button/Button'
import { cn } from '@/utils/cn'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
  tone?: 'default' | 'danger'
}

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
  tone = 'default',
}: ConfirmDialogProps) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => event.key === 'Escape' && onCancel()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(event) => event.target === event.currentTarget && onCancel()}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-sm rounded-card bg-white p-6 shadow-xl">
        <h2 id={titleId} className="text-lg font-semibold text-neutral-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-neutral-500">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            className={cn(tone === 'danger' && 'bg-red-600 hover:bg-red-700 focus-visible:outline-red-600')}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
