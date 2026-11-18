import type { Product } from '@/types/product'
import { formatPrice } from '@/utils/price'

export function getWhatsAppUrl(phoneNumber: string, message?: string) {
  const base = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

interface ProductInquiry {
  product: Product
  size: string | null
  color: string
  pageUrl: string
}

export function getProductInquiryMessage({ product, size, color, pageUrl }: ProductInquiry) {
  return [
    `¡Hola! Quiero consultar por este producto:`,
    `• ${product.name}`,
    `• Color: ${color}`,
    `• Presentación: ${size ?? '-'}`,
    `• Precio: ${formatPrice(product.price)}`,
    pageUrl,
  ].join('\n')
}
