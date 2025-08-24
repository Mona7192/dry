"use client"

import { useState } from "react"
import { beddingCategories } from "@/data/duvet-bedding-data"
import { useOrderStore } from "@/store/orderStore"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid"

export default function BeddingTab() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})

  const { lines, addItem, removeItem } = useOrderStore()

  const toggleCategory = (id: string) => {
    setActiveCategory(prev => (prev === id ? null : id))
  }

  const handleVariantChange = (categoryId: string, variant: string) => {
    setSelectedVariants(prev => ({ ...prev, [categoryId]: variant }))
  }

  const handleOptionToggle = (categoryId: string, option: string) => {
    const current = selectedOptions[categoryId] || []
    const exists = current.includes(option)
    const updated = exists
      ? current.filter(opt => opt !== option)
      : [...current, option]
    setSelectedOptions(prev => ({ ...prev, [categoryId]: updated }))
  }

  return (
    <div className="flex flex-col gap-4">
      {beddingCategories.map(category => {
        const isActive = activeCategory === category.id
        const selectedVariant = selectedVariants[category.id] || category.categories[0]
        const selectedOptionList = selectedOptions[category.id] || []

        return (
          <div key={category.id} className="border rounded-md">
            <button
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-100 font-semibold"
              onClick={() => toggleCategory(category.id)}
            >
              <span>{category.title}</span>
              <span>{isActive ? "−" : "+"}</span>
            </button>

            {isActive && (
              <div className="p-4 flex flex-col gap-4">
                {/* تب دسته‌بندی (مثل Clean & Iron) */}
                <div className="flex gap-2">
                  {category.categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleVariantChange(category.id, cat)}
                      className={`px-3 py-1 rounded-full text-sm ${selectedVariant === cat
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* چک‌لیست گزینه‌ها */}
                <div className="flex gap-4 flex-wrap">
                  {category.options.map(option => (
                    <label key={option} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedOptionList.includes(option)}
                        onChange={() => handleOptionToggle(category.id, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {/* لیست آیتم‌ها */}
                <div className="space-y-4">
                  {category.items.map(item => {
                    const current = lines[item.id]
                    const quantity = current?.quantity || 0

                    return (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">€ {item.price.toFixed(2)}</div>
                        </div>

                        {quantity === 0 ? (
                          <button
                            onClick={() =>
                              addItem({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                categoryTitle: category.title,
                                serviceVariant: selectedVariant,
                                options: selectedOptionList,
                              })
                            }
                            className="mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md"
                          >
                            Add Item
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="text-sm">{quantity}</span>
                            <button
                              onClick={() =>
                                addItem({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  categoryTitle: category.title,
                                  serviceVariant: selectedVariant,
                                  options: selectedOptionList,
                                })
                              }
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
