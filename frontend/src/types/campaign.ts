export type CampaignScope = 'all' | 'categories' | 'products'

export type CampaignStatus = 'active' | 'scheduled' | 'ended' | 'paused'

export interface Campaign {
  id: string
  name: string
  badgeLabel: string
  discountPercent: number
  scope: CampaignScope
  categories: string[]
  productIds: string[]
  startsAt: string
  endsAt: string
  isActive: boolean
  showInRibbon: boolean
  ribbonText: string
}

export type AnnouncementStyle = 'dark' | 'red' | 'amber' | 'light'

export interface Announcement {
  isActive: boolean
  message: string
  style: AnnouncementStyle
  animated: boolean
  linkTo: string
}

export interface Ribbon {
  messages: string[]
  style: AnnouncementStyle
  animated: boolean
  linkTo: string
}
