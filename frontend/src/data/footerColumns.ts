import type { FooterColumn } from '@/types/navigation'

export const footerColumns: FooterColumn[] = [
  {
    title: 'Tienda',
    links: [
      { label: 'Accesorios', to: '/accesorios' },
      { label: 'Útiles', to: '/utiles' },
      { label: 'Bazar', to: '/bazar' },
      { label: 'Novedades', to: '/novedades' },
      { label: 'Ofertas', to: '/ofertas' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Preguntas frecuentes', to: '/ayuda' },
      { label: 'Envíos y retiros', to: '/envios' },
      { label: 'Compras mayoristas', to: '/mayoristas' },
      { label: 'Administración', to: '/admin' },
    ],
  },
]
