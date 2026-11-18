import { Mail, MapPin, Phone } from 'lucide-react'
import FooterLinks from '@/components/footer/FooterLinks'
import Logo from '@/components/logo/Logo'
import SocialLinks from '@/components/socialLinks/SocialLinks'
import { footerColumns } from '@/data/footerColumns'
import { useStoreContent } from '@/hooks/useStoreContent'
import { getWhatsAppUrl } from '@/utils/whatsapp'

const year = new Date().getFullYear()

function Footer() {
  const { storeInfo } = useStoreContent()

  const contactItems = [
    { icon: MapPin, label: storeInfo.address },
    { icon: Mail, label: storeInfo.email, href: `mailto:${storeInfo.email}` },
    { icon: Phone, label: storeInfo.phone, href: getWhatsAppUrl(storeInfo.whatsappNumber) },
  ].filter((item) => item.label)

  return (
    <footer className="bg-brand-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo className="text-white" />
            <p className="max-w-xs text-sm leading-relaxed">{storeInfo.description}</p>
            <SocialLinks />
          </div>

          {footerColumns.map((column) => (
            <FooterLinks key={column.title} column={column} />
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">Contacto</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <Icon className="size-4 shrink-0 text-neutral-500" />
                  {href ? (
                    <a href={href} className="break-all transition-colors hover:text-white">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {storeInfo.name}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-2">
            {storeInfo.paymentMethods.map((method) => (
              <li key={method} className="rounded-md border border-white/15 px-2.5 py-1">
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
