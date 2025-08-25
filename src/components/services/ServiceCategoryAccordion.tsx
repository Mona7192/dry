"use client"

import { useState } from "react"
import type { LaundryCategory, ServiceItem } from "@/data/services-data"
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react"
import { useOrderStore } from "@/store/orderStore"

type Props = {
  category: LaundryCategory
}

export default function ServiceCategoryAccordion({ category }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category.categories?.[0] ?? ""
  )
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const lines = useOrderStore((s) => s.lines)
  const addItem = useOrderStore((s) => s.addItem)
  const inc = useOrderStore((s) => s.inc)
  const dec = useOrderStore((s) => s.dec)

  const qty = (id: string) => lines[id]?.quantity || 0

  const toggleOption = (opt: string) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    )
  }

  const handleAdd = (item: ServiceItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      serviceVariant: selectedCategory,
      options: selectedOptions,
    })
  }

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-lg font-semibold">{category.title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && (
        <div className="p-4 space-y-5">
          {/* دسته‌بندی‌های بالا */}
          {category.categories?.length ? (
            <div className="flex flex-wrap gap-2">
              {category.categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1 text-sm rounded-full border transition ${selectedCategory === c
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white hover:bg-green-50"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          ) : null}

          {/* چک‌باکس‌ها */}
          {category.options?.length ? (
            <div className="flex flex-wrap gap-4">
              {category.options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(opt)}
                    onChange={() => toggleOption(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : null}

          {/* لیست آیتم‌ها */}
          <div className="space-y-3">
            {category.items.map((item) => {
              const q = qty(item.id)
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between border rounded-lg p-3 ${q ? "border-green-500 bg-green-50" : ""
                    }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>

                  {q === 0 ? (
                    <button
                      onClick={() => handleAdd(item)}
                      className="px-3 py-1 rounded-md bg-green-600 text-white text-sm hover:bg-green-700"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                        onClick={() => dec(item.id)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-sm font-medium">{q} Item</span>
                      <button
                        className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
                        onClick={() => inc(item.id)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* توضیح پایین */}
          {category.note && (
            <p className="text-xs text-gray-500 leading-relaxed border-t pt-3">
              {category.note}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
