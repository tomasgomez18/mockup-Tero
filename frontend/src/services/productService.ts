import { collections } from '@/data/collections'
import type { Collection } from '@/types/collection'
import type { Product } from '@/types/product'

export function getFeaturedProducts(products: Product[]) {
  return products.filter((product) => product.isFeatured)
}

export function findProductBySlug(products: Product[], slug?: string) {
  return products.find((product) => product.slug === slug)
}

export function findProductById(products: Product[], id?: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(products: Product[], product: Product, limit = 8) {
  const others = products.filter((item) => item.id !== product.id)
  const sameCategory = others.filter((item) => item.category === product.category)
  const rest = others.filter((item) => item.category !== product.category)
  return [...sameCategory, ...rest].slice(0, limit)
}

export function getProductCategories(products: Product[]) {
  return [...new Set(products.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b, 'es'),
  )
}

export function getCollectionBySlug(slug?: string) {
  return collections.find((collection) => collection.slug === slug)
}

export function getProductsByCollection(products: Product[], collection: Collection) {
  return products.filter(collection.includes)
}
