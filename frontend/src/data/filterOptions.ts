import type { PriceRange, SortOptionItem } from '@/types/filters'

export const sortOptions: SortOptionItem[] = [
  { value: 'featured', label: 'Destacados' },
  { value: 'newest', label: 'Novedades' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
]

export const priceRanges: PriceRange[] = [
  { id: 'low', label: 'Hasta $30.000', min: 0, max: 30000 },
  { id: 'mid', label: '$30.000 a $50.000', min: 30000, max: 50000 },
  { id: 'high', label: 'Más de $50.000', min: 50000, max: Infinity },
]

export const sizeGroups = [
  { label: 'Letras', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  { label: 'Números', sizes: ['36', '38', '40', '42', '44', '46'] },
  { label: 'Otros', sizes: ['Único'] },
]

export const sizeOrder = sizeGroups.flatMap((group) => group.sizes)
