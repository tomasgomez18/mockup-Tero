import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
  {
    variants: {
      variant: {
        dark: 'bg-brand-600 text-white',
        light: 'bg-white/90 text-neutral-900 backdrop-blur-sm',
        sale: 'bg-red-600 text-white',
      },
    },
    defaultVariants: { variant: 'dark' },
  },
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode
  className?: string
}

function Badge({ variant, className, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>
}

export default Badge
