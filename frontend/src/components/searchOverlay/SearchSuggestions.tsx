import { Link } from 'react-router'
import { collections } from '@/data/collections'

interface SearchSuggestionsProps {
  terms: string[]
  onSelectTerm: (term: string) => void
  onNavigate: () => void
}

const chipClass =
  'inline-flex h-9 items-center rounded-full border border-neutral-300 px-4 text-sm text-neutral-700 transition-colors hover:border-brand-600 hover:text-neutral-900'

function SearchSuggestions({ terms, onSelectTerm, onNavigate }: SearchSuggestionsProps) {
  return (
    <div className="flex flex-col gap-6 py-2">
      <div>
        <p className="mb-3 text-xs font-medium tracking-wider text-neutral-500 uppercase">Buscá por tipo de prenda</p>
        <div className="flex flex-wrap gap-2">
          {terms.map((term) => (
            <button key={term} type="button" onClick={() => onSelectTerm(term)} className={chipClass}>
              {term}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium tracking-wider text-neutral-500 uppercase">O explorá</p>
        <div className="flex flex-wrap gap-2">
          {collections.map((collection) => (
            <Link key={collection.slug} to={`/${collection.slug}`} onClick={onNavigate} className={chipClass}>
              {collection.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchSuggestions
