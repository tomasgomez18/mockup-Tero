import ButtonLink from '@/components/buttonLink/ButtonLink'

interface NotFoundProps {
  title?: string
  description?: string
}

function NotFound({
  title = 'Esta página no existe',
  description = 'Puede que el link esté mal escrito o que la página ya no esté disponible.',
}: NotFoundProps) {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:py-32">
      <p className="text-8xl font-semibold tracking-tighter text-neutral-200 sm:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-3 text-neutral-500">{description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Volver al inicio</ButtonLink>
        <ButtonLink to="/novedades" variant="outline">
          Ver novedades
        </ButtonLink>
      </div>
    </section>
  )
}

export default NotFound
