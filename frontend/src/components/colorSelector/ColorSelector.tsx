import type { ProductColor } from '@/types/product'
import { cn } from '@/utils/cn'

interface ColorSelectorProps {
  colors: ProductColor[]
  selected: ProductColor
  onSelect: (color: ProductColor) => void
}

function ColorSelector({ colors, selected, onSelect }: ColorSelectorProps) {
  return (
    <div>
      <p className="text-sm font-medium text-neutral-900">
        Color: <span className="font-normal text-neutral-500">{selected.name}</span>
      </p>
      <div role="radiogroup" aria-label="Color" className="mt-3 flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = color.name === selected.name
          return (
            <button
              key={color.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={color.name}
              title={color.name}
              onClick={() => onSelect(color)}
              style={{ backgroundColor: color.hex }}
              className={cn(
                'size-9 rounded-full ring-offset-2 ring-offset-neutral-50 transition-all',
                isSelected ? 'ring-2 ring-neutral-900' : 'ring-1 ring-neutral-900/15 hover:ring-neutral-900/40',
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ColorSelector
