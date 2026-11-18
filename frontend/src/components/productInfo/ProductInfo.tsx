import { useState, type MouseEvent } from 'react'
import { useLocation } from 'react-router'
import { Heart, RefreshCw, ShoppingBag, Truck } from 'lucide-react'
import Accordion from '@/components/accordion/Accordion'
import Badge from '@/components/badge/Badge'
import Button from '@/components/button/Button'
import ColorSelector from '@/components/colorSelector/ColorSelector'
import IconButton from '@/components/iconButton/IconButton'
import SizeSelector from '@/components/sizeSelector/SizeSelector'
import WhatsAppButton from '@/components/whatsAppButton/WhatsAppButton'
import { useStoreContent } from '@/hooks/useStoreContent'
import { addToCart } from '@/state/cartStore'
import type { Product } from '@/types/product'
import { cn } from '@/utils/cn'
import { formatPrice, getDiscount } from '@/utils/price'
import { getProductInquiryMessage, getWhatsAppUrl } from '@/utils/whatsapp'

interface ProductInfoProps {
  product: Product
  className?: string
}

const INSTALLMENTS = 3

function ProductInfo({ product, className }: ProductInfoProps) {
  const {
    name,
    description,
    price,
    compareAtPrice,
    colors,
    sizes,
    unavailableSizes,
    details,
    isNew,
    campaignLabel,
  } = product
  const { pathname } = useLocation()
  const { storeInfo } = useStoreContent()
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showSizeError, setShowSizeError] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const whatsAppUrl = getWhatsAppUrl(
    storeInfo.whatsappNumber,
    getProductInquiryMessage({
      product,
      size: selectedSize,
      color: selectedColor.name,
      pageUrl: `${window.location.origin}${pathname}`,
    }),
  )

  const handleSelectSize = (size: string) => {
    setSelectedSize(size)
    setShowSizeError(false)
  }

  const handleInquiry = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!selectedSize) {
      event.preventDefault()
      setShowSizeError(true)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true)
      return
    }
    addToCart({ productId: product.id, color: selectedColor.name, size: selectedSize })
  }

  const accordionItems = [
    { id: 'description', title: 'Descripción', content: <p>{description}</p> },
    {
      id: 'details',
      title: 'Composición y cuidados',
      content: (
        <ul className="list-disc space-y-1 pl-5">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'shipping',
      title: 'Envíos, retiros y cambios',
      content: (
        <p>
          Hacemos envíos a todo el país y también podés retirar en el local. Aceptamos cambios por falla dentro de los 30 días, con el producto sin uso y en su
          envase original.
        </p>
      ),
    },
  ]

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-3">
        {(isNew || compareAtPrice) && (
          <div className="flex flex-wrap gap-2">
            {campaignLabel && <Badge>{campaignLabel}</Badge>}
            {compareAtPrice && <Badge variant="sale">-{getDiscount(price, compareAtPrice)}%</Badge>}
            {isNew && <Badge variant="light" className="ring-1 ring-neutral-900/10">Nuevo</Badge>}
          </div>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{name}</h1>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {compareAtPrice && (
            <span className="text-base text-neutral-400 line-through">{formatPrice(compareAtPrice)}</span>
          )}
          <span className={cn('text-2xl font-semibold', compareAtPrice && 'text-red-600')}>
            {formatPrice(price)}
          </span>
          {compareAtPrice && (
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
              Ahorrás {formatPrice(compareAtPrice - price)}
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-500">
          {INSTALLMENTS} cuotas sin interés de{' '}
          <span className="font-medium text-neutral-900">{formatPrice(Math.round(price / INSTALLMENTS))}</span>
        </p>
      </div>

      <div className="flex flex-col gap-6 border-t border-neutral-200 pt-6">
        <ColorSelector colors={colors} selected={selectedColor} onSelect={setSelectedColor} />
        <SizeSelector
          sizes={sizes}
          unavailableSizes={unavailableSizes}
          selected={selectedSize}
          onSelect={handleSelectSize}
          error={showSizeError ? 'Elegí una presentación para continuar' : undefined}
          guideTo="/guia-de-talles"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Button size="lg" onClick={handleAddToCart} className="flex-1">
            <ShoppingBag className="size-5" />
            Agregar al carrito
          </Button>
          <IconButton
            label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            aria-pressed={favorite}
            onClick={() => setFavorite((value) => !value)}
            className="size-12 border border-neutral-300 hover:border-brand-600"
          >
            <Heart className={cn('size-5', favorite && 'fill-red-500 text-red-500')} />
          </IconButton>
        </div>
        <WhatsAppButton href={whatsAppUrl} onClick={handleInquiry} variant="outline">
          Consultar por WhatsApp
        </WhatsAppButton>
      </div>

      <ul className="flex flex-col gap-2 text-sm text-neutral-600">
        <li className="flex items-center gap-2">
          <Truck className="size-4 text-neutral-900" />
          Envíos a todo el país
        </li>
        <li className="flex items-center gap-2">
          <RefreshCw className="size-4 text-neutral-900" />
          Primer cambio sin cargo
        </li>
      </ul>

      <Accordion items={accordionItems} defaultOpenId="description" />
    </div>
  )
}

export default ProductInfo
