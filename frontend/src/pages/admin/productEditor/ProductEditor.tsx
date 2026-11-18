import { useNavigate, useParams } from 'react-router'
import { ExternalLink, PackageX } from 'lucide-react'
import AdminPageHeader from '@/components/admin/adminPageHeader/AdminPageHeader'
import ProductForm from '@/components/admin/productForm/ProductForm'
import BackLink from '@/components/backLink/BackLink'
import ButtonLink from '@/components/buttonLink/ButtonLink'
import EmptyState from '@/components/emptyState/EmptyState'
import { useStoreContent } from '@/hooks/useStoreContent'
import { findProductById, getProductCategories } from '@/services/productService'
import { saveProduct } from '@/state/contentStore'
import { showToast } from '@/state/toastStore'
import type { Product } from '@/types/product'

function ProductEditor() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { products } = useStoreContent()
  const product = productId ? findProductById(products, productId) : undefined
  const isNew = !productId

  if (productId && !product) {
    return (
      <EmptyState
        icon={PackageX}
        title="No encontramos este producto"
        description="Puede que lo hayan eliminado."
        className="bg-white"
        action={<ButtonLink to="/admin/productos">Volver a productos</ButtonLink>}
      />
    )
  }

  const handleSubmit = (values: Product) => {
    if (!saveProduct(values)) {
      showToast('No se pudo guardar. Probá con fotos más livianas o menos fotos.', 'error')
      return
    }
    showToast(isNew ? `Se creó "${values.name}"` : 'Cambios guardados')
    navigate('/admin/productos')
  }

  return (
    <>
      <BackLink to="/admin/productos" label="Volver a productos" className="mb-6" />
      <AdminPageHeader
        title={isNew ? 'Nuevo producto' : product?.name ?? 'Editar producto'}
        description={
          isNew ? 'Completá los datos y se va a publicar en la tienda.' : 'Los cambios se ven en la tienda al guardar.'
        }
        actions={
          product && (
            <a
              href={`/producto/${product.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              <ExternalLink className="size-4" />
              Ver en la tienda
            </a>
          )
        }
      />
      <ProductForm
        key={product?.id ?? 'new'}
        initialProduct={product}
        categories={getProductCategories(products)}
        takenSlugs={products.filter((item) => item.id !== product?.id).map((item) => item.slug)}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/productos')}
      />
    </>
  )
}

export default ProductEditor
