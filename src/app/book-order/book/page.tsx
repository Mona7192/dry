
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useOrderStore } from "@/store/orderStore";
import { useCustomOrderStore } from "@/store/customOrderStore";
import { usePickupDeliveryStore } from "@/store/pickupDeliveryStore";
import OrderSteps from "@/components/order/OrderSteps";

export default function BookOrderPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const lines = useOrderStore((s) => s.lines);
  const totalFn = useOrderStore((s) => s.total);
  const customOrders = useCustomOrderStore((s) => s.customOrders);
  const pickupStore = usePickupDeliveryStore();

  const orderItems = useMemo(() => Object.values(lines), [lines]);
  const total = totalFn();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleConfirm = async () => {
    setError(null);

    const payload = {
      orderItems,
      customOrders,
      pickupDelivery: {
        postalCode: pickupStore.postalCode,
        fullAddress: pickupStore.fullAddress,
        driverNote: pickupStore.driverNote,
        pickupDate: pickupStore.pickupDate,
        pickupTime: pickupStore.pickupTime,
        deliveryDate: pickupStore.deliveryDate,
        deliveryTime: pickupStore.deliveryTime,
      },
      total,
    };
    console.log(payload);

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      console.log("Response:", res);
      console.log("Data:", data);

      if (!res.ok) {
        const msg = data?.message || `Server returned ${res.status}`;
        setError(msg);
        return;
      }

      if (data?.success) {
        setSuccessMessage(data?.message || "سفارش شما با موفقیت به ادمین ارسال شد.");
        setSuccessModal(true);
      } else {
        setError("Order submission failed on server side.");
      }
    } catch (err: any) {
      setError(err?.message || "خطای شبکه");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 bg-light">
      <OrderSteps />

      <div className="flex flex-row justify-between items-start">
        <div className="basis-4/5">
          <h1 className="text-2xl font-bold mb-4">Short information::</h1>
          <p className="pb-4">Please review all details, and if everything looks correct, confirm your order</p>
        </div>
        <div className="basis-1/5 flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={loading || (orderItems.length === 0 && customOrders.length === 0)}
            className={`py-2 px-6 rounded text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>

      <div className="flex border rounded-3xl p-4 mb-6 bg-white">
        <div className="basis-2/3 overflow-x-auto">
        <h5 className="font-bold text-xl py-2.5">Your selected service :</h5>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Service</th>
                <th className="py-2 px-4">Item</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((it) => (
                <tr key={it.id} className="border-b">
                  <td className="py-2 px-4">{it.categoryTitle || "Service"}</td>
                  <td className="py-2 px-4">{it.name}</td>
                  <td className="py-2 px-4">{it.quantity}</td>
                  <td className="py-2 px-4 font-semibold">
                    {typeof it.price === "number" ? `£${(it.price * it.quantity).toFixed(2)}` : <span className="text-orange-500">To be confirmed</span>}
                  </td>
                </tr>
              ))}

              {customOrders.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="py-2 px-4">Custom</td>
                  <td className="py-2 px-4">{c.subject}</td>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4 text-orange-500">To be confirmed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="basis-1/3 justify-between items-center mt-4 px-4 border-l ml-2.5">
          <div>
            <p>Total Item: {orderItems.reduce((s, it) => s + it.quantity, 0) + customOrders.length}</p>
            <p className="text-xl font-semibold">Total Price: £{total.toFixed(2)}</p>
          </div>
          {customOrders.length > 0 && (
            <div className="mt-4 bg-orange-50 border border-orange-300 text-orange-700 p-3 rounded">
              {customOrders.length} custom services — Their prices will be calculated after inspection and paid upon pickup.
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-3xl p-4 mb-6 bg-white">
        <h5 className="font-bold text-xl py-2.5">Pickup & Delivery:</h5>
        <div className="grid md:grid-cols-3 gap-4 ">
          <div className="md:border-r border-r-Gray-2">
            <h4 className="font-semibold mb-2">Address:</h4>
            <div className="flex">
              <div className="basis-1/2">
                <span className="font-bold text-primary">Postcode</span>
                <p className="text-sm">{pickupStore.postalCode || "-"}</p>
              </div>
              <div className="basis-1/2">
                <span className="font-bold text-primary">Full address</span>
                <p className="text-sm">{pickupStore.fullAddress || "-"}</p>
              </div>
            </div>
          </div>

          <div className="md:border-r md:border-r-Gray-2">
            <h4 className="font-semibold mb-2">Pickup Details:</h4>
            <div className="flex">
              <div className="basis-1/2">
                <span className="font-bold text-primary">pickupDate</span>
                <p className="text-sm">{pickupStore.pickupDate || "-"}</p>
              </div>
              <div className="basis-1/2">
                <span className="font-bold text-primary">pickupTime</span>
                <p className="text-sm">{pickupStore.pickupTime || "-"}</p>
              </div>
            </div>
            
            
          </div>

          <div>
            <h4 className="font-semibold mb-2">Delivery Details:</h4>
            <div className="flex">
              <div className="basis-1/2">
                <span className="font-bold text-primary">deliveryDate</span>
                <p className="text-sm">{pickupStore.deliveryDate || "-"}</p>
              </div>
              <div className="basis-1/2">
                <span className="font-bold text-primary">deliveryTime</span>
                <p className="text-sm">{pickupStore.deliveryTime || "-"}</p>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="flex gap-3">
        <button onClick={() => router.back()} className="py-2 px-6 rounded border">
          ← Back
        </button>
      </div>

      {successModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-green-600 mb-3">Order Submitted 🎉</h2>
            <p className="text-gray-700 mb-4">{successMessage || "سفارش شما با موفقیت به ادمین ارسال شد."}</p>
            <button
              onClick={() => {
                setSuccessModal(false);
                useOrderStore.getState().resetOrders();
                useCustomOrderStore.getState().resetOrders();
                router.push("/");
              }}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}