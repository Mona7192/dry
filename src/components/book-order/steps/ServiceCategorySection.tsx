'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Item = {
  id: string
  name: string
  price: number
  description?: string
}

type Props = {
  categoryName: string
  items: Item[]
  description?: string
}

export default function ServiceCategorySection({ categoryName, items, description }: Props) {
  const [open, setOpen] = useState(false)
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({})

  const toggleCategory = () => setOpen(!open)

  const increase = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const decrease = (id: string) => {
    setQuantities((prev) => {
      const current = prev[id] || 0
      if (current <= 1) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: current - 1 }
    })
  }

  return (
    <div className="border rounded-xl p-4 mb-4">
      <button
        className="w-full flex justify-between items-center text-lg font-semibold"
        onClick={toggleCategory}
      >
        {categoryName}
        {open ? <Minus size={20} /> : <Plus size={20} />}
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {items.map((item) => {
            const quantity = quantities[item.id] || 0

            return (
              <div
                key={item.id}
                className={`p-3 border rounded-lg flex justify-between items-center ${
                  quantity ? 'bg-green-50 border-green-500' : ''
                }`}
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">£{item.price.toFixed(2)}</div>
                </div>

                {quantity ? (
                  <div className="flex items-center gap-2">
                    <Button size="icon" onClick={() => decrease(item.id)} variant="ghost">
                      <Minus size={16} />
                    </Button>
                    <span className="text-sm">{quantity} Item</span>
                    <Button size="icon" onClick={() => increase(item.id)} variant="ghost">
                      <Plus size={16} />
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => increase(item.id)}>Add</Button>
                )}
              </div>
            )
          })}

          {description && (
            <p className="text-xs text-muted-foreground border-t pt-3 mt-3">{description}</p>
          )}
        </div>
      )}
    </div>
  )
}
