import { Link } from 'react-router'
import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import IconButton from '@/components/iconButton/IconButton'
import type { Product } from '@/types/product'

interface ProductActionsProps {
  product: Product
  onDelete: (product: Product) => void
}

const linkActionClass =
  'inline-flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-900/5 hover:text-neutral-900'

function ProductActions({ product, onDelete }: ProductActionsProps) {
  return (
    <div className="flex items-center justify-end">
      <Link
        to={`/admin/productos/${product.id}`}
        aria-label="Editar"
        title="Editar"
        className={linkActionClass}
      >
        <Pencil className="size-4" />
      </Link>
      <a
        href={`/producto/${product.slug}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Ver en la tienda"
        title="Ver en la tienda"
        className={linkActionClass}
      >
        <ExternalLink className="size-4" />
      </a>
      <IconButton label="Eliminar" onClick={() => onDelete(product)} className="hover:text-red-600">
        <Trash2 className="size-4" />
      </IconButton>
    </div>
  )
}

export default ProductActions
