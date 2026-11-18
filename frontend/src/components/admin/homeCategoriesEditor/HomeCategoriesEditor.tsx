import { Plus, Trash2 } from 'lucide-react'
import SingleImageField from '@/components/admin/singleImageField/SingleImageField'
import Button from '@/components/button/Button'
import SelectField from '@/components/form/selectField/SelectField'
import TextField from '@/components/form/textField/TextField'
import IconButton from '@/components/iconButton/IconButton'
import { storeLinkOptions } from '@/data/storeLinks'
import type { Category } from '@/types/category'
import { createId } from '@/utils/createId'

interface HomeCategoriesEditorProps {
  categories: Category[]
  onChange: (categories: Category[]) => void
  max?: number
}

function HomeCategoriesEditor({ categories, onChange, max = 3 }: HomeCategoriesEditorProps) {
  const updateCategory = (index: number, changes: Partial<Category>) =>
    onChange(categories.map((category, i) => (i === index ? { ...category, ...changes } : category)))

  return (
    <div className="flex flex-col gap-3">
      <ul className="grid gap-3 md:grid-cols-3">
        {categories.map((category, index) => (
          <li key={category.slug} className="flex flex-col gap-4 rounded-thumb bg-neutral-50 p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                Categoría {index + 1}
              </span>
              <IconButton
                label="Quitar categoría"
                onClick={() => onChange(categories.filter((_, i) => i !== index))}
                className="-mt-2 -mr-2 size-8 hover:text-red-600"
              >
                <Trash2 className="size-4" />
              </IconButton>
            </div>
            <SingleImageField
              label="Foto"
              value={category.image}
              onChange={(image) => updateCategory(index, { image })}
              previewClassName="aspect-square w-24"
              maxSize={400}
            />
            <TextField
              label="Nombre"
              value={category.name}
              onChange={(event) => updateCategory(index, { name: event.target.value })}
            />
            <TextField
              label="Descripción"
              value={category.description}
              onChange={(event) => updateCategory(index, { description: event.target.value })}
            />
            <SelectField
              label="Lleva a"
              options={storeLinkOptions}
              value={category.to}
              onChange={(event) => updateCategory(index, { to: event.target.value })}
            />
          </li>
        ))}
      </ul>
      {categories.length < max && (
        <Button
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            onChange([
              ...categories,
              { slug: createId(), name: '', description: '', to: '/novedades', image: '' },
            ])
          }
        >
          <Plus className="size-4" />
          Agregar categoría
        </Button>
      )}
    </div>
  )
}

export default HomeCategoriesEditor
