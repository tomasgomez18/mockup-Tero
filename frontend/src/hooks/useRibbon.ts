import { useMemo } from 'react'
import { useStoreContent } from '@/hooks/useStoreContent'
import { useToday } from '@/hooks/useToday'
import { getRibbon } from '@/utils/campaign'

export function useRibbon() {
  const { campaigns, announcement } = useStoreContent()
  const today = useToday()
  return useMemo(() => getRibbon(campaigns, announcement, today), [campaigns, announcement, today])
}
