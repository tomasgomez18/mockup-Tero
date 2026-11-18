import { useState } from 'react'
import { ImagePlus, LoaderCircle } from 'lucide-react'
import { showToast } from '@/state/toastStore'
import { cn } from '@/utils/cn'
import { fieldClass } from '@/utils/fieldStyles'
import { isImageFile, resizeImage } from '@/utils/imageFile'

interface SingleImageFieldProps {
  label: string
  value: string
  onChange: (image: string) => void
  previewClassName?: string
  maxSize?: number
}

function SingleImageField({
  label,
  value,
  onChange,
  previewClassName,
  maxSize = 1000,
}: SingleImageFieldProps) {
  const [loading, setLoading] = useState(false)

  const handleFile = async (file?: File) => {
    if (!file || !isImageFile(file)) return
    setLoading(true)
    try {
      onChange(await resizeImage(file, maxSize))
    } catch {
      showToast('No se pudo cargar la foto', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-neutral-900">{label}</span>
      <label
        className={cn(
          'group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-thumb bg-neutral-100 ring-1 ring-neutral-900/10',
          previewClassName ?? 'aspect-video',
        )}
      >
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            handleFile(event.target.files?.[0])
            event.target.value = ''
          }}
        />
        {value && <img src={value} alt="" className="absolute inset-0 size-full object-cover" />}
        <span
          className={cn(
            'relative flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm transition-opacity',
            value && 'opacity-0 group-hover:opacity-100',
            loading && 'opacity-100',
          )}
        >
          {loading ? <LoaderCircle className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
          {value ? 'Cambiar foto' : 'Subir foto'}
        </span>
      </label>
      <input
        type="url"
        value={value.startsWith('data:') ? '' : value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={value.startsWith('data:') ? 'Foto subida desde tu dispositivo' : 'O pegá el link de una imagen'}
        aria-label={`Link de ${label.toLowerCase()}`}
        className={cn(fieldClass, 'h-9 text-xs')}
      />
    </div>
  )
}

export default SingleImageField
