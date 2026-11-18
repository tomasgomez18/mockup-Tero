import { MessageCircle } from 'lucide-react'
import { useStoreContent } from '@/hooks/useStoreContent'
import { getWhatsAppUrl } from '@/utils/whatsapp'

function WholesaleBanner() {
  const { storeInfo } = useStoreContent()
  const url = getWhatsAppUrl(
    storeInfo.whatsappNumber,
    'Hola TERO, quiero consultar por la lista de precios mayorista.',
  )

  return (
    <section className="flex flex-col items-start justify-between gap-6 rounded-card bg-brand-950 p-6 text-white sm:flex-row sm:items-center sm:p-10">
      <div>
        <p className="text-xs font-bold tracking-widest text-brand-200 uppercase">
          Para comercios y revendedores
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">¿Comprás por mayor? Pedí tu lista de precios</h2>
        <p className="mt-2 max-w-xl text-white/70">
          Descuentos por cantidad en todo el catálogo. Escribinos y te asesoramos.
        </p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-100"
      >
        <MessageCircle className="size-5" />
        Hablar por WhatsApp
      </a>
    </section>
  )
}

export default WholesaleBanner
