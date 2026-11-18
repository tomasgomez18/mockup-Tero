import type { Category } from '@/types/category'

export const categories: Category[] = [
  { slug: 'accesorios', name: 'Accesorios', description: 'Bolsos, gorras y bijouterie', to: '/accesorios', image: '/img/mochila.jpg' },
  { slug: 'utiles', name: 'Útiles', description: 'Escolar y oficina', to: '/utiles', image: '/img/geometria.jpg' },
  { slug: 'bazar', name: 'Bazar', description: 'Cocina y hogar', to: '/bazar', image: '/img/taza.jpg' },
]
