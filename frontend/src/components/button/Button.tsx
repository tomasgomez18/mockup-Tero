import type { ButtonHTMLAttributes } from 'react'
import { buttonVariants, type ButtonVariantProps } from '@/utils/buttonVariants'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {}

function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export default Button
