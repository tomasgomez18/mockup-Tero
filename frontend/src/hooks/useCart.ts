import { useMemo, useSyncExternalStore } from 'react'
import { useCatalogProducts } from '@/hooks/useCatalogProducts'
import { cartStore } from '@/state/cartStore'
import { getCartCount, getCartLines, getCartTotal } from '@/utils/cart'

export function useCart() {
  const { items, isOpen } = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot)
  const products = useCatalogProducts()

  return useMemo(() => {
    const lines = getCartLines(items, products)
    return {
      isOpen,
      lines,
      count: getCartCount(lines),
      total: getCartTotal(lines),
    }
  }, [items, isOpen, products])
}
