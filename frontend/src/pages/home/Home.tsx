import { useMemo } from 'react'
import BenefitsBar from '@/components/benefitsBar/BenefitsBar'
import CategoryGrid from '@/components/categoryGrid/CategoryGrid'
import Hero from '@/components/hero/Hero'
import HowToBuy from '@/components/howToBuy/HowToBuy'
import ProductCarousel from '@/components/productCarousel/ProductCarousel'
import ProductGrid from '@/components/productGrid/ProductGrid'
import SectionHeader from '@/components/sectionHeader/SectionHeader'
import WholesaleBanner from '@/components/wholesaleBanner/WholesaleBanner'
import { useCatalogProducts } from '@/hooks/useCatalogProducts'
import { useStoreContent } from '@/hooks/useStoreContent'
import { getFeaturedProducts } from '@/services/productService'

function Home() {
  const { hero, benefits, categories } = useStoreContent()
  const products = useCatalogProducts()
  const featuredProducts = useMemo(() => getFeaturedProducts(products), [products])

  return (
    <div className="pb-24">
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        primaryAction={hero.primaryAction}
        secondaryAction={hero.secondaryAction.label ? hero.secondaryAction : undefined}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {benefits.length > 0 && (
          <BenefitsBar benefits={benefits} className="relative z-10 -mt-10 sm:-mt-12" />
        )}

        <div className="mt-16 flex flex-col gap-16 lg:mt-24 lg:gap-24">
          {categories.length > 0 && (
            <section>
              <SectionHeader title="Comprá por categoría" subtitle="Encontrá lo que necesitás" />
              <CategoryGrid categories={categories} />
            </section>
          )}

          {featuredProducts.length > 0 && (
            <ProductCarousel
              title="Los más pedidos"
              subtitle="Lo que más se llevan nuestros clientes"
              products={featuredProducts}
            />
          )}

          <WholesaleBanner />

          <section>
            <SectionHeader
              title="Novedades"
              subtitle="Lo último que llegó a TERO"
              linkTo="/novedades"
            />
            <ProductGrid products={products} />
          </section>

          <HowToBuy />
        </div>
      </div>
    </div>
  )
}

export default Home
