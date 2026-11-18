import { motion } from 'motion/react'
import CategoryCard from '@/components/categoryCard/CategoryCard'
import type { Category } from '@/types/category'

interface CategoryGridProps {
  categories: Category[]
}

function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3 md:gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
        >
          <CategoryCard category={category} />
        </motion.div>
      ))}
    </div>
  )
}

export default CategoryGrid
