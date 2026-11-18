import type { ProductColor } from '@/types/product'
import { cn } from '@/utils/cn'

interface ColorSwatchesProps {
  colors: ProductColor[]
  max?: number
  className?: string
}

function ColorSwatches({ colors, max = 4, className }: ColorSwatchesProps) {
  const visible = colors.slice(0, max)
  const remaining = colors.length - visible.length

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {visible.map((color) => (
        <span
          key={color.name}
          title={color.name}
          className="size-3.5 rounded-full ring-1 ring-neutral-900/15"
          style={{ backgroundColor: color.hex }}
        />
      ))}
      {remaining > 0 && <span className="text-xs text-neutral-500">+{remaining}</span>}
      <span className="sr-only">Colores: {colors.map((c) => c.name).join(', ')}</span>
    </div>
  )
}

export default ColorSwatches
