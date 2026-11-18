import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import IconButton from '@/components/iconButton/IconButton'
import ProductCard from '@/components/productCard/ProductCard'
import SectionHeader from '@/components/sectionHeader/SectionHeader'
import type { Product } from '@/types/product'

interface ProductCarouselProps {
  title: string
  subtitle?: string
  linkTo?: string
  products: Product[]
}

function ProductCarousel({ title, subtitle, linkTo, products }: ProductCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const updateEdges = (instance: SwiperInstance) => {
    setIsBeginning(instance.isBeginning)
    setIsEnd(instance.isEnd)
  }

  const arrows = (
    <div className="hidden items-center gap-2 md:flex">
      <IconButton
        label="Anterior"
        onClick={() => swiper?.slidePrev()}
        disabled={isBeginning}
        className="border border-neutral-300 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="size-5" />
      </IconButton>
      <IconButton
        label="Siguiente"
        onClick={() => swiper?.slideNext()}
        disabled={isEnd}
        className="border border-neutral-300 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="size-5" />
      </IconButton>
    </div>
  )

  return (
    <section>
      <SectionHeader title={title} subtitle={subtitle} linkTo={linkTo} actions={arrows} />
      <Swiper
        onSwiper={(instance) => {
          setSwiper(instance)
          updateEdges(instance)
        }}
        onSlideChange={updateEdges}
        onResize={updateEdges}
        spaceBetween={12}
        slidesPerView={1.3}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ProductCarousel
