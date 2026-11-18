import { useId, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import FieldMessage from '@/components/form/fieldMessage/FieldMessage'
import type { SelectOption } from '@/types/navigation'
import { cn } from '@/utils/cn'
import { fieldClass } from '@/utils/fieldStyles'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  hint?: string
  error?: string
  hideLabel?: boolean
}

function SelectField({
  label,
  options,
  hint,
  error,
  hideLabel,
  className,
  id,
  ...props
}: SelectFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={fieldId}
        className={cn('text-sm font-medium text-neutral-900', hideLabel && 'sr-only')}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          aria-invalid={Boolean(error)}
          className={cn(fieldClass, 'cursor-pointer appearance-none pr-9')}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-neutral-500" />
      </div>
      <FieldMessage error={error} hint={hint} />
    </div>
  )
}

export default SelectField
