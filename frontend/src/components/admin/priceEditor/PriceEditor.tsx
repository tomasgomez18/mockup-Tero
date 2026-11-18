import { useState } from 'react'
import Badge from '@/components/badge/Badge'
import Switch from '@/components/form/switch/Switch'
import TextField from '@/components/form/textField/TextField'
import { formatPrice, getDiscount } from '@/utils/price'

interface PriceValues {
  price: string
  onSale: boolean
  salePrice: string
}

interface PriceEditorProps extends PriceValues {
  priceError?: string
  salePriceError?: string
  onChange: (changes: Partial<PriceValues>) => void
}

function getPercent(regular: string, sale: string) {
  const regularPrice = Number(regular)
  const salePrice = Number(sale)
  return regularPrice > 0 && salePrice > 0 && salePrice < regularPrice
    ? String(getDiscount(salePrice, regularPrice))
    : ''
}

function applyPercent(regular: string, percent: string) {
  const regularPrice = Number(regular)
  const value = Number(percent)
  return regularPrice > 0 && value > 0 && value < 100
    ? String(Math.round(regularPrice * (1 - value / 100)))
    : ''
}

function PriceEditor({ price, onSale, salePrice, priceError, salePriceError, onChange }: PriceEditorProps) {
  const [percent, setPercent] = useState(() => getPercent(price, salePrice))
  const regularPrice = Number(price)
  const finalPrice = Number(salePrice)
  const hasValidOffer = onSale && finalPrice > 0 && finalPrice < regularPrice

  const handlePriceChange = (value: string) => {
    if (onSale && percent) onChange({ price: value, salePrice: applyPercent(value, percent) })
    else onChange({ price: value })
  }

  const handlePercentChange = (value: string) => {
    setPercent(value)
    onChange({ salePrice: applyPercent(price, value) })
  }

  const handleSalePriceChange = (value: string) => {
    setPercent(getPercent(price, value))
    onChange({ salePrice: value })
  }

  return (
    <div className="flex flex-col gap-5">
      <TextField
        label="Precio normal"
        type="number"
        inputMode="numeric"
        min={0}
        prefix="$"
        value={price}
        onChange={(event) => handlePriceChange(event.target.value)}
        placeholder="0"
        error={priceError}
      />

      <Switch
        label="En oferta"
        description="Muestra el precio anterior tachado y el % de descuento."
        checked={onSale}
        onChange={(checked) => onChange({ onSale: checked })}
      />

      {onSale && (
        <div className="flex flex-col gap-4 rounded-thumb bg-neutral-50 p-4">
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Descuento (%)"
              type="number"
              inputMode="numeric"
              min={1}
              max={90}
              value={percent}
              onChange={(event) => handlePercentChange(event.target.value)}
              placeholder="Ej: 20"
            />
            <TextField
              label="Precio final"
              type="number"
              inputMode="numeric"
              min={0}
              prefix="$"
              value={salePrice}
              onChange={(event) => handleSalePriceChange(event.target.value)}
              placeholder="0"
              error={salePriceError}
            />
          </div>
          <p className="text-xs text-neutral-500">Completá uno de los dos y el otro se calcula solo.</p>

          {hasValidOffer && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-neutral-200 pt-3">
              <span className="text-xs text-neutral-500">Así se ve:</span>
              <Badge variant="sale">-{getDiscount(finalPrice, regularPrice)}%</Badge>
              <span className="text-sm text-neutral-400 line-through">{formatPrice(regularPrice)}</span>
              <span className="text-sm font-semibold text-red-600">{formatPrice(finalPrice)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PriceEditor
