import type { Product } from '@/types/product'
import { normalizeText } from '@/utils/text'

function getSearchableText(product: Product) {
  return normalizeText(
    [product.name, product.category, product.description, ...product.colors.map((color) => color.name)].join(' '),
  )
}

export function searchProducts(products: Product[], query: string) {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  const matches = products.filter((product) => {
    const text = getSearchableText(product)
    return terms.every((term) => text.includes(term))
  })

  const nameScore = (product: Product) =>
    terms.filter((term) => normalizeText(product.name).includes(term)).length

  return matches.sort((a, b) => nameScore(b) - nameScore(a))
}
