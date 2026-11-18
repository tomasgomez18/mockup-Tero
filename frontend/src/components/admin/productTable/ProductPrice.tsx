import type { Product } from '@/types/product'
import { formatPrice } from '@/utils/price'

interface ProductPriceProps {
  product: Product
}

function ProductPrice({ product }: ProductPriceProps) {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-neutral-900">{formatPrice(product.price)}</span>
      {product.compareAtPrice && (
        <span className="text-xs text-neutral-400 line-through">
          {formatPrice(product.compareAtPrice)}
        </span>
      )}
    </div>
  )
}

export default ProductPrice
