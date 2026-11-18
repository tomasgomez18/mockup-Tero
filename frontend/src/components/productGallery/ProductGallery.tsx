import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'
import { cn } from '@/utils/cn'

interface ProductGalleryProps {
  images: string[]
  name: string
}

function ProductGallery({ images, name }: ProductGalleryProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="min-w-0 lg:grid lg:grid-cols-[88px_minmax(0,1fr)] lg:items-start lg:gap-4 lg:self-start">
      <ul className="hidden flex-col gap-3 lg:flex">
        {images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              aria-label={`Ver foto ${index + 1}`}
              aria-current={activeIndex === index}
              onClick={() => swiper?.slideTo(index)}
              className={cn(
                'block aspect-square w-full overflow-hidden rounded-thumb bg-white ring-1 ring-neutral-200 ring-2 ring-offset-2 ring-offset-neutral-50 transition-all',
                activeIndex === index
                  ? 'ring-brand-600'
                  : 'opacity-60 ring-transparent hover:opacity-100',
              )}
            >
              <img src={image} alt="" className="size-full object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative min-w-0 overflow-hidden rounded-card bg-white ring-1 ring-neutral-200">
        <Swiper onSwiper={setSwiper} onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}>
          {images.map((image, index) => (
            <SwiperSlide key={image}>
              <img
                src={image}
                alt={`${name} - foto ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="aspect-square w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5 lg:hidden">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Ver foto ${index + 1}`}
              onClick={() => swiper?.slideTo(index)}
              className={cn(
                'h-1.5 rounded-full bg-white transition-all duration-300',
                activeIndex === index ? 'w-6' : 'w-1.5 opacity-60',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGallery
