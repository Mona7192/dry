"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { isTokenExpired } from '@/utils/jwt';

import { useOrderStore } from "@/store/orderStore";
import { useCustomOrderStore } from "@/store/customOrderStore";
import { usePickupDeliveryStore } from "@/store/pickupDeliveryStore";
import OrderSteps from "@/components/order/OrderSteps";

import { useUserStore } from "@/store/userStore";


export default function BookOrderPage() {
  const router = useRouter();

  const lines = useOrderStore((s) => s.lines);
  const totalFn = useOrderStore((s) => s.total);
  const customOrders = useCustomOrderStore((s) => s.customOrders);
  const pickupStore = usePickupDeliveryStore();

  const services = useMemo(() => Object.values(lines), [lines]);
  const total = totalFn();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState(false);


  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // یا نمایش AuthModal
    }
  }, [isAuthenticated, router]);

  const handleConfirm = async () => {
    setError(null);


    if (!isAuthenticated || !user) {
      setError("Please login to continue");
      router.push('/login');
      return;
    }
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      setError("Authentication token not found. Please login again.");
      router.push('/login');
      return;
    }

    const payload = {
      services,
      customOrders,
      pickupDelivery: { /* ... بقیه فیلدها ... */ },
      total,
      userId: user.id, // اضافه کردن userId
    };

    try {
      setLoading(true);
      console.log("🔑 token:", token);
      console.log("👤 user:", user);
      console.log("📦 payload:", JSON.stringify(payload, null, 2));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      const endpoint = `${apiUrl}/orders-user`;
      // const endpoint = "/api/orders-user";

      console.log("🌐 Sending to:", endpoint);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 Response status:", res.status);
      console.log("📡 Response headers:", res.headers);

      if (res.status === 302) {
        console.log("🔄 Redirect detected");
        setError("Authentication required. Please login again.");
        router.push('/login');
        return;
      }

      const data = await res.json().catch((parseError) => {
        console.error("JSON Parse Error:", parseError);
        return null;
      });

      console.log("📊 Response data:", data);

      if (!res.ok) {
        const msg = data?.message || `Server returned ${res.status}: ${res.statusText}`;
        setError(msg);
        return;
      }

      if (data?.success) {
        setSuccessMessage(data?.message || "سفارش شما با موفقیت ثبت شد.");
        setSuccessModal(true);
      } else {
        setError(data?.message || "Order submission failed on server side.");
      }


    } catch (err: any) {
      console.error("🚨 Network Error:", err);
      setError(err?.message || "خطای شبکه");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-10 bg-light">
      <OrderSteps />

      {/* header text + button */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div className="basis-full md:basis-4/5">
          <h1 className="text-2xl font-bold mb-4">Short information:</h1>
          <p className="pb-4">
            Please review all details, and if everything looks correct, confirm your order
          </p>
        </div>
        <div className="basis-full md:basis-1/5 flex justify-start md:justify-end">
          <button
            onClick={handleConfirm}
            disabled={loading || (services.length === 0 && customOrders.length === 0)}
            className={`w-full md:w-auto py-2 px-6 rounded text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>

      {/* Services table + total */}
      <div className="flex flex-col md:flex-row border rounded-3xl p-4 mb-6 bg-white gap-4">
        <div className="basis-full md:basis-2/3 overflow-x-auto">
          <h5 className="font-bold text-xl py-2.5">Your selected service :</h5>
          <table className="w-full min-w-[500px] text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Service</th>
                <th className="py-2 px-4">Item</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {services.map((it) => (
                <tr key={it.id} className="border-b">
                  <td className="py-2 px-4">{it.categoryTitle || "Service"}</td>
                  <td className="py-2 px-4">{it.name}</td>
                  <td className="py-2 px-4">{it.quantity}</td>
                  <td className="py-2 px-4 font-semibold">
                    {typeof it.price === "number" ? (
                      `£${(it.price * it.quantity).toFixed(2)}`
                    ) : (
                      <span className="text-orange-500">To be confirmed</span>
                    )}
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

        <div className="basis-full md:basis-1/3 mt-4 md:mt-0 px-0 md:px-4 md:border-l md:ml-2.5">
          <div>
            <p>
              Total Item:{" "}
              {services.reduce((s, it) => s + it.quantity, 0) + customOrders.length}
            </p>
            <p className="text-xl font-semibold">Total Price: £{total.toFixed(2)}</p>
          </div>
          {customOrders.length > 0 && (
            <div className="mt-4 bg-orange-50 border border-orange-300 text-orange-700 p-3 rounded">
              {customOrders.length} custom services — Their prices will be calculated after
              inspection and paid upon pickup.
            </div>
          )}
        </div>
      </div>

      {/* Pickup & Delivery */}
      <div className="border rounded-3xl p-4 mb-6 bg-white">
        <h5 className="font-bold text-xl py-2.5">Pickup & Delivery:</h5>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:border-r border-r-Gray-2 pr-2">
            <h4 className="font-semibold mb-2">Information Contact:</h4>
            <div className="flex flex-wrap gap-4">
              <div className="basis-1/2">
                <span className="font-bold text-primary">Name</span>
                <p className="text-sm">{pickupStore.name || "-"}</p>
              </div>
              <div className="basis-1/2">
                <span className="font-bold text-primary">Family Name</span>
                <p className="text-sm">{pickupStore.familyName || "-"}</p>
              </div>
              <div className="basis-1/2">
                <span className="font-bold text-primary">Phone</span>
                <p className="text-sm">{pickupStore.phone || "-"}</p>
              </div>
            </div>
          </div>
          <div className="md:border-r border-r-Gray-2 pr-2">
            <h4 className="font-semibold mb-2">Address:</h4>
            <div className="flex flex-wrap gap-4">
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

          <div className="md:border-r md:border-r-Gray-2 pr-2">
            <h4 className="font-semibold mb-2">Pickup Details:</h4>
            <div className="flex flex-wrap gap-4">
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
            <div className="flex flex-wrap gap-4">
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

      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={() => router.back()}
          className="w-full md:w-auto py-2 px-6 rounded border"
        >
          ← Back
        </button>
      </div>

      {successModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-green-600 mb-3">Order Submitted 🎉</h2>
            <p className="text-gray-700 mb-4">
              {successMessage || "سفارش شما با موفقیت به ادمین ارسال شد."}
            </p>
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