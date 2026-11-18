import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Search } from 'lucide-react'
import SearchSuggestions from '@/components/searchOverlay/SearchSuggestions'
import { useCatalogProducts } from '@/hooks/useCatalogProducts'
import { getProductCategories } from '@/services/productService'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/price'
import { searchProducts } from '@/utils/search'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

const MAX_PREVIEW_RESULTS = 6

function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const products = useCatalogProducts()
  const results = useMemo(() => searchProducts(products, query), [products, query])
  const suggestedTerms = useMemo(() => getProductCategories(products), [products])
  const trimmedQuery = query.trim()

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  const close = () => {
    setQuery('')
    onClose()
  }

  const goToResults = () => {
    if (!trimmedQuery) return
    navigate(`/buscar?q=${encodeURIComponent(trimmedQuery)}`)
    close()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    goToResults()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Buscar productos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => event.target === event.currentTarget && close()}
          className="fixed inset-0 z-[60] bg-black/40"
        >
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white shadow-xl"
          >
            <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-6">
              <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400" />
                  <input
                    autoFocus
                    type="search"
                    enterKeyHint="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscá mochilas, vasos, cuadernos…"
                    aria-label="Buscar productos"
                    className="h-12 w-full rounded-full border border-neutral-300 bg-neutral-50 pr-4 pl-12 text-base text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-brand-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  Cerrar
                </button>
              </form>

              <div className="mt-4 max-h-[65svh] overflow-y-auto">
                {!trimmedQuery && (
                  <SearchSuggestions terms={suggestedTerms} onSelectTerm={setQuery} onNavigate={close} />
                )}

                {trimmedQuery && results.length === 0 && (
                  <p className="py-10 text-center text-sm text-neutral-500">
                    No encontramos productos para "{trimmedQuery}". Probá con otra palabra.
                  </p>
                )}

                {results.length > 0 && (
                  <>
                    <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
                    </p>
                    <ul className="flex flex-col">
                      {results.slice(0, MAX_PREVIEW_RESULTS).map((product) => (
                        <li key={product.id}>
                          <Link
                            to={`/producto/${product.slug}`}
                            onClick={close}
                            className="flex items-center gap-4 rounded-thumb p-2 transition-colors hover:bg-neutral-50"
                          >
                            <img
                              src={product.images[0]}
                              alt=""
                              className="aspect-[3/4] w-12 shrink-0 rounded-thumb bg-neutral-100 object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-neutral-900">{product.name}</p>
                              <p className="text-xs text-neutral-500">{product.category}</p>
                            </div>
                            <span className="flex shrink-0 flex-col items-end">
                              {product.compareAtPrice && (
                                <span className="text-xs text-neutral-400 line-through">
                                  {formatPrice(product.compareAtPrice)}
                                </span>
                              )}
                              <span
                                className={cn('text-sm font-semibold', product.compareAtPrice && 'text-red-600')}
                              >
                                {formatPrice(product.price)}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={goToResults}
                      className="group mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-neutral-100 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
                    >
                      Ver todos los resultados
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchOverlay
