import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600',
        outline:
          'border border-neutral-300 bg-white text-neutral-900 hover:border-brand-600 focus-visible:outline-brand-600',
        light: 'bg-white text-neutral-900 hover:bg-neutral-200 focus-visible:outline-white',
        outlineLight:
          'border border-white/50 text-white backdrop-blur-sm hover:bg-white/15 focus-visible:outline-white',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-7 text-sm sm:text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
