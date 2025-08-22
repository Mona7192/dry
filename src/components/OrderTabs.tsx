"use client";

import React, { useEffect, useState } from "react";
import LaundryTab from "./LaundryTab";
import SpecialOrdersTab from "@/components/services/CustomTab";


interface Category {
  id: number;
  name: string;
}

const OrderTabs: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<string>("special");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* تب‌ها */}
      <div className="flex space-x-4 mb-4">
        

        {/* دسته‌ها از API */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={` text-Gray-1 border border-Gray-2 rounded-3xl px-2.5 py-2 ${activeTab === String(cat.id) ? "bg-Secondary text-white border-none" : ""
              }`}
            onClick={() => setActiveTab(String(cat.id))}
          >
            {cat.name}
          </button>
        ))}

        {/* Special Orders */}
        <button
          className={`text-Gray-1 border border-Gray-2 rounded-3xl px-2.5 py-2 ${activeTab === "special" ? "bg-Secondary text-white border-none" : ""
            }`}
          onClick={() => setActiveTab("special")}
        >
          Custom Services
        </button>

      </div>

      {/* محتوای تب‌ها */}
      <div className="border border-Gray-2 p-5 rounded-2xl">
        {activeTab === "special" ? (
          <SpecialOrdersTab />
        ) : (
          <LaundryTab
            categoryId={Number(activeTab)}
            onSelectionChange={(selection) =>
              console.log("Order Summary Data:", selection)
            }
          />
        )}
      </div>
    </div>
  );
};

export default OrderTabs;