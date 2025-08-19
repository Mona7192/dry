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
  

  return (
    <div className="bg-white p-4 rounded-2xl border border-Gray-2">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>

      {/* آیتم‌های سفارش */}
      {orderItems.length > 0 && (
        <ul className="space-y-2">
          {orderItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>£{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

        {/* سفارش‌های خاص */}
      {customOrders.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Custom Orders</h3>
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
      <div className="mt-4 border-t pt-2 font-bold flex justify-between">
        <span>Total</span>
        <span>£{total().toFixed(2)}</span>
      </div>


      {/* دکمه تایید سفارش */}
      <button
        onClick={() => router.push("/book-order/book")}
        className="w-full bg-Secondary text-white rounded-lg py-3 font-medium hover:bg-primary transition"
      >
        Proceed to confirm order
      </button>

      {/* برگشت */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-600 hover:underline text-center w-full"
      >
        ← back to service selection
      </button>

    </div>
  );
};

export default PickupOrderSummary;
     
    
  
