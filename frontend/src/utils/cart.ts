import type { CartItem, CartLine } from '@/types/cart'
import type { Product } from '@/types/product'
import { formatPrice } from '@/utils/price'

export function getCartLines(items: CartItem[], products: Product[]): CartLine[] {
  return items.flatMap((item) => {
    const product = products.find((current) => current.id === item.productId)
    return product ? [{ item, product, subtotal: product.price * item.quantity }] : []
  })
}

export function getCartCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.item.quantity, 0)
}

export function getCartTotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.subtotal, 0)
}

export function getOrderMessage(lines: CartLine[], total: number) {
  const detail = lines.map(
    ({ item, product, subtotal }, index) =>
      `${index + 1}. ${product.name}\n   Color: ${item.color} · Presentación: ${item.size} · Cantidad: ${item.quantity}\n   ${formatPrice(subtotal)}`,
  )
  return ['¡Hola! Quiero hacer este pedido:', '', ...detail, '', `Total: ${formatPrice(total)}`].join('\n')
}
