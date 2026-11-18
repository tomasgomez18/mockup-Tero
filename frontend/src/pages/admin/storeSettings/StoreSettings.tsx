import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import AdminPageHeader from '@/components/admin/adminPageHeader/AdminPageHeader'
import ListEditor from '@/components/admin/listEditor/ListEditor'
import Button from '@/components/button/Button'
import ConfirmDialog from '@/components/confirmDialog/ConfirmDialog'
import FormSection from '@/components/form/formSection/FormSection'
import TextArea from '@/components/form/textArea/TextArea'
import TextField from '@/components/form/textField/TextField'
import { useStoreContent } from '@/hooks/useStoreContent'
import { resetContent, updateStoreInfo } from '@/state/contentStore'
import { showToast } from '@/state/toastStore'
import type { StoreInfo } from '@/types/store'

function StoreSettings() {
  const { storeInfo } = useStoreContent()
  const [draft, setDraft] = useState<StoreInfo>(storeInfo)
  const [nameError, setNameError] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)

  const setField = <K extends keyof StoreInfo>(key: K, value: StoreInfo[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }))

  const handleSave = () => {
    if (!draft.name.trim()) {
      setNameError('La tienda necesita un nombre')
      return
    }
    updateStoreInfo({
      ...draft,
      name: draft.name.trim(),
      whatsappNumber: draft.whatsappNumber.replace(/\D/g, ''),
      paymentMethods: draft.paymentMethods.map((method) => method.trim()).filter(Boolean),
    })
    showToast('Datos de la tienda guardados')
  }

  const handleReset = () => {
    resetContent()
    window.location.reload()
  }

  return (
    <>
      <AdminPageHeader
        title="Datos de la tienda"
        description="Nombre, contacto y redes que aparecen en el footer y en los botones de WhatsApp."
        actions={<Button onClick={handleSave}>Guardar cambios</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <FormSection title="Marca">
          <TextField
            label="Nombre de la tienda"
            value={draft.name}
            onChange={(event) => {
              setField('name', event.target.value)
              setNameError('')
            }}
            hint="Se usa como logo en el navbar, el footer y la pantalla de carga."
            error={nameError}
          />
          <TextArea
            label="Descripción corta"
            rows={3}
            value={draft.description}
            onChange={(event) => setField('description', event.target.value)}
            hint="Aparece en el footer."
          />
        </FormSection>

        <FormSection title="Contacto">
          <TextField
            label="WhatsApp"
            inputMode="tel"
            value={draft.whatsappNumber}
            onChange={(event) => setField('whatsappNumber', event.target.value)}
            hint="Con código de país y sin espacios. Ej: 5491123456789"
          />
          <TextField
            label="Teléfono visible"
            value={draft.phone}
            onChange={(event) => setField('phone', event.target.value)}
            placeholder="+54 9 11 2345-6789"
          />
          <TextField
            label="Email"
            type="email"
            value={draft.email}
            onChange={(event) => setField('email', event.target.value)}
          />
          <TextField
            label="Dirección o zona"
            value={draft.address}
            onChange={(event) => setField('address', event.target.value)}
          />
        </FormSection>

        <FormSection title="Redes">
          <TextField
            label="Instagram"
            type="url"
            value={draft.instagramUrl}
            onChange={(event) => setField('instagramUrl', event.target.value)}
            placeholder="https://instagram.com/tutienda"
          />
        </FormSection>

        <FormSection title="Medios de pago" description="Se muestran al pie de la página.">
          <ListEditor
            items={draft.paymentMethods}
            onChange={(items) => setField('paymentMethods', items)}
            addLabel="Agregar medio de pago"
            placeholder="Ej: Mercado Pago"
          />
        </FormSection>
      </div>

      <section className="mt-10 flex flex-col gap-4 rounded-card border border-red-200 bg-red-50/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="font-semibold text-red-800">Restaurar datos de demostración</h2>
          <p className="mt-1 text-sm text-red-700/80">
            Borra todos los cambios hechos desde el panel y vuelve a los productos y textos de ejemplo.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setConfirmReset(true)}
          className="shrink-0 border-red-300 text-red-700 hover:border-red-600"
        >
          <RotateCcw className="size-4" />
          Restaurar
        </Button>
      </section>

      <ConfirmDialog
        open={confirmReset}
        title="¿Restaurar los datos de demostración?"
        description="Se van a perder todos los productos, fotos y textos que cargaste desde el panel."
        confirmLabel="Sí, restaurar"
        tone="danger"
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </>
  )
}

export default StoreSettings
