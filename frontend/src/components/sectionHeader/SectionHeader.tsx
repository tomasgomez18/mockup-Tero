import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  linkTo?: string
  linkLabel?: string
  actions?: ReactNode
}

function SectionHeader({
  title,
  subtitle,
  linkTo,
  linkLabel = 'Ver todo',
  actions,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-500 sm:text-base">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-4">
        {linkTo && (
          <Link
            to={linkTo}
            className="group inline-flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-neutral-900"
          >
            {linkLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
        {actions}
      </div>
    </div>
  )
}

export default SectionHeader
