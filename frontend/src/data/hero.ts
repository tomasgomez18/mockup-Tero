import type { HeroContent } from '@/types/home'

export const hero: HeroContent = {
  eyebrow: 'Mayorista y minorista',
  title: 'Todo para tu negocio y tu casa',
  description: 'Accesorios, útiles y bazar al mejor precio. Comprá online y retirá en el local o recibí tu pedido.',
  image: '/img/cuaderno.jpg',
  primaryAction: { label: 'Ver productos', to: '/novedades' },
  secondaryAction: { label: 'Ofertas', to: '/ofertas' },
}
