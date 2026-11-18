import AnnouncementBar from '@/components/announcementBar/AnnouncementBar'
import Badge from '@/components/badge/Badge'
import type { AnnouncementStyle, Campaign } from '@/types/campaign'
import type { Product } from '@/types/product'
import { getDefaultRibbonText } from '@/utils/campaign'
import { formatPrice } from '@/utils/price'

interface CampaignSummaryProps {
  campaign: Campaign
  affectedProducts: Product[]
  ribbonStyle: AnnouncementStyle
}

function CampaignSummary({ campaign, affectedProducts, ribbonStyle }: CampaignSummaryProps) {
  const example = affectedProducts[0]
  const originalPrice = example ? (example.compareAtPrice ?? example.price) : 0
  const discountedPrice = Math.round(originalPrice * (1 - campaign.discountPercent / 100))
  const hasPercent = campaign.discountPercent > 0 && campaign.discountPercent < 100

  return (
    <section className="flex flex-col gap-5 rounded-card bg-white p-5 ring-1 ring-neutral-900/5 sm:p-6">
      <h2 className="text-base font-semibold">Resumen</h2>

      <div>
        <p className="text-3xl font-semibold tracking-tight">{affectedProducts.length}</p>
        <p className="text-sm text-neutral-500">
          {affectedProducts.length === 1 ? 'producto con descuento' : 'productos con descuento'}
        </p>
      </div>

      {example && hasPercent && (
        <div className="flex items-center gap-3 border-t border-neutral-100 pt-4">
          <img src={example.images[0]} alt="" className="aspect-[3/4] w-14 shrink-0 rounded-thumb object-cover" />
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap gap-1.5">
              {(campaign.badgeLabel || campaign.name) && (
                <Badge>{campaign.badgeLabel || campaign.name}</Badge>
              )}
              <Badge variant="sale">-{campaign.discountPercent}%</Badge>
            </div>
            <p className="truncate text-sm font-medium">{example.name}</p>
            <p className="flex items-baseline gap-2 text-sm">
              <span className="text-xs text-neutral-400 line-through">{formatPrice(originalPrice)}</span>
              <span className="font-semibold text-red-600">{formatPrice(discountedPrice)}</span>
            </p>
          </div>
        </div>
      )}

      {campaign.showInRibbon && campaign.name && hasPercent && (
        <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4">
          <p className="text-xs font-medium tracking-wider text-neutral-500 uppercase">En la cinta</p>
          <div className="overflow-hidden rounded-thumb">
            <AnnouncementBar
              ribbon={{
                messages: [campaign.ribbonText || getDefaultRibbonText(campaign)],
                style: ribbonStyle,
                animated: false,
                linkTo: '',
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default CampaignSummary
