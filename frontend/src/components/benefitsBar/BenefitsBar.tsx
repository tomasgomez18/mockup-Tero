import { motion } from 'motion/react'
import { benefitIcons } from '@/data/benefitIcons'
import type { Benefit } from '@/types/benefit'
import { cn } from '@/utils/cn'

interface BenefitsBarProps {
  benefits: Benefit[]
  className?: string
}

function BenefitsBar({ benefits, className }: BenefitsBarProps) {
  return (
    <ul className={cn('grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4', className)}>
      {benefits.map(({ icon, title, description }, index) => {
        const Icon = benefitIcons[icon].icon
        return (
          <motion.li
            key={`${title}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
          >
            <div className="group flex h-full flex-col gap-3 rounded-card bg-white p-4 shadow-lg shadow-neutral-900/10 ring-1 ring-neutral-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/15 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-thumb bg-brand-600 text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:size-12">
                <Icon className="size-5 sm:size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900 sm:text-base">{title}</p>
                <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">{description}</p>
              </div>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}

export default BenefitsBar
