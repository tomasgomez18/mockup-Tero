import { useState } from 'react'
import { SearchX, SlidersHorizontal } from 'lucide-react'
import BottomSheet from '@/components/bottomSheet/BottomSheet'
import Button from '@/components/button/Button'
import CategoryChips from '@/components/categoryChips/CategoryChips'
import EmptyState from '@/components/emptyState/EmptyState'
import FilterPanel from '@/components/filterPanel/FilterPanel'
import ProductGrid from '@/components/productGrid/ProductGrid'
import SortSelect from '@/components/sortSelect/SortSelect'
import { sortOptions } from '@/data/filterOptions'
import { useProductFilters } from '@/hooks/useProductFilters'
import type { Product } from '@/types/product'

interface CollectionCatalogProps {
  products: Product[]
}

function CollectionCatalog({ products }: CollectionCatalogProps) {
  const {
    filters,
    options,
    filteredProducts,
    activeFiltersCount,
    setCategory,
    setSort,
    toggleSize,
    toggleColor,
    togglePriceRange,
    clearFilters,
  } = useProductFilters(products)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const count = filteredProducts.length
  const countLabel = `${count} ${count === 1 ? 'producto' : 'productos'}`

  const filterPanel = (
    <FilterPanel
      sizes={options.sizes}
      colors={options.colors}
      filters={filters}
      onToggleSize={toggleSize}
      onToggleColor={toggleColor}
      onTogglePriceRange={togglePriceRange}
    />
  )

  return (
    <>
      {options.categories.length > 1 && (
        <CategoryChips
          categories={options.categories}
          selected={filters.category}
          onSelect={setCategory}
          className="mt-6"
        />
      )}

      <div className="mt-6 flex items-center justify-between gap-4 border-y border-neutral-200 py-3">
        <Button variant="outline" size="sm" onClick={() => setFiltersOpen(true)} className="lg:hidden">
          <SlidersHorizontal className="size-4" />
          Filtrar
          {activeFiltersCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-600 text-xs text-white">
              {activeFiltersCount}
            </span>
          )}
        </Button>
        <p className="hidden text-sm text-neutral-500 lg:block">{countLabel}</p>
        <SortSelect value={filters.sort} options={sortOptions} onChange={setSort} />
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold">Filtros</h2>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-900"
              >
                Limpiar
              </button>
            )}
          </div>
          {filterPanel}
        </aside>

        <div>
          <p className="mb-4 text-sm text-neutral-500 lg:hidden">{countLabel}</p>
          {count > 0 ? (
            <ProductGrid products={filteredProducts} className="lg:grid-cols-3" />
          ) : (
            <EmptyState
              icon={SearchX}
              title="No encontramos productos"
              description="Probá quitando algunos filtros para ver más resultados."
              action={
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              }
            />
          )}
        </div>
      </div>

      <BottomSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filtrar"
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
              className="flex-1"
            >
              Limpiar
            </Button>
            <Button onClick={() => setFiltersOpen(false)} className="flex-1">
              Ver {countLabel}
            </Button>
          </div>
        }
      >
        {filterPanel}
      </BottomSheet>
    </>
  )
}

export default CollectionCatalog
