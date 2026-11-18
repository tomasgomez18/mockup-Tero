import type { Product } from '@/types/product'

export interface CartItem {
  id: string
  productId: string
  color: string
  size: string
  quantity: number
}

export interface CartLine {
  item: CartItem
  product: Product
  subtotal: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}
