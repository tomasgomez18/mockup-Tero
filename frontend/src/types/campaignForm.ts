import type { Campaign } from '@/types/campaign'

export interface CampaignFormValues extends Omit<Campaign, 'id' | 'discountPercent'> {
  discountPercent: string
}

export type CampaignFormErrors = Partial<Record<keyof CampaignFormValues, string>>
