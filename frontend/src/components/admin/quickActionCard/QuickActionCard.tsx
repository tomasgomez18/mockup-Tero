import { Link } from 'react-router'
import { ArrowRight, type LucideIcon } from 'lucide-react'

interface QuickActionCardProps {
  icon: LucideIcon
  title: string
  description: string
  to: string
}

function QuickActionCard({ icon: Icon, title, description, to }: QuickActionCardProps) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-card bg-white p-5 ring-1 ring-neutral-900/5 transition-shadow hover:shadow-lg hover:shadow-neutral-900/5"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-thumb bg-brand-600 text-white">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-neutral-900">{title}</p>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-900" />
    </Link>
  )
}

export default QuickActionCard
