import { useMemo, useState } from 'react'
import { Megaphone, Plus, Tag } from 'lucide-react'
import AdminPageHeader from '@/components/admin/adminPageHeader/AdminPageHeader'
import AnnouncementEditor from '@/components/admin/announcementEditor/AnnouncementEditor'
import CampaignCard from '@/components/admin/campaignCard/CampaignCard'
import ProductOfferList from '@/components/admin/productOfferList/ProductOfferList'
import Button from '@/components/button/Button'
import ButtonLink from '@/components/buttonLink/ButtonLink'
import ConfirmDialog from '@/components/confirmDialog/ConfirmDialog'
import EmptyState from '@/components/emptyState/EmptyState'
import FormSection from '@/components/form/formSection/FormSection'
import { useStoreContent } from '@/hooks/useStoreContent'
import { useToday } from '@/hooks/useToday'
import { deleteCampaign, toggleCampaignActive, updateAnnouncement } from '@/state/contentStore'
import { showToast } from '@/state/toastStore'
import type { Announcement, Campaign } from '@/types/campaign'
import { campaignAppliesTo, getCampaignStatus, getRibbon } from '@/utils/campaign'

function Offers() {
  const { campaigns, announcement, products } = useStoreContent()
  const today = useToday()
  const [announcementDraft, setAnnouncementDraft] = useState<Announcement>(announcement)
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null)

  const previewRibbon = useMemo(
    () => getRibbon(campaigns, announcementDraft, today),
    [campaigns, announcementDraft, today],
  )
  const productsOnSale = useMemo(() => products.filter((product) => product.compareAtPrice), [products])

  const handleSaveAnnouncement = () => {
    const saved = updateAnnouncement({ ...announcementDraft, message: announcementDraft.message.trim() })
    showToast(saved ? 'Cinta actualizada' : 'No se pudo guardar', saved ? 'success' : 'error')
  }

  const handleConfirmDelete = () => {
    if (!campaignToDelete) return
    deleteCampaign(campaignToDelete.id)
    showToast(`Se eliminó "${campaignToDelete.name}"`)
    setCampaignToDelete(null)
  }

  return (
    <>
      <AdminPageHeader
        title="Ofertas"
        description="Campañas de descuento, la cinta de anuncios y los productos en oferta."
        actions={
          <ButtonLink to="/admin/ofertas/nueva">
            <Plus className="size-4" />
            Nueva campaña
          </ButtonLink>
        }
      />

      <div className="flex flex-col gap-6">
        <section>
          <h2 className="mb-3 text-base font-semibold">Campañas de descuento</h2>
          {campaigns.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  status={getCampaignStatus(campaign, today)}
                  affectedCount={products.filter((product) => campaignAppliesTo(campaign, product)).length}
                  onToggleActive={toggleCampaignActive}
                  onDelete={setCampaignToDelete}
                />
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={Megaphone}
              title="Todavía no hay campañas"
              description="Creá una para aplicar un descuento a toda la tienda, a categorías o a productos elegidos."
              className="bg-white"
              action={
                <ButtonLink to="/admin/ofertas/nueva">
                  <Plus className="size-4" />
                  Nueva campaña
                </ButtonLink>
              }
            />
          )}
        </section>

        <FormSection
          title="Cinta de anuncios"
          description="La franja que aparece arriba de toda la tienda."
          actions={
            <Button size="sm" onClick={handleSaveAnnouncement}>
              Guardar
            </Button>
          }
        >
          <AnnouncementEditor
            announcement={announcementDraft}
            previewRibbon={previewRibbon}
            onChange={setAnnouncementDraft}
          />
        </FormSection>

        <FormSection
          title="Productos con oferta propia"
          description="Para poner un producto en oferta, editalo y activá «En oferta» en la sección Precio."
        >
          {productsOnSale.length > 0 ? (
            <ProductOfferList products={productsOnSale} />
          ) : (
            <div className="flex flex-col items-start gap-3 text-sm text-neutral-500">
              <p className="flex items-center gap-2">
                <Tag className="size-4" />
                No hay productos con oferta propia.
              </p>
              <ButtonLink to="/admin/productos" variant="outline" size="sm">
                Ir a productos
              </ButtonLink>
            </div>
          )}
        </FormSection>
      </div>

      <ConfirmDialog
        open={Boolean(campaignToDelete)}
        title="¿Eliminar campaña?"
        description={`"${campaignToDelete?.name ?? ''}" se va a borrar y los precios vuelven a la normalidad.`}
        confirmLabel="Eliminar"
        tone="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setCampaignToDelete(null)}
      />
    </>
  )
}

export default Offers
