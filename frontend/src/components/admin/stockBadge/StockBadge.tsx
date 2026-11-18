import type { Product } from '@/types/product'
import { cn } from '@/utils/cn'
import { getStockSummary } from '@/utils/stock'

interface StockBadgeProps {
  product: Product
}

function StockBadge({ product }: StockBadgeProps) {
  const { available, total } = getStockSummary(product)
  const status = available === total ? 'full' : available === 0 ? 'empty' : 'partial'

  const label = {
    full: 'En stock',
    partial: `${available} de ${total} presentaciones`,
    empty: 'Sin stock',
  }[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        status === 'full' && 'bg-emerald-50 text-emerald-700',
        status === 'partial' && 'bg-amber-50 text-amber-700',
        status === 'empty' && 'bg-red-50 text-red-700',
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          status === 'full' && 'bg-emerald-500',
          status === 'partial' && 'bg-amber-500',
          status === 'empty' && 'bg-red-500',
        )}
      />
      {label}
    </span>
  )
}

export default StockBadge
