import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number | string
  hint?: string
}

function StatCard({ icon: Icon, label, value, hint }: StatCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-card bg-white p-5 ring-1 ring-neutral-900/5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-500">{label}</span>
        <span className="flex size-9 items-center justify-center rounded-thumb bg-neutral-100 text-neutral-700">
          <Icon className="size-[18px]" />
        </span>
      </div>
      <div>
        <p className="text-3xl font-semibold tracking-tight text-neutral-900">{value}</p>
        {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      </div>
    </div>
  )
}

export default StatCard
