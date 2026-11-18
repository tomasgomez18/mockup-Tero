import { motion } from 'motion/react'
import ProductCard from '@/components/productCard/ProductCard'
import type { Product } from '@/types/product'
import { cn } from '@/utils/cn'

interface ProductGridProps {
  products: Product[]
  className?: string
}

function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}

export default ProductGrid
