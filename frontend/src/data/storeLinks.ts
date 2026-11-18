import { collections } from '@/data/collections'
import type { SelectOption } from '@/types/navigation'

export const storeLinkOptions: SelectOption[] = [
  { value: '/', label: 'Inicio' },
  ...collections.map((collection) => ({ value: `/${collection.slug}`, label: collection.title })),
]
