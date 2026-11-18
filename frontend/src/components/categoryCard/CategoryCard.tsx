import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/types/category'

interface CategoryCardProps {
  category: Category
}

function CategoryCard({ category }: CategoryCardProps) {
  const { name, description, to, image } = category

  return (
    <Link
      to={to}
      className="group relative flex aspect-[4/3] overflow-hidden rounded-card bg-brand-600 ring-1 ring-neutral-200"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
      <div className="relative mt-auto flex w-full items-end justify-between gap-3 p-5 text-white">
        <div className="min-w-0">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="truncate text-sm text-white/80">{description}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}

export default CategoryCard
