import { useParams } from 'react-router'
import BackLink from '@/components/backLink/BackLink'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import CollectionCatalog from '@/components/collectionCatalog/CollectionCatalog'
import { useCatalogProducts } from '@/hooks/useCatalogProducts'
import NotFound from '@/pages/notFound/NotFound'
import { getCollectionBySlug, getProductsByCollection } from '@/services/productService'

function Collection() {
  const { collectionSlug } = useParams()
  const products = useCatalogProducts()
  const collection = getCollectionBySlug(collectionSlug)

  if (!collection) return <NotFound />

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BackLink to="/" label="Volver al inicio" />
        <Breadcrumb items={[{ label: 'Inicio', to: '/' }, { label: collection.title }]} />
      </div>

      <header className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{collection.title}</h1>
        <p className="mt-2 max-w-xl text-neutral-500">{collection.description}</p>
      </header>

      <CollectionCatalog key={collection.slug} products={getProductsByCollection(products, collection)} />
    </div>
  )
}

export default Collection
