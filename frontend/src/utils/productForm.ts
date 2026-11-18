import { sizeOrder } from '@/data/filterOptions'
import type { Product } from '@/types/product'
import type { ProductFormErrors, ProductFormValues } from '@/types/productForm'
import { createId } from '@/utils/createId'

export function toFormValues(product?: Product): ProductFormValues {
  const onSale = Boolean(product?.compareAtPrice)
  return {
    slug: product?.slug ?? '',
    name: product?.name ?? '',
    category: product?.category ?? '',
    description: product?.description ?? '',
    price: product ? String(product.compareAtPrice ?? product.price) : '',
    onSale,
    salePrice: onSale && product ? String(product.price) : '',
    images: product?.images ?? [],
    colors: product?.colors ?? [{ name: 'Negro', hex: '#171717' }],
    sizes: product?.sizes ?? [],
    unavailableSizes: product?.unavailableSizes ?? [],
    details: product?.details ?? [],
    isNew: product ? Boolean(product.isNew) : true,
    isFeatured: Boolean(product?.isFeatured),
  }
}

export function sortSizes(sizes: string[]) {
  return [...sizes].sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
}

export function toProduct(values: ProductFormValues, id?: string): Product {
  const { onSale, salePrice, ...rest } = values
  const regularPrice = Number(values.price)
  const finalPrice = Number(salePrice)
  const hasOffer = onSale && finalPrice > 0 && finalPrice < regularPrice

  return {
    ...rest,
    id: id ?? createId(),
    name: values.name.trim(),
    slug: values.slug.trim(),
    category: values.category.trim(),
    description: values.description.trim(),
    price: hasOffer ? finalPrice : regularPrice,
    compareAtPrice: hasOffer ? regularPrice : undefined,
    colors: values.colors.map((color) => ({ ...color, name: color.name.trim() })),
    sizes: sortSizes(values.sizes),
    unavailableSizes: values.unavailableSizes.filter((size) => values.sizes.includes(size)),
    details: values.details.map((detail) => detail.trim()).filter(Boolean),
  }
}

export function validateProductForm(values: ProductFormValues, takenSlugs: string[]) {
  const errors: ProductFormErrors = {}
  const price = Number(values.price)
  const salePrice = Number(values.salePrice)

  if (!values.name.trim()) errors.name = 'Escribí el nombre del producto'
  if (!values.slug.trim()) errors.slug = 'El link no puede quedar vacío'
  else if (takenSlugs.includes(values.slug.trim())) errors.slug = 'Ya hay otro producto con este link'
  if (!values.category.trim()) errors.category = 'Elegí o escribí una categoría'
  if (!values.price || price <= 0) errors.price = 'Ingresá un precio mayor a 0'
  if (values.onSale) {
    if (!values.salePrice || salePrice <= 0) errors.salePrice = 'Ingresá el precio con descuento'
    else if (salePrice >= price) errors.salePrice = 'Tiene que ser menor al precio normal'
  }
  if (values.images.length === 0) errors.images = 'Subí al menos una foto'
  if (values.colors.length === 0) errors.colors = 'Agregá al menos un color'
  else if (values.colors.some((color) => !color.name.trim())) {
    errors.colors = 'Todos los colores necesitan un nombre'
  }
  if (values.sizes.length === 0) errors.sizes = 'Elegí al menos una presentación'

  return errors
}
