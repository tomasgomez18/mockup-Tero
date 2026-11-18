import { Link } from 'react-router'
import Badge from '@/components/badge/Badge'
import ColorSwatches from '@/components/colorSwatches/ColorSwatches'
import type { Product } from '@/types/product'
import { cn } from '@/utils/cn'
import { formatPrice, getDiscount } from '@/utils/price'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { name, slug, category, price, compareAtPrice, images, colors, isNew, campaignLabel } = product
  const [mainImage, hoverImage] = images
  const productUrl = `/producto/${slug}`

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-600/10 hover:ring-brand-200">
      <div className="relative aspect-square overflow-hidden bg-white">
        <Link to={productUrl} aria-label={name} className="block size-full">
          <img
            src={mainImage}
            alt={name}
            loading="lazy"
            className={cn(
              'size-full object-cover transition-all duration-700 ease-out group-hover:scale-105',
              hoverImage && 'group-hover:opacity-0',
            )}
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute top-2 left-2 flex flex-col items-start gap-1.5">
          {campaignLabel && <Badge variant="dark">{campaignLabel}</Badge>}
          {compareAtPrice && <Badge variant="sale">-{getDiscount(price, compareAtPrice)}%</Badge>}
          {isNew && <Badge variant="light">Nuevo</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 border-t border-neutral-100 p-3">
        <span className="text-[11px] font-semibold tracking-wider text-brand-600 uppercase">{category}</span>
        <Link to={productUrl} className="line-clamp-2 min-h-10 text-sm font-medium text-neutral-900 hover:text-brand-600">
          {name}
        </Link>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
          <span className={cn('text-lg font-bold', compareAtPrice ? 'text-brand-600' : 'text-neutral-900')}>
            {formatPrice(price)}
          </span>
          {compareAtPrice && (
            <span className="text-xs text-neutral-400 line-through">{formatPrice(compareAtPrice)}</span>
          )}
        </div>
        <ColorSwatches colors={colors} />
      </div>
    </article>
  )
}

export default ProductCard
