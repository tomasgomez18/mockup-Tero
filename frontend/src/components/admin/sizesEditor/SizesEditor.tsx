import { sizeGroups } from '@/data/filterOptions'
import { cn } from '@/utils/cn'
import { sortSizes } from '@/utils/productForm'

interface SizesEditorProps {
  sizes: string[]
  unavailableSizes: string[]
  onChange: (sizes: string[], unavailableSizes: string[]) => void
}

function SizesEditor({ sizes, unavailableSizes, onChange }: SizesEditorProps) {
  const toggleSize = (size: string) => {
    if (sizes.includes(size)) {
      onChange(
        sizes.filter((item) => item !== size),
        unavailableSizes.filter((item) => item !== size),
      )
    } else {
      onChange(sortSizes([...sizes, size]), unavailableSizes)
    }
  }

  const toggleStock = (size: string) =>
    onChange(
      sizes,
      unavailableSizes.includes(size)
        ? unavailableSizes.filter((item) => item !== size)
        : [...unavailableSizes, size],
    )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {sizeGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.sizes.map((size) => {
                const isSelected = sizes.includes(size)
                return (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleSize(size)}
                    className={cn(
                      'h-10 min-w-11 rounded-thumb border px-3 text-sm font-medium transition-colors',
                      isSelected
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-600',
                    )}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {sizes.length > 0 && (
        <div className="border-t border-neutral-200 pt-5">
          <p className="text-sm font-medium text-neutral-900">Stock por presentación</p>
          <p className="mt-0.5 mb-3 text-xs text-neutral-500">
            Tocá una presentación para marcarlo con o sin stock. Los que no tienen stock aparecen tachados en la tienda.
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const inStock = !unavailableSizes.includes(size)
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={inStock}
                  onClick={() => toggleStock(size)}
                  className={cn(
                    'flex h-10 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors',
                    inStock
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400'
                      : 'border-red-200 bg-red-50 text-red-700 hover:border-red-400',
                  )}
                >
                  <span className={cn('size-2 rounded-full', inStock ? 'bg-emerald-500' : 'bg-red-500')} />
                  {size}
                  <span className="text-xs font-normal opacity-80">{inStock ? 'Con stock' : 'Sin stock'}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default SizesEditor
