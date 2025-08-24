import React, { useState } from "react";

interface ServiceItem {
  name: string;
  price: number;
}

interface ServiceCategoryProps {
  title: string;
  categories: string[];
  options: string[];
  items: ServiceItem[];
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({
  title,
  categories = [],
  options = [],
  items = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories.length > 0 ? categories[0] : ""
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  return (
    <div className="border p-4 rounded-xl shadow-sm bg-white mb-6">
      {/* عنوان دسته */}
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      {/* دکمه‌های انتخاب سرویس (Clean & Iron, Iron Only, Child) */}
      <div className="flex gap-2 mb-3">
        {categories.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(btn)}
            className={`px-3 py-1 border rounded-md text-sm transition 
              ${selectedCategory === btn ? "bg-green-500 text-white" : "hover:bg-green-100"}`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* چک‌باکس‌ها */}
      <div className="flex gap-3 mb-4">
        {options.map((opt, idx) => (
          <label key={idx} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={selectedOptions.includes(opt)}
              onChange={() => toggleOption(opt)}
              className="accent-green-500"
            />
            {opt}
          </label>
        ))}
      </div>

      {/* لیست آیتم‌ها */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-2 border rounded-lg"
          >
            <span>{item.name}</span>
            <span className="font-bold text-green-600">£{item.price}</span>
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;
