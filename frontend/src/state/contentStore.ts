import { benefits } from '@/data/benefits'
import { announcement, campaigns } from '@/data/campaigns'
import { categories } from '@/data/categories'
import { hero } from '@/data/hero'
import { products } from '@/data/products'
import { storeInfo } from '@/data/storeInfo'
import type { Announcement, Campaign } from '@/types/campaign'
import type { HomeContent, StoreContent } from '@/types/content'
import type { Product } from '@/types/product'
import type { StoreInfo } from '@/types/store'

const STORAGE_KEY = 'nexus-store-content'

const defaultContent: StoreContent = {
  products,
  categories,
  benefits,
  hero,
  storeInfo,
  campaigns,
  announcement,
}

function loadContent(): StoreContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent
  } catch {
    return defaultContent
  }
}

let content = loadContent()
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

function update(changes: Partial<StoreContent>) {
  content = { ...content, ...changes }
  let saved = true
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  } catch {
    saved = false
  }
  notify()
  return saved
}

export const contentStore = {
  getSnapshot: () => content,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

export function saveProduct(product: Product) {
  const exists = content.products.some((item) => item.id === product.id)
  return update({
    products: exists
      ? content.products.map((item) => (item.id === product.id ? product : item))
      : [product, ...content.products],
  })
}

export function deleteProduct(id: string) {
  return update({ products: content.products.filter((item) => item.id !== id) })
}

export function toggleProductFeatured(id: string) {
  return update({
    products: content.products.map((item) =>
      item.id === id ? { ...item, isFeatured: !item.isFeatured } : item,
    ),
  })
}

export function updateHomeContent(home: HomeContent) {
  return update(home)
}

export function updateStoreInfo(info: StoreInfo) {
  return update({ storeInfo: info })
}

export function saveCampaign(campaign: Campaign) {
  const exists = content.campaigns.some((item) => item.id === campaign.id)
  return update({
    campaigns: exists
      ? content.campaigns.map((item) => (item.id === campaign.id ? campaign : item))
      : [campaign, ...content.campaigns],
  })
}

export function deleteCampaign(id: string) {
  return update({ campaigns: content.campaigns.filter((item) => item.id !== id) })
}

export function toggleCampaignActive(id: string) {
  return update({
    campaigns: content.campaigns.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item,
    ),
  })
}

export function updateAnnouncement(value: Announcement) {
  return update({ announcement: value })
}

export function resetContent() {
  content = defaultContent
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    return false
  }
  notify()
  return true
}
