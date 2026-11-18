import { useId, type InputHTMLAttributes } from 'react'
import FieldMessage from '@/components/form/fieldMessage/FieldMessage'
import { cn } from '@/utils/cn'
import { fieldClass } from '@/utils/fieldStyles'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
  prefix?: string
  suggestions?: string[]
}

function TextField({
  label,
  hint,
  error,
  prefix,
  suggestions,
  className,
  id,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const listId = suggestions ? `${inputId}-suggestions` : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-neutral-900">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-neutral-500">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          list={listId}
          aria-invalid={Boolean(error)}
          className={cn(fieldClass, prefix && 'pl-7')}
          {...props}
        />
        {suggestions && (
          <datalist id={listId}>
            {suggestions.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
        )}
      </div>
      <FieldMessage error={error} hint={hint} />
    </div>
  )
}

export default TextField
