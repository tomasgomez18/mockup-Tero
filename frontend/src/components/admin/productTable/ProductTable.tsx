import { Link } from 'react-router'
import ProductActions from '@/components/admin/productTable/ProductActions'
import ProductPrice from '@/components/admin/productTable/ProductPrice'
import StockBadge from '@/components/admin/stockBadge/StockBadge'
import Switch from '@/components/form/switch/Switch'
import type { Product } from '@/types/product'

interface ProductTableProps {
  products: Product[]
  onToggleFeatured: (id: string) => void
  onDelete: (product: Product) => void
}

function ProductTable({ products, onToggleFeatured, onDelete }: ProductTableProps) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-card bg-white ring-1 ring-neutral-900/5 md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs tracking-wider text-neutral-500 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Destacado</th>
              <th className="px-4 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((product) => (
              <tr key={product.id} className="transition-colors hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link to={`/admin/productos/${product.id}`} className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="size-12 shrink-0 rounded-thumb bg-neutral-100 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-neutral-900 hover:underline">{product.name}</p>
                      <p className="truncate text-xs text-neutral-500">
                        {product.colors.length} {product.colors.length === 1 ? 'color' : 'colores'}
                        {product.isNew && ' · Nuevo'}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-neutral-600">{product.category}</td>
                <td className="px-4 py-3">
                  <ProductPrice product={product} />
                </td>
                <td className="px-4 py-3">
                  <StockBadge product={product} />
                </td>
                <td className="px-4 py-3">
                  <Switch
                    label={`Destacar ${product.name}`}
                    hideLabel
                    checked={Boolean(product.isFeatured)}
                    onChange={() => onToggleFeatured(product.id)}
                  />
                </td>
                <td className="px-2 py-3">
                  <ProductActions product={product} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 md:hidden">
        {products.map((product) => (
          <li key={product.id} className="rounded-card bg-white p-4 ring-1 ring-neutral-900/5">
            <Link to={`/admin/productos/${product.id}`} className="flex gap-3">
              <img
                src={product.images[0]}
                alt=""
                className="size-16 shrink-0 rounded-thumb bg-neutral-100 object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="truncate font-medium text-neutral-900">{product.name}</p>
                <p className="text-xs text-neutral-500">{product.category}</p>
                <div className="flex items-center justify-between gap-2">
                  <ProductPrice product={product} />
                  <StockBadge product={product} />
                </div>
              </div>
            </Link>
            <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Switch
                  label={`Destacar ${product.name}`}
                  hideLabel
                  checked={Boolean(product.isFeatured)}
                  onChange={() => onToggleFeatured(product.id)}
                />
                Destacado
              </div>
              <ProductActions product={product} onDelete={onDelete} />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ProductTable
