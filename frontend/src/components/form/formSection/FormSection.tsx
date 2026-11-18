import type { ReactNode } from 'react'
import FieldMessage from '@/components/form/fieldMessage/FieldMessage'
import { cn } from '@/utils/cn'

interface FormSectionProps {
  title: string
  description?: string
  error?: string
  actions?: ReactNode
  className?: string
  children: ReactNode
}

function FormSection({ title, description, error, actions, className, children }: FormSectionProps) {
  return (
    <section className={cn('rounded-card bg-white p-5 ring-1 ring-neutral-900/5 sm:p-6', className)}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
          {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
        </div>
        {actions}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
      {error && (
        <div className="mt-4">
          <FieldMessage error={error} />
        </div>
      )}
    </section>
  )
}

export default FormSection
