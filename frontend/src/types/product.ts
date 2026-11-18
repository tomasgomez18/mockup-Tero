export interface ProductColor {
  name: string
  hex: string
}



export interface Product {
  id: string
  slug: string
  name: string
  category: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  colors: ProductColor[]
  sizes: string[]
  unavailableSizes?: string[]
  details: string[]
  isNew?: boolean
  isFeatured?: boolean
  campaignLabel?: string
}
