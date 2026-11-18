import { Minus, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

const stepClass =
  'flex size-8 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-30'

function QuantityStepper({ value, onChange, min = 1, max = 10, className }: QuantityStepperProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white p-0.5',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Restar uno"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={stepClass}
      >
        <Minus className="size-3.5" />
      </button>
      <span aria-live="polite" className="min-w-6 text-center text-sm font-medium tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label="Sumar uno"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={stepClass}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

export default QuantityStepper
