import { Plus, Trash2 } from 'lucide-react'
import Button from '@/components/button/Button'
import IconButton from '@/components/iconButton/IconButton'
import { fieldClass } from '@/utils/fieldStyles'

interface ListEditorProps {
  items: string[]
  onChange: (items: string[]) => void
  addLabel: string
  placeholder?: string
}

function ListEditor({ items, onChange, addLabel, placeholder }: ListEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.length > 0 && (
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <input
                value={item}
                onChange={(event) =>
                  onChange(items.map((current, i) => (i === index ? event.target.value : current)))
                }
                placeholder={placeholder}
                aria-label={`${addLabel} ${index + 1}`}
                className={fieldClass}
              />
              <IconButton
                label="Quitar"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="shrink-0 hover:text-red-600"
              >
                <Trash2 className="size-4" />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
      <Button variant="outline" size="sm" onClick={() => onChange([...items, ''])} className="w-fit">
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  )
}

export default ListEditor
