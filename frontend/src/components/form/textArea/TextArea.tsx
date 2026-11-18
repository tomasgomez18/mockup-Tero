import { useId, type TextareaHTMLAttributes } from 'react'
import FieldMessage from '@/components/form/fieldMessage/FieldMessage'
import { cn } from '@/utils/cn'
import { fieldClass } from '@/utils/fieldStyles'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
  error?: string
}

function TextArea({ label, hint, error, className, id, rows = 4, ...props }: TextAreaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-neutral-900">
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={cn(fieldClass, 'h-auto resize-y py-2.5 leading-relaxed')}
        {...props}
      />
      <FieldMessage error={error} hint={hint} />
    </div>
  )
}

export default TextArea
