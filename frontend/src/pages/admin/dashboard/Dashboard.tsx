import { Link } from 'react-router'
import { House, Package, PackageX, Plus, Sparkles, Star, Store, Tag } from 'lucide-react'
import AdminPageHeader from '@/components/admin/adminPageHeader/AdminPageHeader'
import QuickActionCard from '@/components/admin/quickActionCard/QuickActionCard'
import StatCard from '@/components/admin/statCard/StatCard'
import StockBadge from '@/components/admin/stockBadge/StockBadge'
import ButtonLink from '@/components/buttonLink/ButtonLink'
import { useStoreContent } from '@/hooks/useStoreContent'
import { formatPrice } from '@/utils/price'

function Dashboard() {
  const { products } = useStoreContent()

  const stats = [
    { icon: Package, label: 'Productos', value: products.length, hint: 'Publicados en la tienda' },
    {
      icon: Star,
      label: 'Destacados',
      value: products.filter((product) => product.isFeatured).length,
      hint: 'En el carrusel del inicio',
    },
    {
      icon: Tag,
      label: 'En oferta',
      value: products.filter((product) => product.compareAtPrice).length,
      hint: 'Con precio anterior',
    },
    {
      icon: PackageX,
      label: 'Con faltantes',
      value: products.filter((product) => (product.unavailableSizes?.length ?? 0) > 0).length,
      hint: 'Tienen alguna presentación sin stock',
    },
  ]

  return (
    <>
      <AdminPageHeader
        title="¡Hola!"
        description="Desde acá manejás todo lo que se ve en la tienda."
        actions={
          <ButtonLink to="/admin/productos/nuevo">
            <Plus className="size-4" />
            Nuevo producto
          </ButtonLink>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-card bg-white ring-1 ring-neutral-900/5">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <h2 className="font-semibold">Últimos productos</h2>
            <Link to="/admin/productos" className="text-sm text-neutral-500 hover:text-neutral-900">
              Ver todos
            </Link>
          </div>
          <ul className="divide-y divide-neutral-100">
            {products.slice(0, 5).map((product) => (
              <li key={product.id}>
                <Link
                  to={`/admin/productos/${product.id}`}
                  className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-neutral-50"
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    className="size-11 shrink-0 rounded-thumb bg-neutral-100 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-neutral-500">{formatPrice(product.price)}</p>
                  </div>
                  <StockBadge product={product} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-semibold">Accesos rápidos</h2>
          <QuickActionCard
            icon={Sparkles}
            title="Cargar un producto"
            description="Fotos, presentaciones, colores y precio"
            to="/admin/productos/nuevo"
          />
          <QuickActionCard
            icon={House}
            title="Editar el inicio"
            description="Banner, beneficios y categorías"
            to="/admin/inicio"
          />
          <QuickActionCard
            icon={Store}
            title="Datos de la tienda"
            description="Contacto, WhatsApp y redes"
            to="/admin/tienda"
          />
        </section>
      </div>
    </>
  )
}

export default Dashboard
