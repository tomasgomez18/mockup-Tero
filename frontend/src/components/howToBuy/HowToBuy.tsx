import { CreditCard, MousePointerClick, Store, Truck } from 'lucide-react'

const steps = [
  { icon: MousePointerClick, title: 'Elegí tus productos', text: 'Sumá lo que necesites al carrito, por unidad o por cantidad.' },
  { icon: CreditCard, title: 'Pagá online o en el local', text: 'Mercado Pago, tarjeta, transferencia o efectivo al retirar.' },
  { icon: Store, title: 'Retirá en el local', text: 'Pasá a buscar tu pedido en el horario que elijas, sin costo.' },
  { icon: Truck, title: 'O recibilo en tu casa', text: 'Hacemos envíos a todo el país a tu negocio o domicilio.' },
]

function HowToBuy() {
  return (
    <section className="rounded-card bg-brand-50 p-6 ring-1 ring-brand-100 sm:p-10">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">¿Cómo comprar en TERO?</h2>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-brand-600 text-white">
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-bold text-brand-600">Paso {index + 1}</span>
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-neutral-600">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default HowToBuy
