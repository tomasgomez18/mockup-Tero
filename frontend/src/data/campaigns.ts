import type { Announcement, AnnouncementStyle, Campaign, CampaignScope } from '@/types/campaign'
import type { SelectOption } from '@/types/navigation'

export const campaigns: Campaign[] = [
  {
    id: 'oferta-bazar',
    name: 'Ofertas de Bazar',
    badgeLabel: 'Oferta',
    discountPercent: 20,
    scope: 'categories',
    categories: ['Bazar'],
    productIds: [],
    startsAt: '',
    endsAt: '',
    isActive: true,
    showInRibbon: true,
    ribbonText: '',
  },
]

export const announcement: Announcement = {
  isActive: true,
  message: 'Precios mayoristas por cantidad · Retirá en el local',
  style: 'red',
  animated: true,
  linkTo: '',
}

export const campaignScopeOptions: { value: CampaignScope; label: string; description: string }[] = [
  { value: 'all', label: 'Toda la tienda', description: 'Se aplica a todos los productos' },
  { value: 'categories', label: 'Categorías', description: 'Solo a las categorías que elijas' },
  { value: 'products', label: 'Productos', description: 'Solo a los productos que elijas' },
]

export const announcementStyleOptions: (SelectOption & { value: AnnouncementStyle })[] = [
  { value: 'dark', label: 'Negro' },
  { value: 'red', label: 'Rojo' },
  { value: 'amber', label: 'Amarillo' },
  { value: 'light', label: 'Claro' },
]
