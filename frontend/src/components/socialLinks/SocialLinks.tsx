import { Mail, MessageCircle } from 'lucide-react'
import InstagramIcon from '@/components/socialLinks/InstagramIcon'
import { useStoreContent } from '@/hooks/useStoreContent'
import { cn } from '@/utils/cn'
import { getWhatsAppUrl } from '@/utils/whatsapp'

interface SocialLinksProps {
  className?: string
}

function SocialLinks({ className }: SocialLinksProps) {
  const { storeInfo } = useStoreContent()

  const links = [
    { label: 'Instagram', href: storeInfo.instagramUrl, icon: InstagramIcon },
    { label: 'WhatsApp', href: getWhatsAppUrl(storeInfo.whatsappNumber), icon: MessageCircle },
    { label: 'Email', href: storeInfo.email && `mailto:${storeInfo.email}`, icon: Mail },
  ].filter((link) => link.href)

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {links.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-white hover:bg-white hover:text-neutral-900"
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
