import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import Badge from '@/components/badge/Badge'
import type { Product } from '@/types/product'
import { formatPrice, getDiscount } from '@/utils/price'

interface ProductOfferListProps {
  products: Product[]
}

function ProductOfferList({ products }: ProductOfferListProps) {
  return (
    <ul className="divide-y divide-neutral-100">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            to={`/admin/productos/${product.id}`}
            className="flex items-center gap-3 py-3 transition-colors hover:bg-neutral-50 sm:px-2"
          >
            <img src={product.images[0]} alt="" className="size-11 shrink-0 rounded-thumb object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-900">{product.name}</p>
              {product.compareAtPrice && (
                <p className="flex items-baseline gap-2 text-sm">
                  <span className="text-xs text-neutral-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="font-semibold text-red-600">{formatPrice(product.price)}</span>
                </p>
              )}
            </div>
            {product.compareAtPrice && (
              <Badge variant="sale">-{getDiscount(product.price, product.compareAtPrice)}%</Badge>
            )}
            <ChevronRight className="size-4 shrink-0 text-neutral-400" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ProductOfferList
