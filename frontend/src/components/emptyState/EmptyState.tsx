import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-card border border-dashed border-neutral-300 px-6 py-16 text-center',
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
        <Icon className="size-6" />
      </span>
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      {description && <p className="max-w-sm text-sm text-neutral-500">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export default EmptyState
