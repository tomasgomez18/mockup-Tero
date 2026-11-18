import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { SearchX } from 'lucide-react'
import BackLink from '@/components/backLink/BackLink'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import ButtonLink from '@/components/buttonLink/ButtonLink'
import CollectionCatalog from '@/components/collectionCatalog/CollectionCatalog'
import EmptyState from '@/components/emptyState/EmptyState'
import { useCatalogProducts } from '@/hooks/useCatalogProducts'
import { searchProducts } from '@/utils/search'

function Search() {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim()
  const products = useCatalogProducts()
  const results = useMemo(() => searchProducts(products, query), [products, query])

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BackLink to="/" label="Volver al inicio" />
        <Breadcrumb items={[{ label: 'Inicio', to: '/' }, { label: 'Búsqueda' }]} />
      </div>

      <header className="mt-8">
        <p className="text-sm text-neutral-500">Resultados de búsqueda</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight break-words sm:text-4xl">
          {query ? `"${query}"` : 'Buscá un producto'}
        </h1>
      </header>

      {results.length > 0 ? (
        <CollectionCatalog key={query} products={results} />
      ) : (
        <EmptyState
          icon={SearchX}
          title={query ? 'No encontramos productos' : 'Escribí qué estás buscando'}
          description={
            query
              ? 'Revisá cómo está escrito o probá con una palabra más general, como "taza" o "negro".'
              : 'Usá el ícono de la lupa arriba para buscar por nombre, categoría o color.'
          }
          className="mt-10"
          action={<ButtonLink to="/novedades">Ver novedades</ButtonLink>}
        />
      )}
    </div>
  )
}

export default Search
