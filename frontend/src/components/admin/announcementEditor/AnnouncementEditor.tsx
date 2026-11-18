import AnnouncementBar from '@/components/announcementBar/AnnouncementBar'
import SelectField from '@/components/form/selectField/SelectField'
import Switch from '@/components/form/switch/Switch'
import TextField from '@/components/form/textField/TextField'
import { announcementStyleOptions } from '@/data/campaigns'
import { storeLinkOptions } from '@/data/storeLinks'
import type { Announcement, AnnouncementStyle, Ribbon } from '@/types/campaign'

interface AnnouncementEditorProps {
  announcement: Announcement
  previewRibbon: Ribbon | null
  onChange: (announcement: Announcement) => void
}

const linkOptions = [{ value: '', label: 'Sin link' }, ...storeLinkOptions]

function AnnouncementEditor({ announcement, previewRibbon, onChange }: AnnouncementEditorProps) {
  const setField = <K extends keyof Announcement>(key: K, value: Announcement[K]) =>
    onChange({ ...announcement, [key]: value })

  return (
    <div className="flex flex-col gap-5">
      <Switch
        label="Mostrar la cinta"
        description="Si la apagás, no se muestra nada arriba de la tienda."
        checked={announcement.isActive}
        onChange={(checked) => setField('isActive', checked)}
      />

      {announcement.isActive && (
        <>
          <TextField
            label="Mensaje general (opcional)"
            value={announcement.message}
            onChange={(event) => setField('message', event.target.value)}
            placeholder="Ej: Envío gratis en compras desde $80.000"
            hint="Se muestra junto con los anuncios de las campañas activas."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            <SelectField
              label="Color"
              options={announcementStyleOptions}
              value={announcement.style}
              onChange={(event) => setField('style', event.target.value as AnnouncementStyle)}
            />
            <SelectField
              label="Link del mensaje general"
              options={linkOptions}
              value={announcement.linkTo}
              onChange={(event) => setField('linkTo', event.target.value)}
              hint="Con campañas activas, lleva a Ofertas."
            />
            <div className="flex items-center sm:pt-7">
              <Switch
                label="Texto en movimiento"
                checked={announcement.animated}
                onChange={(checked) => setField('animated', checked)}
              />
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4">
        <p className="text-xs font-medium tracking-wider text-neutral-500 uppercase">Vista previa</p>
        {previewRibbon ? (
          <div className="overflow-hidden rounded-thumb">
            <AnnouncementBar ribbon={{ ...previewRibbon, linkTo: '' }} />
          </div>
        ) : (
          <p className="rounded-thumb bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
            La cinta no se va a mostrar: está apagada o no hay mensajes para anunciar.
          </p>
        )}
      </div>
    </div>
  )
}

export default AnnouncementEditor
