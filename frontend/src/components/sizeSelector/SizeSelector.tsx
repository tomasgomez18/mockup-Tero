import { Link } from 'react-router'
import { cn } from '@/utils/cn'

interface SizeSelectorProps {
  sizes: string[]
  unavailableSizes?: string[]
  selected: string | null
  onSelect: (size: string) => void
  error?: string
  guideTo?: string
}

function SizeSelector({
  sizes,
  unavailableSizes = [],
  selected,
  onSelect,
  error,
  guideTo,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-900">Presentación</p>
        {guideTo && (
          <Link
            to={guideTo}
            className="text-sm text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900"
          >
            Guía de talles
          </Link>
        )}
      </div>

      <div role="radiogroup" aria-label="Presentación" className="mt-3 flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isUnavailable = unavailableSizes.includes(size)
          const isSelected = size === selected
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isUnavailable}
              onClick={() => onSelect(size)}
              title={isUnavailable ? 'Sin stock' : undefined}
              className={cn(
                'h-11 min-w-12 rounded-thumb border px-3 text-sm font-medium transition-colors',
                isSelected && 'border-brand-600 bg-brand-600 text-white',
                !isSelected && !isUnavailable && 'border-neutral-300 bg-white text-neutral-900 hover:border-brand-600',
                isUnavailable && 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-300 line-through',
                error && !isSelected && !isUnavailable && 'border-red-300',
              )}
            >
              {size}
            </button>
          )
        })}
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default SizeSelector
