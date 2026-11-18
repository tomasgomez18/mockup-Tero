import { useState } from 'react'
import { getTodayKey } from '@/utils/date'

export function useToday() {
  const [today] = useState(() => getTodayKey())
  return today
}
