import { ShoppingBag } from 'lucide-react'
import CartLineItem from '@/components/cartDrawer/CartLineItem'
import Button from '@/components/button/Button'
import SideDrawer from '@/components/sideDrawer/SideDrawer'
import WhatsAppButton from '@/components/whatsAppButton/WhatsAppButton'
import { useCart } from '@/hooks/useCart'
import { useStoreContent } from '@/hooks/useStoreContent'
import { clearCart, closeCart } from '@/state/cartStore'
import { getOrderMessage } from '@/utils/cart'
import { formatPrice } from '@/utils/price'
import { getWhatsAppUrl } from '@/utils/whatsapp'

function CartDrawer() {
  const { isOpen, lines, count, total } = useCart()
  const { storeInfo } = useStoreContent()
  const isEmpty = lines.length === 0

  const title = (
    <span className="flex items-center gap-2">
      Tu carrito
      {count > 0 && <span className="text-sm font-normal text-neutral-500">({count})</span>}
    </span>
  )

  const footer = !isEmpty && (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-neutral-600">Total</span>
        <span className="text-xl font-semibold">{formatPrice(total)}</span>
      </div>
      <p className="text-xs text-neutral-500">
        Te enviamos el pedido por WhatsApp para coordinar el pago y el envío.
      </p>
      <WhatsAppButton href={getWhatsAppUrl(storeInfo.whatsappNumber, getOrderMessage(lines, total))}>
        Finalizar pedido por WhatsApp
      </WhatsAppButton>
      <button
        type="button"
        onClick={clearCart}
        className="text-center text-xs text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900"
      >
        Vaciar carrito
      </button>
    </div>
  )

  return (
    <SideDrawer open={isOpen} onClose={closeCart} title={title} footer={footer || undefined}>
      {isEmpty ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
            <ShoppingBag className="size-6" />
          </span>
          <p className="text-lg font-semibold">Tu carrito está vacío</p>
          <p className="max-w-xs text-sm text-neutral-500">
            Elegí un producto, su presentación y color, y agregalo para armar tu pedido.
          </p>
          <Button variant="outline" size="sm" onClick={closeCart} className="mt-2">
            Seguir mirando
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-neutral-100 px-5">
          {lines.map((line) => (
            <CartLineItem key={line.item.id} line={line} />
          ))}
        </ul>
      )}
    </SideDrawer>
  )
}

export default CartDrawer
