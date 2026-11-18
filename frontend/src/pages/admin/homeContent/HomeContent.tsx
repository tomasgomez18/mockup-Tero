import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import AdminPageHeader from '@/components/admin/adminPageHeader/AdminPageHeader'
import BenefitsEditor from '@/components/admin/benefitsEditor/BenefitsEditor'
import HeroEditor from '@/components/admin/heroEditor/HeroEditor'
import HomeCategoriesEditor from '@/components/admin/homeCategoriesEditor/HomeCategoriesEditor'
import Button from '@/components/button/Button'
import FormSection from '@/components/form/formSection/FormSection'
import { useStoreContent } from '@/hooks/useStoreContent'
import { updateHomeContent } from '@/state/contentStore'
import { showToast } from '@/state/toastStore'
import type { HomeContent as HomeContentValues } from '@/types/content'

function HomeContent() {
  const { hero, benefits, categories } = useStoreContent()
  const [draft, setDraft] = useState<HomeContentValues>({ hero, benefits, categories })

  const setSection = <K extends keyof HomeContentValues>(key: K, value: HomeContentValues[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }))

  const handleSave = () => {
    if (!draft.hero.title.trim()) {
      showToast('El título del banner no puede quedar vacío', 'error')
      return
    }
    const saved = updateHomeContent({
      ...draft,
      benefits: draft.benefits.filter((benefit) => benefit.title.trim()),
      categories: draft.categories.filter((category) => category.name.trim()),
    })
    showToast(
      saved ? 'Inicio actualizado' : 'No se pudo guardar. Probá con fotos más livianas.',
      saved ? 'success' : 'error',
    )
  }

  const actions = (
    <>
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center gap-2 px-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
      >
        <ExternalLink className="size-4" />
        Ver inicio
      </a>
      <Button onClick={handleSave}>Guardar cambios</Button>
    </>
  )

  return (
    <>
      <AdminPageHeader
        title="Inicio de la tienda"
        description="Lo primero que ven tus clientes al entrar."
        actions={actions}
      />

      <div className="flex flex-col gap-6">
        <FormSection title="Banner principal" description="La foto grande con el título y los botones.">
          <HeroEditor hero={draft.hero} onChange={(value) => setSection('hero', value)} />
        </FormSection>

        <FormSection
          title="Beneficios"
          description="Las tarjetas debajo del banner. Hasta 4. Las que no tengan título no se muestran."
        >
          <BenefitsEditor benefits={draft.benefits} onChange={(value) => setSection('benefits', value)} />
        </FormSection>

        <FormSection title="Categorías" description="Los accesos rápidos del inicio. Hasta 3.">
          <HomeCategoriesEditor
            categories={draft.categories}
            onChange={(value) => setSection('categories', value)}
          />
        </FormSection>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Guardar cambios
          </Button>
        </div>
      </div>
    </>
  )
}

export default HomeContent
