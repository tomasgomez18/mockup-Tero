import { ChevronDown } from 'lucide-react'
import type { SortOption, SortOptionItem } from '@/types/filters'

interface SortSelectProps {
  value: SortOption
  options: SortOptionItem[]
  onChange: (value: SortOption) => void
}

function SortSelect({ value, options, onChange }: SortSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="hidden text-neutral-500 sm:inline">Ordenar por</span>
      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as SortOption)}
          aria-label="Ordenar por"
          className="h-10 cursor-pointer appearance-none rounded-full border border-neutral-300 bg-white pr-9 pl-4 text-sm font-medium text-neutral-900 transition-colors hover:border-brand-600 focus:border-brand-600 focus:outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-neutral-500" />
      </span>
    </label>
  )
}

export default SortSelect
