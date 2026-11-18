export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc'

export interface SortOptionItem {
  value: SortOption
  label: string
}

export interface PriceRange {
  id: string
  label: string
  min: number
  max: number
}

export interface ProductFilters {
  category: string | null
  sizes: string[]
  colors: string[]
  priceRangeId: string | null
  sort: SortOption
}
