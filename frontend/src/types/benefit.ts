export type BenefitIconName = 'truck' | 'refresh' | 'card' | 'shield' | 'gift' | 'clock'

export interface Benefit {
  icon: BenefitIconName
  title: string
  description: string
}
