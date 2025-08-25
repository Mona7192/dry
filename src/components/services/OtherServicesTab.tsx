"use client"

import { useState } from "react"
import { useOrderStore } from "@/store/orderStore"
import { otherServicesCategories } from "@/data/other-services-data"

export default function OtherServicesTab() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({})
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({})

  const { lines, addItem, removeItem } = useOrderStore()

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  const handleVariantChange = (categoryId: string, variant: string) => {
    setSelectedVariants(prev => ({ ...prev, [categoryId]: variant }))
  }

  const handleOptionToggle = (categoryId: string, option: string) => {
    setSelectedOptions(prev => {
      const current = prev[categoryId] || []
      return {
        ...prev,
        [categoryId]: current.includes(option)
          ? current.filter(o => o !== option)
          : [...current, option],
      }
    })
  }

  return (
    <div className="space-y-4">
      {otherServicesCategories.map(category => (
        <div key={category.id} className="border rounded">
          {/* Header */}
          <button
            onClick={() => toggleCategory(category.id)}
            className="w-full text-left px-4 py-3 bg-gray-100 font-semibold"
          >
            {category.title}
          </button>

          {/* محتوا */}
          {expandedCategory === category.id && (
            <div className="p-4 space-y-4 bg-white">
              {/* سرویس‌ها */}
              <div className="flex gap-2 flex-wrap">
                {category.categories.map(variant => (
                  <button
                    key={variant}
                    onClick={() => handleVariantChange(category.id, variant)}
                    className={`px-3 py-1 border rounded-full text-sm ${selectedVariants[category.id] === variant
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>

              {/* گزینه‌ها */}
              <div className="flex flex-wrap gap-4">
                {category.options.map(option => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={(selectedOptions[category.id] || []).includes(option)}
                      onChange={() => handleOptionToggle(category.id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>

              {/* آیتم‌ها */}
              <div className="space-y-3 pt-2">
                {category.items.map(item => {
                  const itemId = `${category.id}_${item.id}_${selectedVariants[category.id] || ""}_${(selectedOptions[category.id] || []).join(",")}`
                  const current = lines[itemId]

                  return (
                    <div key={item.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">€{item.price.toFixed(2)}</div>
                      </div>

                      {current ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeItem(itemId)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{current.quantity}</span>
                          <button
                            onClick={() =>
                              addItem({
                                id: itemId,
                                name: item.name,
                                price: item.price,
                                serviceVariant: selectedVariants[category.id],
                                options: selectedOptions[category.id],
                              })
                            }
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            addItem({
                              id: itemId,
                              name: item.name,
                              price: item.price,
                              serviceVariant: selectedVariants[category.id],
                              options: selectedOptions[category.id],
                            })
                          }
                          className="text-sm px-3 py-1 bg-green-500 text-white rounded"
                        >
                          Add Item
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* توضیح دسته */}
              {category.note && (
                <p className="text-sm text-gray-500 pt-4 border-t">{category.note}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
