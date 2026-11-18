import { Link, type LinkProps } from 'react-router'
import { buttonVariants, type ButtonVariantProps } from '@/utils/buttonVariants'
import { cn } from '@/utils/cn'

interface ButtonLinkProps extends LinkProps, ButtonVariantProps {
  className?: string
}

function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export default ButtonLink
