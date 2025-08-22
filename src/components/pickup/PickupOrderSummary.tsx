"use client";

import React from "react";
import { useOrderStore } from "@/store/orderStore";
import { useCustomOrderStore } from "@/store/customOrderStore";
import { useRouter } from "next/navigation";

const PickupOrderSummary = () => {
  const { lines, total } = useOrderStore();
  const router = useRouter();
  const { customOrders } = useCustomOrderStore();

  const orderItems = Object.values(lines);

  // گروه‌بندی آیتم‌ها بر اساس دسته‌بندی اصلی
  const groupedByMainCategory = orderItems.reduce((acc: any, item: any) => {
    const mainCategory = item.mainCategory || "Other";
    if (!acc[mainCategory]) acc[mainCategory] = [];
    acc[mainCategory].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-Gray-2 shadow-sm">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h2>

      {/* آیتم‌های سفارش */}
      {orderItems.length > 0 ? (
        <div className="space-y-6 mb-4">
          {Object.entries(groupedByMainCategory).map(([mainCategory, categoryItems]: any) => (
            <div key={mainCategory}>
              {/* عنوان دسته‌بندی اصلی */}
              
              
              <ul className="divide-y divide-gray-200">
                {categoryItems.map((item: any) => (
                  <li key={item.id} className="py-3">
                    <div className="grid grid-cols-12 items-center gap-3">
                      {/* ستون جزئیات */}
                      <div className="col-span-6">
                        {item.categoryTitle && (
                          <p className="text-sm text-primary font-medium">{item.categoryTitle}</p>
                        )}
                        <p className="font-medium text-gray-900">{item.name}</p>
                      </div>

                      {/* ستون تعداد */}
                      <div className="col-span-3 text-center">
                        <span className="text-gray-600 font-medium">{item.quantity}</span>
                      </div>

                      {/* ستون قیمت */}
                      <div className="col-span-3 text-right">
                        <span className="font-semibold text-gray-800">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mb-4">No items in your order yet.</p>
      )}

      {/* سفارش‌های خاص */}
      {customOrders.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-gray-800">Custom Orders</h3>
          <ul className="space-y-1 text-sm">
            {customOrders.map((order) => (
              <li key={order.id}>
                <span className="font-medium">{order.subject}:</span>{" "}
                {order.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* جمع کل */}
      <div className="border-t pt-3 mt-3 flex justify-between font-bold text-gray-900 text-base">
        <span>Total</span>
        <span className="text-primary">£{total().toFixed(2)}</span>
      </div>

      {/* دکمه تایید سفارش */}
      <button
        onClick={() => router.push("/book-order/book")}
        disabled={orderItems.length === 0 && customOrders.length === 0}
        className={`w-full rounded-lg py-3 font-medium my-5 transition ${
          orderItems.length === 0 && customOrders.length === 0
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-primary text-white hover:bg-Secondary"
        }`}
      >
        Proceed to confirm order
      </button>

      {/* برگشت */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-600 hover:underline text-center w-full"
      >
        ← Back to service selection
      </button>
    </div>
  );
};

export default PickupOrderSummary;
