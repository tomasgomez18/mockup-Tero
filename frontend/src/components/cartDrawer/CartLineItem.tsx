import { Link } from 'react-router'
import { Trash2 } from 'lucide-react'
import QuantityStepper from '@/components/quantityStepper/QuantityStepper'
import { closeCart, MAX_QUANTITY, removeFromCart, updateCartQuantity } from '@/state/cartStore'
import type { CartLine } from '@/types/cart'
import { formatPrice } from '@/utils/price'

interface CartLineItemProps {
  line: CartLine
}

function CartLineItem({ line }: CartLineItemProps) {
  const { item, product, subtotal } = line
  const productUrl = `/producto/${product.slug}`

  return (
    <li className="flex gap-4 py-5">
      <Link
        to={productUrl}
        onClick={closeCart}
        className="aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-thumb bg-neutral-100"
      >
        <img src={product.images[0]} alt={product.name} className="size-full object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={productUrl}
            onClick={closeCart}
            className="text-sm font-medium text-neutral-900 hover:underline"
          >
            {product.name}
          </Link>
          <span className="shrink-0 text-sm font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          {item.color} · {item.size}
        </p>
        {item.quantity > 1 && (
          <p className="text-xs text-neutral-400">{formatPrice(product.price)} c/u</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper
            value={item.quantity}
            max={MAX_QUANTITY}
            onChange={(quantity) => updateCartQuantity(item.id, quantity)}
          />
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="size-3.5" />
            Quitar
          </button>
        </div>
      </div>
    </li>
  )
}

export default CartLineItem
