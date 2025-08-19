'use client';

import { useState } from 'react';

interface SubCategory {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
  options: string[];
  price: number;
}

interface LaundryOrderItem {
  serviceId: number;
  subCategoryId: number;
  options: string[];
  quantity: number;
  price: number;
}

interface Props {
  subCategory: SubCategory;
  services: Service[];
  onChange: (item: LaundryOrderItem) => void;
  order: LaundryOrderItem[];
}

export default function ServiceCategorySection({ subCategory, services, onChange, order }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const toggleOpen = (id: number) => setOpen(open === id ? null : id);

  const handleQuantityChange = (service: Service, qty: number, options: string[]) => {
    onChange({ serviceId: service.id, subCategoryId: subCategory.id, options, quantity: qty, price: service.price });
  };

  return (
    <div className="space-y-2">
      {services.map((service) => {
        const existing = order.find((i) => i.serviceId === service.id);
        const quantity = existing?.quantity || 0;
        const selectedOptions = existing?.options || [];

        return (
          <div key={service.id} className="border rounded p-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleOpen(service.id)}
            >
              <span>{service.name}</span>
              <span>${service.price}</span>
            </div>

            {open === service.id && (
              <div className="mt-2 space-y-2">
                {/* گزینه‌ها */}
                {service.options.map((opt) => (
                  <label key={opt} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(opt)}
                      onChange={(e) => {
                        const newOptions = e.target.checked
                          ? [...selectedOptions, opt]
                          : selectedOptions.filter((o) => o !== opt);
                        handleQuantityChange(service, quantity, newOptions);
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}

                {/* تعداد */}
                {quantity > 0 ? (
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      className="px-2 py-1 border"
                      onClick={() => handleQuantityChange(service, quantity - 1, selectedOptions)}
                      disabled={quantity <= 0}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="px-2 py-1 border"
                      onClick={() => handleQuantityChange(service, quantity + 1, selectedOptions)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleQuantityChange(service, 1, selectedOptions)}
                  >
                    Add Item
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}