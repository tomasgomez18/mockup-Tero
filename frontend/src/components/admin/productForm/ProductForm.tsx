import { useState, type FormEvent } from 'react'
import ColorsEditor from '@/components/admin/colorsEditor/ColorsEditor'
import ImageUploader from '@/components/admin/imageUploader/ImageUploader'
import ListEditor from '@/components/admin/listEditor/ListEditor'
import PriceEditor from '@/components/admin/priceEditor/PriceEditor'
import SizesEditor from '@/components/admin/sizesEditor/SizesEditor'
import Button from '@/components/button/Button'
import FormSection from '@/components/form/formSection/FormSection'
import Switch from '@/components/form/switch/Switch'
import TextArea from '@/components/form/textArea/TextArea'
import TextField from '@/components/form/textField/TextField'
import { showToast } from '@/state/toastStore'
import type { Product } from '@/types/product'
import type { ProductFormErrors, ProductFormValues } from '@/types/productForm'
import { toFormValues, toProduct, validateProductForm } from '@/utils/productForm'
import { slugify } from '@/utils/text'

interface ProductFormProps {
  initialProduct?: Product
  categories: string[]
  takenSlugs: string[]
  onSubmit: (product: Product) => void
  onCancel: () => void
}

function ProductForm({ initialProduct, categories, takenSlugs, onSubmit, onCancel }: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(() => toFormValues(initialProduct))
  const [errors, setErrors] = useState<ProductFormErrors>({})
  const [slugEdited, setSlugEdited] = useState(Boolean(initialProduct))

  const setField = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleNameChange = (name: string) => {
    setValues((prev) => ({ ...prev, name, slug: slugEdited ? prev.slug : slugify(name) }))
    setErrors((prev) => ({ ...prev, name: undefined, slug: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validation = validateProductForm(values, takenSlugs)
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      showToast('Revisá los campos marcados en rojo', 'error')
      return
    }
    onSubmit(toProduct(values, initialProduct?.id))
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start"
    >
      <div className="flex flex-col gap-6">
        <FormSection title="Información">
          <TextField
            label="Nombre"
            value={values.name}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="Ej: Set de Vasos x6"
            error={errors.name}
          />
          <TextField
            label="Link del producto"
            value={values.slug}
            onChange={(event) => {
              setSlugEdited(true)
              setField('slug', slugify(event.target.value))
            }}
            hint={`Se va a ver en: /producto/${values.slug || 'nombre-del-producto'}`}
            error={errors.slug}
          />
          <TextArea
            label="Descripción"
            value={values.description}
            onChange={(event) => setField('description', event.target.value)}
            placeholder="Contá cómo es el producto y para qué se usa."
          />
        </FormSection>

        <FormSection
          title="Fotos"
          description="La primera es la principal. La segunda se muestra al pasar el mouse en la tienda."
          error={errors.images}
        >
          <ImageUploader images={values.images} onChange={(images) => setField('images', images)} />
        </FormSection>

        <FormSection title="Colores" error={errors.colors}>
          <ColorsEditor colors={values.colors} onChange={(colors) => setField('colors', colors)} />
        </FormSection>

        <FormSection title="Presentaciones y stock" error={errors.sizes}>
          <SizesEditor
            sizes={values.sizes}
            unavailableSizes={values.unavailableSizes}
            onChange={(sizes, unavailableSizes) => {
              setValues((prev) => ({ ...prev, sizes, unavailableSizes }))
              setErrors((prev) => ({ ...prev, sizes: undefined }))
            }}
          />
        </FormSection>

        <FormSection title="Características" description="Se muestra en el detalle del producto.">
          <ListEditor
            items={values.details}
            onChange={(details) => setField('details', details)}
            addLabel="Agregar dato"
            placeholder="Ej: 100% algodón"
          />
        </FormSection>
      </div>

      <div className="flex flex-col gap-6 lg:sticky lg:top-6">
        <FormSection title="Precio">
          <PriceEditor
            price={values.price}
            onSale={values.onSale}
            salePrice={values.salePrice}
            priceError={errors.price}
            salePriceError={errors.salePrice}
            onChange={(changes) => {
              setValues((prev) => ({ ...prev, ...changes }))
              setErrors((prev) => ({ ...prev, price: undefined, salePrice: undefined }))
            }}
          />
        </FormSection>

        <FormSection title="Organización">
          <TextField
            label="Categoría"
            value={values.category}
            onChange={(event) => setField('category', event.target.value)}
            suggestions={categories}
            placeholder="Ej: Bazar"
            hint="Elegí una existente o escribí una nueva."
            error={errors.category}
          />
        </FormSection>

        <FormSection title="Visibilidad">
          <Switch
            label="Nuevo"
            description="Muestra la etiqueta y lo suma a Novedades."
            checked={Boolean(values.isNew)}
            onChange={(checked) => setField('isNew', checked)}
          />
          <Switch
            label="Destacado"
            description="Aparece en el carrusel de Destacados del inicio."
            checked={Boolean(values.isFeatured)}
            onChange={(checked) => setField('isFeatured', checked)}
          />
        </FormSection>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">
            {initialProduct ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ProductForm
