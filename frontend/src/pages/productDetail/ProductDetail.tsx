import { useParams } from 'react-router'
import BackLink from '@/components/backLink/BackLink'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import ProductCarousel from '@/components/productCarousel/ProductCarousel'
import ProductGallery from '@/components/productGallery/ProductGallery'
import ProductInfo from '@/components/productInfo/ProductInfo'
import { useCatalogProducts } from '@/hooks/useCatalogProducts'
import NotFound from '@/pages/notFound/NotFound'
import { findProductBySlug, getRelatedProducts } from '@/services/productService'

function ProductDetail() {
  const { slug } = useParams()
  const products = useCatalogProducts()
  const product = findProductBySlug(products, slug)

  if (!product) {
    return (
      <NotFound
        title="No encontramos este producto"
        description="Puede que ya no esté disponible o que el link sea incorrecto."
      />
    )
  }

  const relatedProducts = getRelatedProducts(products, product)

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BackLink to="/" label="Volver al inicio" />
        <Breadcrumb
          items={[{ label: 'Inicio', to: '/' }, { label: product.category }, { label: product.name }]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <ProductGallery key={`gallery-${product.id}`} images={product.images} name={product.name} />
        <ProductInfo
          key={`info-${product.id}`}
          product={product}
          className="lg:sticky lg:top-28 lg:self-start"
        />
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20 lg:mt-28">
          <ProductCarousel title="También te puede gustar" products={relatedProducts} />
        </div>
      )}
    </div>
  )
}

export default ProductDetail
