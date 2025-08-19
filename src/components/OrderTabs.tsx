"use client";

import React, { useEffect, useState } from "react";
import LaundryTab from "./LaundryTab";
import SpecialOrdersTab from "@/components/services/CustomTab";

// const baseURL = "http://localhost:8000"; // تغییر بده به آدرس بک‌اند خودت

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`);
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
      <div className="flex space-x-4 border-b mb-4">
        {/* Special Orders */}
        <button
          className={`pb-2 ${
            activeTab === "special" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("special")}
        >
          Special Orders
        </button>

        {/* دسته‌ها از API */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`pb-2 ${
              activeTab === String(cat.id) ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab(String(cat.id))}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* محتوای تب‌ها */}
      <div>
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