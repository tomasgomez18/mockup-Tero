import type { Announcement, Campaign, CampaignStatus, Ribbon } from '@/types/campaign'
import type { Product } from '@/types/product'
import { formatShortDate } from '@/utils/date'

export function getCampaignStatus(campaign: Campaign, today: string): CampaignStatus {
  if (!campaign.isActive) return 'paused'
  if (campaign.startsAt && today < campaign.startsAt) return 'scheduled'
  if (campaign.endsAt && today > campaign.endsAt) return 'ended'
  return 'active'
}

export function campaignAppliesTo(campaign: Campaign, product: Product) {
  if (campaign.scope === 'all') return true
  if (campaign.scope === 'categories') return campaign.categories.includes(product.category)
  return campaign.productIds.includes(product.id)
}

export function getCampaignScopeText(campaign: Campaign) {
  if (campaign.scope === 'all') return 'en toda la tienda'
  if (campaign.scope === 'categories') return `en ${campaign.categories.join(', ')}`
  return 'en productos seleccionados'
}

export function getCampaignDateText(campaign: Campaign) {
  if (campaign.startsAt && campaign.endsAt) {
    return `Del ${formatShortDate(campaign.startsAt)} al ${formatShortDate(campaign.endsAt)}`
  }
  if (campaign.endsAt) return `Hasta el ${formatShortDate(campaign.endsAt)}`
  if (campaign.startsAt) return `Desde el ${formatShortDate(campaign.startsAt)}`
  return 'Sin fecha de fin'
}

export function getDefaultRibbonText(campaign: Campaign) {
  const ending = campaign.endsAt ? ` · Hasta el ${formatShortDate(campaign.endsAt)}` : ''
  return `${campaign.name}: ${campaign.discountPercent}% OFF ${getCampaignScopeText(campaign)}${ending}`
}

export function getActiveCampaigns(campaigns: Campaign[], today: string) {
  return campaigns.filter((campaign) => getCampaignStatus(campaign, today) === 'active')
}

export function applyCampaigns(products: Product[], campaigns: Campaign[], today: string): Product[] {
  const active = getActiveCampaigns(campaigns, today)
  if (active.length === 0) return products

  return products.map((product) => {
    const best = active
      .filter((campaign) => campaignAppliesTo(campaign, product))
      .sort((a, b) => b.discountPercent - a.discountPercent)[0]
    if (!best) return product

    const originalPrice = product.compareAtPrice ?? product.price
    const campaignPrice = Math.round(originalPrice * (1 - best.discountPercent / 100))
    if (campaignPrice >= product.price) return product

    return {
      ...product,
      price: campaignPrice,
      compareAtPrice: originalPrice,
      campaignLabel: best.badgeLabel || best.name,
    }
  })
}

export function getRibbon(campaigns: Campaign[], announcement: Announcement, today: string): Ribbon | null {
  if (!announcement.isActive) return null

  const campaignMessages = getActiveCampaigns(campaigns, today)
    .filter((campaign) => campaign.showInRibbon)
    .map((campaign) => campaign.ribbonText.trim() || getDefaultRibbonText(campaign))
  const generalMessage = announcement.message.trim()
  const messages = generalMessage ? [...campaignMessages, generalMessage] : campaignMessages

  if (messages.length === 0) return null

  return {
    messages,
    style: announcement.style,
    animated: announcement.animated,
    linkTo: campaignMessages.length > 0 ? '/ofertas' : announcement.linkTo,
  }
}
