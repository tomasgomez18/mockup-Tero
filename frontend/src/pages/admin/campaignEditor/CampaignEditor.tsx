import { useNavigate, useParams } from 'react-router'
import { Megaphone } from 'lucide-react'
import AdminPageHeader from '@/components/admin/adminPageHeader/AdminPageHeader'
import CampaignForm from '@/components/admin/campaignForm/CampaignForm'
import BackLink from '@/components/backLink/BackLink'
import ButtonLink from '@/components/buttonLink/ButtonLink'
import EmptyState from '@/components/emptyState/EmptyState'
import { useStoreContent } from '@/hooks/useStoreContent'
import { getProductCategories } from '@/services/productService'
import { saveCampaign } from '@/state/contentStore'
import { showToast } from '@/state/toastStore'
import type { Campaign } from '@/types/campaign'

function CampaignEditor() {
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const { campaigns, products, announcement } = useStoreContent()
  const campaign = campaignId ? campaigns.find((item) => item.id === campaignId) : undefined
  const isNew = !campaignId

  if (campaignId && !campaign) {
    return (
      <EmptyState
        icon={Megaphone}
        title="No encontramos esta campaña"
        description="Puede que la hayan eliminado."
        className="bg-white"
        action={<ButtonLink to="/admin/ofertas">Volver a ofertas</ButtonLink>}
      />
    )
  }

  const handleSubmit = (values: Campaign) => {
    if (!saveCampaign(values)) {
      showToast('No se pudo guardar la campaña', 'error')
      return
    }
    showToast(isNew ? `Se creó "${values.name}"` : 'Campaña actualizada')
    navigate('/admin/ofertas')
  }

  return (
    <>
      <BackLink to="/admin/ofertas" label="Volver a ofertas" className="mb-6" />
      <AdminPageHeader
        title={isNew ? 'Nueva campaña' : campaign?.name ?? 'Editar campaña'}
        description="El descuento se aplica solo en la tienda mientras la campaña esté activa."
      />
      <CampaignForm
        key={campaign?.id ?? 'new'}
        initialCampaign={campaign}
        products={products}
        categories={getProductCategories(products)}
        ribbonStyle={announcement.style}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/ofertas')}
      />
    </>
  )
}

export default CampaignEditor
