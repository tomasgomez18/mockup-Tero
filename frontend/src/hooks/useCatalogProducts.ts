import { useMemo } from 'react'
import { useStoreContent } from '@/hooks/useStoreContent'
import { useToday } from '@/hooks/useToday'
import { applyCampaigns } from '@/utils/campaign'

export function useCatalogProducts() {
  const { products, campaigns } = useStoreContent()
  const today = useToday()
  return useMemo(() => applyCampaigns(products, campaigns, today), [products, campaigns, today])
}
