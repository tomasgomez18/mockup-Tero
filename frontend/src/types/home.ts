import type { NavItem } from '@/types/navigation'

export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  image: string
  primaryAction: NavItem
  secondaryAction: NavItem
}
