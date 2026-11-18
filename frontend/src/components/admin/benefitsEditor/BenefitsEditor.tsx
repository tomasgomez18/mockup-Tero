import { Plus, Trash2 } from 'lucide-react'
import Button from '@/components/button/Button'
import SelectField from '@/components/form/selectField/SelectField'
import TextField from '@/components/form/textField/TextField'
import IconButton from '@/components/iconButton/IconButton'
import { benefitIcons } from '@/data/benefitIcons'
import type { Benefit, BenefitIconName } from '@/types/benefit'

interface BenefitsEditorProps {
  benefits: Benefit[]
  onChange: (benefits: Benefit[]) => void
  max?: number
}

const iconOptions = Object.entries(benefitIcons).map(([value, { label }]) => ({ value, label }))

function BenefitsEditor({ benefits, onChange, max = 4 }: BenefitsEditorProps) {
  const updateBenefit = (index: number, changes: Partial<Benefit>) =>
    onChange(benefits.map((benefit, i) => (i === index ? { ...benefit, ...changes } : benefit)))

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-3">
        {benefits.map((benefit, index) => {
          const Icon = benefitIcons[benefit.icon].icon
          return (
            <li
              key={index}
              className="grid gap-3 rounded-thumb bg-neutral-50 p-4 sm:grid-cols-[auto_150px_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end"
            >
              <span className="hidden size-11 items-center justify-center rounded-thumb bg-brand-600 text-white sm:flex">
                <Icon className="size-5" />
              </span>
              <SelectField
                label="Ícono"
                options={iconOptions}
                value={benefit.icon}
                onChange={(event) => updateBenefit(index, { icon: event.target.value as BenefitIconName })}
              />
              <TextField
                label="Título"
                value={benefit.title}
                onChange={(event) => updateBenefit(index, { title: event.target.value })}
              />
              <TextField
                label="Detalle"
                value={benefit.description}
                onChange={(event) => updateBenefit(index, { description: event.target.value })}
              />
              <IconButton
                label="Quitar beneficio"
                onClick={() => onChange(benefits.filter((_, i) => i !== index))}
                className="justify-self-end hover:text-red-600"
              >
                <Trash2 className="size-4" />
              </IconButton>
            </li>
          )
        })}
      </ul>
      {benefits.length < max && (
        <Button
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => onChange([...benefits, { icon: 'truck', title: '', description: '' }])}
        >
          <Plus className="size-4" />
          Agregar beneficio
        </Button>
      )}
    </div>
  )
}

export default BenefitsEditor
