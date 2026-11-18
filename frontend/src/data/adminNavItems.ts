import { BadgePercent, House, LayoutDashboard, Package, Store } from 'lucide-react'
import type { AdminNavItem } from '@/types/navigation'

export const adminNavItems: AdminNavItem[] = [
  { label: 'Panel', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Productos', to: '/admin/productos', icon: Package },
  { label: 'Ofertas', to: '/admin/ofertas', icon: BadgePercent },
  { label: 'Inicio de la tienda', to: '/admin/inicio', icon: House },
  { label: 'Datos de la tienda', to: '/admin/tienda', icon: Store },
]
