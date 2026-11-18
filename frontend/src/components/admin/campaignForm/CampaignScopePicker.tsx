import { campaignScopeOptions } from '@/data/campaigns'
import type { CampaignScope } from '@/types/campaign'
import { cn } from '@/utils/cn'

interface CampaignScopePickerProps {
  value: CampaignScope
  onChange: (scope: CampaignScope) => void
}

function CampaignScopePicker({ value, onChange }: CampaignScopePickerProps) {
  return (
    <div role="radiogroup" aria-label="A qué se aplica" className="grid gap-3 sm:grid-cols-3">
      {campaignScopeOptions.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex flex-col items-start gap-1 rounded-thumb border p-4 text-left transition-colors',
              isSelected
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-neutral-300 bg-white hover:border-brand-600',
            )}
          >
            <span className="text-sm font-semibold">{option.label}</span>
            <span className={cn('text-xs', isSelected ? 'text-neutral-300' : 'text-neutral-500')}>
              {option.description}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default CampaignScopePicker
