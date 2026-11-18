import type { Product } from '@/types/product'

const gallery = (file: string) => [`/img/${file}`]

const colors = {
  red: { name: 'Rojo', hex: '#d71920' },
  white: { name: 'Blanco', hex: '#f5f5f4' },
  black: { name: 'Negro', hex: '#171717' },
  blue: { name: 'Azul', hex: '#1e3a8a' },
  clear: { name: 'Transparente', hex: '#cbd5e1' },
}

const oneSize = ['Único']

export const products: Product[] = [
  {
    id: '1', slug: 'mochila-urbana', name: 'Mochila Urbana 20L', category: 'Accesorios',
    description: 'Mochila liviana con compartimento acolchado y bolsillo frontal.',
    price: 24900, compareAtPrice: 29900, images: gallery('mochila.jpg'),
    colors: [colors.red, colors.black], sizes: oneSize,
    details: ['Poliéster resistente', 'Capacidad 20 litros', 'Cierres reforzados'], isNew: true, isFeatured: true,
  },
  {
    id: '2', slug: 'gorra-visera-curva', name: 'Gorra Visera Curva', category: 'Accesorios',
    description: 'Gorra de gabardina con cierre regulable.',
    price: 8900, images: gallery('gorra.jpg'),
    colors: [colors.black, colors.white], sizes: oneSize,
    details: ['100% algodón', 'Medida única regulable'], isNew: true,
  },
  {
    id: '3', slug: 'set-bijouterie-x12', name: 'Set de Bijouterie x12', category: 'Accesorios',
    description: 'Pack surtido de aros, pulseras y collares ideal para reventa.',
    price: 15900, images: gallery('bijouterie.svg'),
    colors: [colors.white, colors.red], sizes: oneSize,
    details: ['Pack de 12 unidades', 'Surtido de modelos'], isFeatured: true,
  },
  {
    id: '4', slug: 'cuaderno-universitario', name: 'Cuaderno Universitario 80 hojas', category: 'Útiles',
    description: 'Cuaderno tapa dura con espiral, rayado.',
    price: 3200, images: gallery('cuaderno.jpg'),
    colors: [colors.blue, colors.red], sizes: oneSize,
    details: ['80 hojas', 'Tapa dura', 'Espiral metálico'], isNew: true, isFeatured: true,
  },
  {
    id: '5', slug: 'lapiceras-pack-x10', name: 'Lapiceras Pack x10', category: 'Útiles',
    description: 'Pack de 10 lapiceras de tinta azul, trazo fino.',
    price: 4500, compareAtPrice: 5200, images: gallery('lapiceras.jpg'),
    colors: [colors.blue, colors.black], sizes: oneSize,
    details: ['Pack x10', 'Trazo 0.7 mm'],
  },
  {
    id: '6', slug: 'set-geometria', name: 'Set de Geometría', category: 'Útiles',
    description: 'Regla, escuadras y transportador en estuche.',
    price: 3900, images: gallery('geometria.jpg'),
    colors: [colors.clear], sizes: oneSize,
    details: ['Incluye 4 piezas', 'Estuche rígido'],
  },
  {
    id: '7', slug: 'vasos-vidrio-x6', name: 'Vasos de Vidrio x6', category: 'Bazar',
    description: 'Juego de 6 vasos de vidrio templado.',
    price: 12900, compareAtPrice: 15500, images: gallery('vasos.jpg'),
    colors: [colors.clear], sizes: oneSize,
    details: ['Pack x6', '350 ml', 'Apto lavavajillas'], isNew: true, isFeatured: true,
  },
  {
    id: '8', slug: 'taza-ceramica', name: 'Taza de Cerámica 300ml', category: 'Bazar',
    description: 'Taza de cerámica con asa, varios colores.',
    price: 3500, images: gallery('taza.jpg'),
    colors: [colors.white, colors.red, colors.black], sizes: oneSize,
    details: ['300 ml', 'Apta microondas'],
  },
  {
    id: '9', slug: 'organizador-multiuso', name: 'Organizador Multiuso', category: 'Bazar',
    description: 'Organizador plástico apilable para cocina o escritorio.',
    price: 9800, images: gallery('organizador-bandeja.jpg'),
    colors: [colors.white, colors.clear], sizes: oneSize,
    details: ['Plástico resistente', 'Apilable'], isNew: true,
  },
  {
    id: '10', slug: 'set-tuppers-x5', name: 'Set de Tuppers x5', category: 'Bazar',
    description: 'Set de 5 recipientes herméticos con tapa.',
    price: 11500, compareAtPrice: 13900, images: gallery('tuppers-set.jpg'),
    colors: [colors.clear, colors.red], sizes: oneSize,
    details: ['Pack x5', 'Libres de BPA'], isFeatured: true,
  },
]
