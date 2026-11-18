import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/utils/cn'

interface BackLinkProps {
  to: string
  label: string
  className?: string
}

function BackLink({ to, label, className }: BackLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex h-10 w-fit items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 transition-colors hover:border-brand-600',
        className,
      )}
    >
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
      {label}
    </Link>
  )
}

export default BackLink
