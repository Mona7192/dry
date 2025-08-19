"use client"

import { useState } from "react"
import { laundryCategories } from "@/data/services-data"
import { useOrderStore } from "@/store/orderStore"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid"

export default function LaundryTab() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({})
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({})
  const order = useOrderStore()

  const toggleOption = (catId: string, option: string) => {
    const current = selectedOptions[catId] || []
    const updated = current.includes(option)
      ? current.filter(o => o !== option)
      : [...current, option]
    setSelectedOptions({ ...selectedOptions, [catId]: updated })
  }

  return (
    <div className="flex flex-col gap-4">
      {laundryCategories.map(category => {
        const isOpen = openCategory === category.id
        return (
          <div key={category.id} className="border rounded">
            {/* Header */}
            <button
              onClick={() => setOpenCategory(isOpen ? null : category.id)}
              className="w-full flex justify-between items-center px-4 py-3 bg-gray-100"
            >
              <span className="text-lg font-medium">{category.title}</span>
              <span>{isOpen ? "−" : "+"}</span>
            </button>

            {/* Content */}
            {isOpen && (
              <div className="px-4 py-4 space-y-4">
                {/* تب دسته‌بندی (Clean & Iron و ...) */}
                <div className="flex gap-2 flex-wrap">
                  {category.categories.map(variant => (
                    <button
                      key={variant}
                      onClick={() =>
                        setSelectedVariants({ ...selectedVariants, [category.id]: variant })
                      }
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectedVariants[category.id] === variant
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>

                {/* چک لیست گزینه‌ها (Folded، On Hanger و ...) */}
                <div className="flex gap-4 flex-wrap">
                  {category.options.map(option => (
                    <label key={option} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedOptions[category.id]?.includes(option) || false}
                        onChange={() => toggleOption(category.id, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {/* لیست آیتم‌ها */}
                <div className="space-y-4">
                  {category.items.map(item => {
                    const current = order.lines[item.id]
                    return (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-500 text-sm">£{item.price.toFixed(2)}</div>
                        </div>

                        <div>
                          {current ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => order.removeItem(item.id)}
                                className="p-1 bg-gray-200 rounded"
                              >
                                <MinusIcon className="w-4 h-4" />
                              </button>
                              <span>{current.quantity}</span>
                              <button
                                onClick={() =>
                                  order.addItem({
                                    ...item,
                                    serviceVariant: selectedVariants[category.id],
                                    options: selectedOptions[category.id],
                                  })
                                }
                                className="p-1 bg-gray-200 rounded"
                              >
                                <PlusIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                order.addItem({
                                  ...item,
                                  serviceVariant: selectedVariants[category.id],
                                  options: selectedOptions[category.id],
                                })
                              }
                              className="text-green-600 underline text-sm"
                            >
                              Add Item
                            </button>
                          )}
                        </div>
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
