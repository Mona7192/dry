"use client";

import React, { useEffect, useState } from "react";

const baseURL = "http://localhost:8000"; // تغییر بده به بک‌اند خودت

interface Service {
  id: number;
  name: string;
  price: string;
}

interface SubCategory {
  id: number;
  name: string;
  services: Service[];
}

interface Category {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

interface LaundryTabProps {
  categoryId: number;
  onSelectionChange: (selection: any) => void;
}

const LaundryTab: React.FC<LaundryTabProps> = ({
  categoryId,
  onSelectionChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, subsRes, servicesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`).then((r) => r.json()),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/sub-categories`).then((r) => r.json()),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`).then((r) => r.json()),
        ]);

        const structured: Category[] = catsRes
          .filter((c: any) => c.id === categoryId)
          .map((cat: any) => {
            const subCats = subsRes
              .filter((s: any) => s.category_id === cat.id)
              .map((sub: any) => ({
                ...sub,
                services: servicesRes.filter(
                  (srv: any) => srv.sub_category_id === sub.id
                ),
              }));

            return { ...cat, subCategories: subCats };
          });

        setCategories(structured);
      } catch (error) {
        console.error("Error fetching laundry data", error);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleQuantityChange = (
    subCatId: number,
    service: Service,
    change: number
  ) => {
    setSelected((prev: any) => {
      const currentQty = prev[subCatId]?.[service.id]?.quantity || 0;
      const newQty = Math.max(0, currentQty + change);

      const updated = {
        ...prev,
        [subCatId]: {
          ...prev[subCatId],
          [service.id]: {
            ...service,
            quantity: newQty,
          },
        },
      };

      onSelectionChange(updated);
      return updated;
    });
  };

  return (
    <div>
      {categories.map((cat) => (
        <div key={cat.id}>
          {cat.subCategories.map((sub) => (
            <div key={sub.id} className="border p-4 mb-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">{sub.name}</h3>
              {sub.services.map((srv) => {
                const quantity = selected[sub.id]?.[srv.id]?.quantity || 0;
                return (
                  <div
                    key={srv.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <div>
                      <p>{srv.name}</p>
                      <p className="text-sm text-gray-500">
                        ${srv.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {quantity === 0 ? (
                        <button
                          onClick={() => handleQuantityChange(sub.id, srv, 1)}
                          className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          Add Item
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(sub.id, srv, -1)
                            }
                            className="px-2 py-1 bg-gray-300 rounded"
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(sub.id, srv, 1)
                            }
                            className="px-2 py-1 bg-gray-300 rounded"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LaundryTab;