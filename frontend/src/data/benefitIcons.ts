import { Clock, CreditCard, Gift, RefreshCw, ShieldCheck, Truck, type LucideIcon } from 'lucide-react'
import type { BenefitIconName } from '@/types/benefit'

export const benefitIcons: Record<BenefitIconName, { label: string; icon: LucideIcon }> = {
  truck: { label: 'Envío', icon: Truck },
  refresh: { label: 'Cambios', icon: RefreshCw },
  card: { label: 'Tarjeta', icon: CreditCard },
  shield: { label: 'Seguridad', icon: ShieldCheck },
  gift: { label: 'Regalo', icon: Gift },
  clock: { label: 'Reloj', icon: Clock },
}
