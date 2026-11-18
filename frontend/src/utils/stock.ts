import type { Product } from '@/types/product'

export function getStockSummary(product: Product) {
  const total = product.sizes.length
  const unavailable = product.sizes.filter((size) => product.unavailableSizes?.includes(size)).length
  return { total, available: total - unavailable }
}
