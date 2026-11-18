import type { CartItem, CartState } from '@/types/cart'

const STORAGE_KEY = 'nexus-cart'
export const MAX_QUANTITY = 10

function loadItems(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function persistItems(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

let state: CartState = { items: loadItems(), isOpen: false }
const listeners = new Set<() => void>()

function setState(changes: Partial<CartState>) {
  state = { ...state, ...changes }
  if (changes.items) persistItems(changes.items)
  listeners.forEach((listener) => listener())
}

export const cartStore = {
  getSnapshot: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

interface AddToCartInput {
  productId: string
  color: string
  size: string
  quantity?: number
}

export function addToCart({ productId, color, size, quantity = 1 }: AddToCartInput) {
  const id = `${productId}__${color}__${size}`
  const existing = state.items.find((item) => item.id === id)
  const items = existing
    ? state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) } : item,
      )
    : [...state.items, { id, productId, color, size, quantity }]
  setState({ items, isOpen: true })
}

export function updateCartQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id)
    return
  }
  setState({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) } : item,
    ),
  })
}

export function removeFromCart(id: string) {
  setState({ items: state.items.filter((item) => item.id !== id) })
}

export function clearCart() {
  setState({ items: [] })
}

export function openCart() {
  setState({ isOpen: true })
}

export function closeCart() {
  setState({ isOpen: false })
}
