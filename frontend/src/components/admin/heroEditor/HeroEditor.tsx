import SingleImageField from '@/components/admin/singleImageField/SingleImageField'
import SelectField from '@/components/form/selectField/SelectField'
import TextArea from '@/components/form/textArea/TextArea'
import TextField from '@/components/form/textField/TextField'
import { storeLinkOptions } from '@/data/storeLinks'
import type { HeroContent } from '@/types/home'
import type { NavItem } from '@/types/navigation'

interface HeroEditorProps {
  hero: HeroContent
  onChange: (hero: HeroContent) => void
}

function HeroEditor({ hero, onChange }: HeroEditorProps) {
  const setField = <K extends keyof HeroContent>(key: K, value: HeroContent[K]) =>
    onChange({ ...hero, [key]: value })

  const setAction = (key: 'primaryAction' | 'secondaryAction', changes: Partial<NavItem>) =>
    setField(key, { ...hero[key], ...changes })

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <SingleImageField
        label="Foto de fondo"
        value={hero.image}
        onChange={(image) => setField('image', image)}
        previewClassName="aspect-[16/9]"
        maxSize={1920}
      />
      <div className="flex flex-col gap-5">
        <TextField
          label="Texto chico (arriba del título)"
          value={hero.eyebrow}
          onChange={(event) => setField('eyebrow', event.target.value)}
          placeholder="Ej: Nueva colección"
        />
        <TextField
          label="Título"
          value={hero.title}
          onChange={(event) => setField('title', event.target.value)}
        />
        <TextArea
          label="Descripción"
          rows={2}
          value={hero.description}
          onChange={(event) => setField('description', event.target.value)}
        />
      </div>

      <div className="grid gap-4 rounded-thumb bg-neutral-50 p-4 sm:grid-cols-2">
        <TextField
          label="Botón principal"
          value={hero.primaryAction.label}
          onChange={(event) => setAction('primaryAction', { label: event.target.value })}
        />
        <SelectField
          label="Lleva a"
          options={storeLinkOptions}
          value={hero.primaryAction.to}
          onChange={(event) => setAction('primaryAction', { to: event.target.value })}
        />
      </div>
      <div className="grid gap-4 rounded-thumb bg-neutral-50 p-4 sm:grid-cols-2">
        <TextField
          label="Botón secundario"
          value={hero.secondaryAction.label}
          onChange={(event) => setAction('secondaryAction', { label: event.target.value })}
          hint="Dejalo vacío para ocultarlo."
        />
        <SelectField
          label="Lleva a"
          options={storeLinkOptions}
          value={hero.secondaryAction.to}
          onChange={(event) => setAction('secondaryAction', { to: event.target.value })}
        />
      </div>
    </div>
  )
}

export default HeroEditor
