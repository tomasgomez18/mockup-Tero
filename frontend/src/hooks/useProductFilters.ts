import { useMemo, useState } from 'react'
import { priceRanges, sizeOrder } from '@/data/filterOptions'
import type { ProductFilters, SortOption } from '@/types/filters'
import type { Product, ProductColor } from '@/types/product'

const initialFilters: ProductFilters = {
  category: null,
  sizes: [],
  colors: [],
  priceRangeId: null,
  sort: 'featured',
}

const bySizeOrder = (a: string, b: string) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)

function sortProducts(products: Product[], sort: SortOption) {
  const sorted = [...products]
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  if (sort === 'newest') sorted.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
  return sorted
}

function hasAvailableSize(product: Product, sizes: string[]) {
  return product.sizes.some((size) => sizes.includes(size) && !product.unavailableSizes?.includes(size))
}

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)

  const options = useMemo(() => {
    const categories = [...new Set(products.map((product) => product.category))]
    const sizes = [...new Set(products.flatMap((product) => product.sizes))].sort(bySizeOrder)
    const colors = new Map<string, ProductColor>()
    products.flatMap((product) => product.colors).forEach((color) => colors.set(color.name, color))
    return { categories, sizes, colors: [...colors.values()] }
  }, [products])

  const filteredProducts = useMemo(() => {
    const priceRange = priceRanges.find((range) => range.id === filters.priceRangeId)
    const result = products.filter(
      (product) =>
        (!filters.category || product.category === filters.category) &&
        (filters.sizes.length === 0 || hasAvailableSize(product, filters.sizes)) &&
        (filters.colors.length === 0 ||
          product.colors.some((color) => filters.colors.includes(color.name))) &&
        (!priceRange || (product.price >= priceRange.min && product.price < priceRange.max)),
    )
    return sortProducts(result, filters.sort)
  }, [products, filters])

  const activeFiltersCount =
    filters.sizes.length + filters.colors.length + (filters.priceRangeId ? 1 : 0)

  return {
    filters,
    options,
    filteredProducts,
    activeFiltersCount,
    setCategory: (category: string | null) => setFilters((prev) => ({ ...prev, category })),
    setSort: (sort: SortOption) => setFilters((prev) => ({ ...prev, sort })),
    toggleSize: (size: string) =>
      setFilters((prev) => ({ ...prev, sizes: toggleValue(prev.sizes, size) })),
    toggleColor: (color: string) =>
      setFilters((prev) => ({ ...prev, colors: toggleValue(prev.colors, color) })),
    togglePriceRange: (id: string) =>
      setFilters((prev) => ({ ...prev, priceRangeId: prev.priceRangeId === id ? null : id })),
    clearFilters: () =>
      setFilters((prev) => ({ ...prev, sizes: [], colors: [], priceRangeId: null })),
  }
}
