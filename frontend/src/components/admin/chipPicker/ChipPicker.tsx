import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ChipPickerProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

function ChipPicker({ options, selected, onChange }: ChipPickerProps) {
  const toggle = (option: string) =>
    onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option])

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isSelected}
            onClick={() => toggle(option)}
            className={cn(
              'inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors',
              isSelected
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-600',
            )}
          >
            {isSelected && <Check className="size-3.5" />}
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default ChipPicker
