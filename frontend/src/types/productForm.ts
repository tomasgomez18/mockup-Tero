import type { Product } from '@/types/product'

export interface ProductFormValues
  extends Omit<Product, 'id' | 'price' | 'compareAtPrice' | 'unavailableSizes' | 'campaignLabel'> {
  price: string
  onSale: boolean
  salePrice: string
  unavailableSizes: string[]
}

export type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>
