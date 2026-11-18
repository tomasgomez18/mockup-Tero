const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
  return formatter.format(value)
}

export function getDiscount(price: number, compareAtPrice: number) {
  return Math.round((1 - price / compareAtPrice) * 100)
}
