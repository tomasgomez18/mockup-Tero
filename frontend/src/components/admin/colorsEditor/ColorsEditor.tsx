import { Plus, Trash2 } from 'lucide-react'
import Button from '@/components/button/Button'
import IconButton from '@/components/iconButton/IconButton'
import type { ProductColor } from '@/types/product'
import { cn } from '@/utils/cn'
import { fieldClass } from '@/utils/fieldStyles'

interface ColorsEditorProps {
  colors: ProductColor[]
  onChange: (colors: ProductColor[]) => void
}

function ColorsEditor({ colors, onChange }: ColorsEditorProps) {
  const updateColor = (index: number, changes: Partial<ProductColor>) =>
    onChange(colors.map((color, i) => (i === index ? { ...color, ...changes } : color)))

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {colors.map((color, index) => (
          <li key={index} className="flex items-center gap-2">
            <input
              type="color"
              value={color.hex}
              onChange={(event) => updateColor(index, { hex: event.target.value })}
              aria-label={`Tono del color ${index + 1}`}
              className="h-11 w-12 shrink-0 cursor-pointer rounded-thumb border border-neutral-300 bg-white p-1"
            />
            <input
              value={color.name}
              onChange={(event) => updateColor(index, { name: event.target.value })}
              placeholder="Nombre del color, ej: Azul marino"
              aria-label={`Nombre del color ${index + 1}`}
              className={cn(fieldClass)}
            />
            <IconButton
              label="Quitar color"
              onClick={() => onChange(colors.filter((_, i) => i !== index))}
              className="shrink-0 hover:text-red-600"
            >
              <Trash2 className="size-4" />
            </IconButton>
          </li>
        ))}
      </ul>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange([...colors, { name: '', hex: '#a3a3a3' }])}
        className="w-fit"
      >
        <Plus className="size-4" />
        Agregar color
      </Button>
    </div>
  )
}

export default ColorsEditor
