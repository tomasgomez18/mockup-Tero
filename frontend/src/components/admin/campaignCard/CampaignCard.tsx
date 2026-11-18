import { Link } from 'react-router'
import { CalendarDays, Pencil, Trash2 } from 'lucide-react'
import CampaignStatusBadge from '@/components/admin/campaignStatusBadge/CampaignStatusBadge'
import Switch from '@/components/form/switch/Switch'
import IconButton from '@/components/iconButton/IconButton'
import type { Campaign, CampaignStatus } from '@/types/campaign'
import { getCampaignDateText, getCampaignScopeText } from '@/utils/campaign'

interface CampaignCardProps {
  campaign: Campaign
  status: CampaignStatus
  affectedCount: number
  onToggleActive: (id: string) => void
  onDelete: (campaign: Campaign) => void
}

function CampaignCard({ campaign, status, affectedCount, onToggleActive, onDelete }: CampaignCardProps) {
  return (
    <li className="flex flex-col gap-4 rounded-card bg-white p-5 ring-1 ring-neutral-900/5 sm:flex-row sm:items-center">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-thumb bg-red-600 text-lg font-bold text-white">
        -{campaign.discountPercent}%
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/admin/ofertas/${campaign.id}`}
            className="truncate font-semibold text-neutral-900 hover:underline"
          >
            {campaign.name}
          </Link>
          <CampaignStatusBadge status={status} />
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          {campaign.discountPercent}% OFF {getCampaignScopeText(campaign)} · {affectedCount}{' '}
          {affectedCount === 1 ? 'producto' : 'productos'}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
          <CalendarDays className="size-3.5" />
          {getCampaignDateText(campaign)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-3 sm:border-0 sm:pt-0">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Switch
            label={`Activar ${campaign.name}`}
            hideLabel
            checked={campaign.isActive}
            onChange={() => onToggleActive(campaign.id)}
          />
          <span className="sm:hidden">{campaign.isActive ? 'Encendida' : 'Pausada'}</span>
        </div>
        <div className="flex items-center">
          <Link
            to={`/admin/ofertas/${campaign.id}`}
            aria-label="Editar"
            title="Editar"
            className="inline-flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-900/5 hover:text-neutral-900"
          >
            <Pencil className="size-4" />
          </Link>
          <IconButton label="Eliminar" onClick={() => onDelete(campaign)} className="hover:text-red-600">
            <Trash2 className="size-4" />
          </IconButton>
        </div>
      </div>
    </li>
  )
}

export default CampaignCard
