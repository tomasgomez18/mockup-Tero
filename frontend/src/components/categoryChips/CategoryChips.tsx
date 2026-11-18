import { cn } from '@/utils/cn'

interface CategoryChipsProps {
  categories: string[]
  selected: string | null
  onSelect: (category: string | null) => void
  className?: string
}

function CategoryChips({ categories, selected, onSelect, className }: CategoryChipsProps) {
  const chips = [{ label: 'Todos', value: null }, ...categories.map((c) => ({ label: c, value: c }))]

  return (
    <div className={cn('no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0', className)}>
      <ul className="flex w-max gap-2">
        {chips.map((chip) => {
          const isSelected = chip.value === selected
          return (
            <li key={chip.label}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(chip.value)}
                className={cn(
                  'h-10 whitespace-nowrap rounded-full border px-5 text-sm font-medium transition-colors',
                  isSelected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-600 hover:text-neutral-900',
                )}
              >
                {chip.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryChips
