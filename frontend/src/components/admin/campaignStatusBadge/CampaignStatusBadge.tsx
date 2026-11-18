import type { CampaignStatus } from '@/types/campaign'
import { cn } from '@/utils/cn'

interface CampaignStatusBadgeProps {
  status: CampaignStatus
}

const statusConfig: Record<CampaignStatus, { label: string; className: string; dot: string }> = {
  active: { label: 'Activa', className: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  scheduled: { label: 'Programada', className: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500' },
  ended: { label: 'Finalizada', className: 'bg-neutral-100 text-neutral-600', dot: 'bg-neutral-400' },
  paused: { label: 'Pausada', className: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
}

function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const { label, className, dot } = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', dot)} />
      {label}
    </span>
  )
}

export default CampaignStatusBadge
