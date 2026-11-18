import type { Collection } from '@/types/collection'

export const collections: Collection[] = [
  {
    slug: 'accesorios',
    title: 'Accesorios',
    description: 'Bijouterie, bolsos, gorras, mochilas y detalles para revender o usar.',
    includes: (product) => product.category === 'Accesorios',
  },
  {
    slug: 'utiles',
    title: 'Útiles',
    description: 'Cuadernos, lapiceras, mochilas y todo para la escuela y la oficina.',
    includes: (product) => product.category === 'Útiles',
  },
  {
    slug: 'bazar',
    title: 'Bazar',
    description: 'Vasos, tazas, organizadores, cocina y artículos para el hogar.',
    includes: (product) => product.category === 'Bazar',
  },
  {
    slug: 'novedades',
    title: 'Novedades',
    description: 'Lo último que llegó a TERO.',
    includes: (product) => Boolean(product.isNew),
  },
  {
    slug: 'ofertas',
    title: 'Ofertas',
    description: 'Productos seleccionados con descuento por tiempo limitado.',
    includes: (product) => Boolean(product.compareAtPrice),
  },
]
