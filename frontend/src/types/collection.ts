import type { Product } from '@/types/product'

export interface Collection {
  slug: string
  title: string
  description: string
  includes: (product: Product) => boolean
}
