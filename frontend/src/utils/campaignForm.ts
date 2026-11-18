import type { Campaign } from '@/types/campaign'
import type { CampaignFormErrors, CampaignFormValues } from '@/types/campaignForm'
import { createId } from '@/utils/createId'

export function toCampaignFormValues(campaign?: Campaign): CampaignFormValues {
  return {
    name: campaign?.name ?? '',
    badgeLabel: campaign?.badgeLabel ?? '',
    discountPercent: campaign ? String(campaign.discountPercent) : '',
    scope: campaign?.scope ?? 'all',
    categories: campaign?.categories ?? [],
    productIds: campaign?.productIds ?? [],
    startsAt: campaign?.startsAt ?? '',
    endsAt: campaign?.endsAt ?? '',
    isActive: campaign?.isActive ?? true,
    showInRibbon: campaign?.showInRibbon ?? true,
    ribbonText: campaign?.ribbonText ?? '',
  }
}

export function toCampaign(values: CampaignFormValues, id?: string): Campaign {
  return {
    ...values,
    id: id ?? createId(),
    name: values.name.trim(),
    badgeLabel: values.badgeLabel.trim(),
    discountPercent: Math.round(Number(values.discountPercent)),
    categories: values.scope === 'categories' ? values.categories : [],
    productIds: values.scope === 'products' ? values.productIds : [],
    ribbonText: values.ribbonText.trim(),
  }
}

export function validateCampaignForm(values: CampaignFormValues) {
  const errors: CampaignFormErrors = {}
  const percent = Number(values.discountPercent)

  if (!values.name.trim()) errors.name = 'Poné un nombre a la campaña'
  if (!values.discountPercent || percent < 1 || percent > 90) {
    errors.discountPercent = 'Ingresá un descuento entre 1% y 90%'
  }
  if (values.scope === 'categories' && values.categories.length === 0) {
    errors.categories = 'Elegí al menos una categoría'
  }
  if (values.scope === 'products' && values.productIds.length === 0) {
    errors.productIds = 'Elegí al menos un producto'
  }
  if (values.startsAt && values.endsAt && values.endsAt < values.startsAt) {
    errors.endsAt = 'La fecha de fin tiene que ser posterior al inicio'
  }

  return errors
}
