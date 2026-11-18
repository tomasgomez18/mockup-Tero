import type { AnchorHTMLAttributes } from 'react'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface WhatsAppButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: 'solid' | 'outline'
}

const variants = {
  solid: 'bg-[#25D366] text-white hover:bg-[#1ebe5b]',
  outline: 'border border-[#25D366] bg-white text-[#128C7E] hover:bg-[#25D366]/10',
}

function WhatsAppButton({ className, children, variant = 'solid', ...props }: WhatsAppButtonProps) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]',
        variants[variant],
        className,
      )}
      {...props}
    >
      <MessageCircle className="size-5" />
      {children}
    </a>
  )
}

export default WhatsAppButton
