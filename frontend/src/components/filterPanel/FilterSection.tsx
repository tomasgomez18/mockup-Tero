import type { ReactNode } from 'react'

interface FilterSectionProps {
  title: string
  children: ReactNode
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <section className="border-b border-neutral-200 py-5 first:pt-0 last:border-b-0">
      <h3 className="mb-3 text-sm font-semibold text-neutral-900">{title}</h3>
      {children}
    </section>
  )
}

export default FilterSection
