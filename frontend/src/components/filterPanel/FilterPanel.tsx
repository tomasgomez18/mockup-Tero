import { Check } from 'lucide-react'
import FilterSection from '@/components/filterPanel/FilterSection'
import { priceRanges } from '@/data/filterOptions'
import type { ProductFilters } from '@/types/filters'
import type { ProductColor } from '@/types/product'
import { cn } from '@/utils/cn'

interface FilterPanelProps {
  sizes: string[]
  colors: ProductColor[]
  filters: ProductFilters
  onToggleSize: (size: string) => void
  onToggleColor: (color: string) => void
  onTogglePriceRange: (id: string) => void
}

const rowClass =
  'flex w-full items-center gap-3 rounded-thumb px-2 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100'

function FilterPanel({
  sizes,
  colors,
  filters,
  onToggleSize,
  onToggleColor,
  onTogglePriceRange,
}: FilterPanelProps) {
  return (
    <div>
      <FilterSection title="Presentación">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isSelected = filters.sizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggleSize(size)}
                className={cn(
                  'h-10 min-w-11 rounded-thumb border px-3 text-sm font-medium transition-colors',
                  isSelected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-neutral-300 bg-white text-neutral-900 hover:border-brand-600',
                )}
              >
                {size}
              </button>
            )
          })}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <ul className="-mx-2 flex flex-col gap-0.5">
          {colors.map((color) => {
            const isSelected = filters.colors.includes(color.name)
            return (
              <li key={color.name}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onToggleColor(color.name)}
                  className={cn(rowClass, isSelected && 'font-medium text-neutral-900')}
                >
                  <span
                    className="size-5 shrink-0 rounded-full ring-1 ring-neutral-900/15"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="flex-1">{color.name}</span>
                  {isSelected && <Check className="size-4" />}
                </button>
              </li>
            )
          })}
        </ul>
      </FilterSection>

      <FilterSection title="Precio">
        <ul className="-mx-2 flex flex-col gap-0.5">
          {priceRanges.map((range) => {
            const isSelected = filters.priceRangeId === range.id
            return (
              <li key={range.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onTogglePriceRange(range.id)}
                  className={cn(rowClass, isSelected && 'font-medium text-neutral-900')}
                >
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                      isSelected ? 'border-brand-600' : 'border-neutral-300',
                    )}
                  >
                    {isSelected && <span className="size-2.5 rounded-full bg-brand-600" />}
                  </span>
                  {range.label}
                </button>
              </li>
            )
          })}
        </ul>
      </FilterSection>
    </div>
  )
}

export default FilterPanel
