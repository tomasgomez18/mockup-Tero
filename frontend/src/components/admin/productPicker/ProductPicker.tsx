import { useMemo, useState } from 'react'
import { Check, Search } from 'lucide-react'
import type { Product } from '@/types/product'
import { cn } from '@/utils/cn'
import { fieldClass } from '@/utils/fieldStyles'
import { formatPrice } from '@/utils/price'
import { normalizeText } from '@/utils/text'

interface ProductPickerProps {
  products: Product[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

function ProductPicker({ products, selectedIds, onChange }: ProductPickerProps) {
  const [query, setQuery] = useState('')

  const visibleProducts = useMemo(() => {
    const search = normalizeText(query)
    return products.filter((product) => normalizeText(product.name).includes(search))
  }, [products, query])

  const toggle = (id: string) =>
    onChange(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar producto"
            aria-label="Buscar producto"
            className={cn(fieldClass, 'pl-9')}
          />
        </div>
        <span className="shrink-0 text-sm text-neutral-500">
          {selectedIds.length} {selectedIds.length === 1 ? 'elegido' : 'elegidos'}
        </span>
      </div>

      <ul className="max-h-80 divide-y divide-neutral-100 overflow-y-auto rounded-thumb border border-neutral-200 bg-white">
        {visibleProducts.map((product) => {
          const isSelected = selectedIds.includes(product.id)
          return (
            <li key={product.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(product.id)}
                className={cn(
                  'flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-neutral-50',
                  isSelected && 'bg-neutral-50',
                )}
              >
                <span
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded border transition-colors',
                    isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-neutral-300',
                  )}
                >
                  {isSelected && <Check className="size-3.5" />}
                </span>
                <img src={product.images[0]} alt="" className="size-10 shrink-0 rounded-thumb object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-neutral-900">{product.name}</span>
                  <span className="block text-xs text-neutral-500">{product.category}</span>
                </span>
                <span className="shrink-0 text-sm text-neutral-600">{formatPrice(product.price)}</span>
              </button>
            </li>
          )
        })}
        {visibleProducts.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-neutral-500">No hay productos con ese nombre</li>
        )}
      </ul>
    </div>
  )
}

export default ProductPicker
