import { useMemo, useState, type FormEvent } from 'react'
import CampaignScopePicker from '@/components/admin/campaignForm/CampaignScopePicker'
import CampaignSummary from '@/components/admin/campaignForm/CampaignSummary'
import ChipPicker from '@/components/admin/chipPicker/ChipPicker'
import ProductPicker from '@/components/admin/productPicker/ProductPicker'
import Button from '@/components/button/Button'
import FieldMessage from '@/components/form/fieldMessage/FieldMessage'
import FormSection from '@/components/form/formSection/FormSection'
import Switch from '@/components/form/switch/Switch'
import TextField from '@/components/form/textField/TextField'
import { showToast } from '@/state/toastStore'
import type { AnnouncementStyle, Campaign } from '@/types/campaign'
import type { CampaignFormErrors, CampaignFormValues } from '@/types/campaignForm'
import type { Product } from '@/types/product'
import { campaignAppliesTo, getDefaultRibbonText } from '@/utils/campaign'
import { toCampaign, toCampaignFormValues, validateCampaignForm } from '@/utils/campaignForm'

interface CampaignFormProps {
  initialCampaign?: Campaign
  products: Product[]
  categories: string[]
  ribbonStyle: AnnouncementStyle
  onSubmit: (campaign: Campaign) => void
  onCancel: () => void
}

function CampaignForm({
  initialCampaign,
  products,
  categories,
  ribbonStyle,
  onSubmit,
  onCancel,
}: CampaignFormProps) {
  const [values, setValues] = useState<CampaignFormValues>(() => toCampaignFormValues(initialCampaign))
  const [errors, setErrors] = useState<CampaignFormErrors>({})

  const setField = <K extends keyof CampaignFormValues>(key: K, value: CampaignFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const previewCampaign = useMemo(() => toCampaign(values, initialCampaign?.id), [values, initialCampaign])
  const affectedProducts = useMemo(
    () => products.filter((product) => campaignAppliesTo(previewCampaign, product)),
    [products, previewCampaign],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validation = validateCampaignForm(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      showToast('Revisá los campos marcados en rojo', 'error')
      return
    }
    onSubmit(previewCampaign)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start"
    >
      <div className="flex flex-col gap-6">
        <FormSection title="Datos de la campaña">
          <TextField
            label="Nombre"
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
            placeholder="Ej: Hot Sale, Cyber Week, Día de la Madre"
            error={errors.name}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Descuento (%)"
              type="number"
              inputMode="numeric"
              min={1}
              max={90}
              value={values.discountPercent}
              onChange={(event) => setField('discountPercent', event.target.value)}
              placeholder="Ej: 20"
              error={errors.discountPercent}
            />
            <TextField
              label="Etiqueta en las tarjetas"
              value={values.badgeLabel}
              onChange={(event) => setField('badgeLabel', event.target.value)}
              placeholder={values.name || 'Ej: Hot Sale'}
              hint="Si la dejás vacía, se usa el nombre."
              maxLength={20}
            />
          </div>
        </FormSection>

        <FormSection title="¿A qué se aplica?">
          <CampaignScopePicker value={values.scope} onChange={(scope) => setField('scope', scope)} />
          {values.scope === 'categories' && (
            <div className="flex flex-col gap-2">
              <ChipPicker
                options={categories}
                selected={values.categories}
                onChange={(selected) => setField('categories', selected)}
              />
              <FieldMessage error={errors.categories} />
            </div>
          )}
          {values.scope === 'products' && (
            <div className="flex flex-col gap-2">
              <ProductPicker
                products={products}
                selectedIds={values.productIds}
                onChange={(ids) => setField('productIds', ids)}
              />
              <FieldMessage error={errors.productIds} />
            </div>
          )}
        </FormSection>

        <FormSection
          title="Vigencia"
          description="Opcional. Si no ponés fechas, dura hasta que la pauses."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Empieza el"
              type="date"
              value={values.startsAt}
              onChange={(event) => setField('startsAt', event.target.value)}
            />
            <TextField
              label="Termina el"
              type="date"
              value={values.endsAt}
              min={values.startsAt || undefined}
              onChange={(event) => setField('endsAt', event.target.value)}
              error={errors.endsAt}
            />
          </div>
          <Switch
            label="Campaña encendida"
            description="Apagala para pausarla sin borrarla."
            checked={values.isActive}
            onChange={(checked) => setField('isActive', checked)}
          />
        </FormSection>

        <FormSection title="Cinta de anuncios" description="La franja que aparece arriba de la tienda.">
          <Switch
            label="Anunciar en la cinta"
            checked={values.showInRibbon}
            onChange={(checked) => setField('showInRibbon', checked)}
          />
          {values.showInRibbon && (
            <TextField
              label="Texto de la cinta"
              value={values.ribbonText}
              onChange={(event) => setField('ribbonText', event.target.value)}
              placeholder={getDefaultRibbonText(previewCampaign)}
              hint="Si lo dejás vacío, se arma solo con el nombre, el descuento y la fecha."
            />
          )}
        </FormSection>
      </div>

      <div className="flex flex-col gap-6 lg:sticky lg:top-6">
        <CampaignSummary
          campaign={previewCampaign}
          affectedProducts={affectedProducts}
          ribbonStyle={ribbonStyle}
        />
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">
            {initialCampaign ? 'Guardar cambios' : 'Crear campaña'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CampaignForm
