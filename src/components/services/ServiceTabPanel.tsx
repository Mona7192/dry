// components/services/ServiceTabPanel.tsx
"use client";

import { useState } from "react";

const categories = ["Clean & Iron", "Iron Only", "Child"];
const options = ["Hanger", "Folded"];

const items = [
  { id: 1, name: "T-Shirt", price: 2 },
  { id: 2, name: "Shirt", price: 2.5 },
  { id: 3, name: "Pants", price: 3 },
];

export function ServiceTabPanel() {
  const [selectedCategory, setSelectedCategory] = useState("Clean & Iron");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [itemCounts, setItemCounts] = useState<Record<number, number>>({});

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const increaseCount = (id: number) => {
    setItemCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseCount = (id: number) => {
    setItemCounts((prev) => {
      const newCount = (prev[id] || 0) - 1;
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  };

  return (
    <div className="space-y-6">
      {/* دسته‌بندی‌ها */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* چک‌باکس‌ها */}
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => toggleOption(option)}
            />
            {option}
          </label>
        ))}
      </div>

      {/* لیست آیتم‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {itemCounts[item.id] ? (
                <>
                  <button
                    onClick={() => decreaseCount(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    −
                  </button>
                  <span>{itemCounts[item.id]}</span>
                  <button
                    onClick={() => increaseCount(item.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </>
              ) : (
                <button
                  onClick={() => increaseCount(item.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* توضیح پایینی */}
      <p className="text-sm text-gray-500">
        Prices may vary based on item type and selected options.
      </p>
    </div>
  );
}
