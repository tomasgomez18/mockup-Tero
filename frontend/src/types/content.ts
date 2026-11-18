import type { Benefit } from '@/types/benefit'
import type { Announcement, Campaign } from '@/types/campaign'
import type { Category } from '@/types/category'
import type { HeroContent } from '@/types/home'
import type { Product } from '@/types/product'
import type { StoreInfo } from '@/types/store'

export interface StoreContent {
  products: Product[]
  categories: Category[]
  benefits: Benefit[]
  hero: HeroContent
  storeInfo: StoreInfo
  campaigns: Campaign[]
  announcement: Announcement
}

export type HomeContent = Pick<StoreContent, 'hero' | 'benefits' | 'categories'>
