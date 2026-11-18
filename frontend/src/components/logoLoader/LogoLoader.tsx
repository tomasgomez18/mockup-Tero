import { useStoreContent } from '@/hooks/useStoreContent'
import { cn } from '@/utils/cn'

interface LogoLoaderProps {
  size?: 'md' | 'lg'
  label?: string
}

const textSizes = {
  md: 'text-2xl',
  lg: 'text-3xl sm:text-4xl',
}

function LogoLoader({ size = 'md', label = 'Cargando' }: LogoLoaderProps) {
  const { storeInfo } = useStoreContent()

  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-5">
      <div
        className={cn(
          'relative font-semibold uppercase tracking-[0.25em] select-none',
          textSizes[size],
        )}
      >
        <span className="text-neutral-200">{storeInfo.name}</span>
        <span aria-hidden="true" className="absolute inset-0 animate-logo-fill text-neutral-900">
          {storeInfo.name}
        </span>
      </div>
      <div className="relative h-0.5 w-24 overflow-hidden rounded-full bg-neutral-200">
        <span className="absolute inset-y-0 left-0 w-1/2 animate-loader-bar rounded-full bg-brand-600" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default LogoLoader
