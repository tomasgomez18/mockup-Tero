import { useState, type DragEvent, type KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, ImagePlus, LoaderCircle, Trash2 } from 'lucide-react'
import Badge from '@/components/badge/Badge'
import Button from '@/components/button/Button'
import { showToast } from '@/state/toastStore'
import { cn } from '@/utils/cn'
import { fieldClass } from '@/utils/fieldStyles'
import { isImageFile, resizeImage } from '@/utils/imageFile'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  max?: number
}

const actionClass =
  'flex size-8 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-40'

function ImageUploader({ images, onChange, max = 8 }: ImageUploaderProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)

  const addFiles = async (fileList: FileList | null) => {
    const files = [...(fileList ?? [])].filter(isImageFile).slice(0, max - images.length)
    if (files.length === 0) return
    setLoading(true)
    try {
      const uploaded = await Promise.all(files.map((file) => resizeImage(file)))
      onChange([...images, ...uploaded])
    } catch {
      showToast('No se pudo cargar alguna de las fotos', 'error')
    } finally {
      setLoading(false)
    }
  }

  const move = (from: number, to: number) => {
    const next = [...images]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  const remove = (index: number) => onChange(images.filter((_, i) => i !== index))

  const addUrl = () => {
    const value = url.trim()
    if (!value) return
    onChange([...images, value])
    setUrl('')
  }

  const handleUrlKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addUrl()
    }
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragging(false)
    addFiles(event.dataTransfer.files)
  }

  return (
    <div className="flex flex-col gap-4">
      {images.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <li
              key={`${index}-${image.slice(-32)}`}
              className="relative aspect-[3/4] overflow-hidden rounded-thumb bg-neutral-100 ring-1 ring-neutral-900/10"
            >
              <img src={image} alt={`Foto ${index + 1}`} className="size-full object-cover" />
              {index === 0 && (
                <Badge variant="dark" className="absolute top-2 left-2">
                  Principal
                </Badge>
              )}
              <div className="absolute inset-x-2 bottom-2 flex items-center justify-between">
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Mover a la izquierda"
                    disabled={index === 0}
                    onClick={() => move(index, index - 1)}
                    className={actionClass}
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Mover a la derecha"
                    disabled={index === images.length - 1}
                    onClick={() => move(index, index + 1)}
                    className={actionClass}
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Quitar foto"
                  onClick={() => remove(index)}
                  className={cn(actionClass, 'hover:text-red-600')}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {images.length < max && (
        <label
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex cursor-pointer flex-col items-center gap-2 rounded-card border-2 border-dashed px-4 py-8 text-center transition-colors',
            dragging ? 'border-brand-600 bg-neutral-100' : 'border-neutral-300 hover:border-neutral-500',
          )}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => {
              addFiles(event.target.files)
              event.target.value = ''
            }}
          />
          {loading ? (
            <LoaderCircle className="size-6 animate-spin text-neutral-500" />
          ) : (
            <ImagePlus className="size-6 text-neutral-500" />
          )}
          <span className="text-sm font-medium text-neutral-900">
            {loading ? 'Procesando fotos…' : 'Arrastrá fotos acá o hacé clic para subirlas'}
          </span>
          <span className="text-xs text-neutral-500">
            JPG, PNG o WEBP. Se achican automáticamente. Máximo {max} fotos.
          </span>
        </label>
      )}

      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={handleUrlKeyDown}
          placeholder="O pegá el link de una imagen"
          aria-label="Link de una imagen"
          className={fieldClass}
        />
        <Button variant="outline" onClick={addUrl} disabled={!url.trim()}>
          Agregar
        </Button>
      </div>
    </div>
  )
}

export default ImageUploader
