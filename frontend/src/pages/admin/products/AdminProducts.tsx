import { useMemo, useState } from 'react'
import { PackageSearch, Plus, Search } from 'lucide-react'
import AdminPageHeader from '@/components/admin/adminPageHeader/AdminPageHeader'
import ProductTable from '@/components/admin/productTable/ProductTable'
import Button from '@/components/button/Button'
import ButtonLink from '@/components/buttonLink/ButtonLink'
import ConfirmDialog from '@/components/confirmDialog/ConfirmDialog'
import EmptyState from '@/components/emptyState/EmptyState'
import SelectField from '@/components/form/selectField/SelectField'
import { useStoreContent } from '@/hooks/useStoreContent'
import { getProductCategories } from '@/services/productService'
import { deleteProduct, toggleProductFeatured } from '@/state/contentStore'
import { showToast } from '@/state/toastStore'
import type { Product } from '@/types/product'
import { cn } from '@/utils/cn'
import { fieldClass } from '@/utils/fieldStyles'
import { normalizeText } from '@/utils/text'

function AdminProducts() {
  const { products } = useStoreContent()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const categoryOptions = useMemo(
    () => [
      { value: '', label: 'Todas las categorías' },
      ...getProductCategories(products).map((item) => ({ value: item, label: item })),
    ],
    [products],
  )

  const filteredProducts = useMemo(() => {
    const search = normalizeText(query)
    return products.filter(
      (product) =>
        (!category || product.category === category) && normalizeText(product.name).includes(search),
    )
  }, [products, query, category])

  const handleToggleFeatured = (id: string) => {
    if (!toggleProductFeatured(id)) showToast('No se pudo guardar el cambio', 'error')
  }

  const handleConfirmDelete = () => {
    if (!productToDelete) return
    deleteProduct(productToDelete.id)
    showToast(`Se eliminó "${productToDelete.name}"`)
    setProductToDelete(null)
  }

  const hasFilters = Boolean(query || category)

  return (
    <>
      <AdminPageHeader
        title="Productos"
        description={`${products.length} ${products.length === 1 ? 'producto cargado' : 'productos cargados'}`}
        actions={
          <ButtonLink to="/admin/productos/nuevo">
            <Plus className="size-4" />
            Nuevo producto
          </ButtonLink>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre"
            aria-label="Buscar productos"
            className={cn(fieldClass, 'pl-9')}
          />
        </div>
        <SelectField
          label="Categoría"
          hideLabel
          options={categoryOptions}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="sm:w-56"
        />
      </div>

      {filteredProducts.length > 0 ? (
        <ProductTable
          products={filteredProducts}
          onToggleFeatured={handleToggleFeatured}
          onDelete={setProductToDelete}
        />
      ) : (
        <EmptyState
          icon={PackageSearch}
          title={hasFilters ? 'No hay productos con esa búsqueda' : 'Todavía no hay productos'}
          description={
            hasFilters
              ? 'Probá con otro nombre o cambiá la categoría.'
              : 'Cargá el primero para que aparezca en la tienda.'
          }
          className="bg-white"
          action={
            hasFilters ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery('')
                  setCategory('')
                }}
              >
                Limpiar búsqueda
              </Button>
            ) : (
              <ButtonLink to="/admin/productos/nuevo" size="md">
                <Plus className="size-4" />
                Nuevo producto
              </ButtonLink>
            )
          }
        />
      )}

      <ConfirmDialog
        open={Boolean(productToDelete)}
        title="¿Eliminar producto?"
        description={`"${productToDelete?.name ?? ''}" se va a quitar de la tienda. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        tone="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </>
  )
}

export default AdminProducts
