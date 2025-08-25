"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useOrderStore } from "@/store/orderStore";
import { useCustomOrderStore } from "@/store/customOrderStore";
import { usePickupDeliveryStore } from "@/store/pickupDeliveryStore";
import OrderSteps from "@/components/order/OrderSteps";
import OrderSuccessModal from "@/components/modals/OrderSuccessModal";
import AuthModal from "@/components/auth/AuthModal";

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
  const [orderData, setOrderData] = useState<any>({});

  const { user, isAuthenticated, requireAuth } = useUserStore();

  useEffect(() => {
    // Check authentication on component mount
    requireAuth();
  }, [requireAuth]);

  const handleConfirm = async () => {
    setError(null);

    // Use the new requireAuth method
    if (!requireAuth()) {
      return; // Modal will be shown automatically
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      setError("Authentication token not found. Please login again.");
      requireAuth();
      return;
    }

    const payload = {
      services,
      customOrders,
      pickupDelivery: {
        name: pickupStore.name,
        familyName: pickupStore.familyName,
        phone: pickupStore.phone,
        postalCode: pickupStore.postalCode,
        fullAddress: pickupStore.fullAddress,
        pickupDate: pickupStore.pickupDate,
        pickupTime: pickupStore.pickupTime,
        deliveryDate: pickupStore.deliveryDate,
        deliveryTime: pickupStore.deliveryTime,
      },
      total,
      userId: user?.id,
    };

    try {
      setLoading(true);
      console.log("🔑 token:", token);
      console.log("👤 user:", user);
      console.log("📦 payload:", JSON.stringify(payload, null, 2));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const endpoint = `${apiUrl}/orders-user`;

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

      if (res.status === 401 || res.status === 302) {
        console.log("🔄 Authentication required");
        setError("Authentication required. Please login again.");
        requireAuth();
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

      if (res.status === 201) {
        // Set order data for the modal
        setOrderData({
          orderNumber: data?.orderNumber || `ORD-${Date.now()}`,
          total: total,
          estimatedDelivery: "3-5 business days",
          customerEmail: user?.email || "customer@example.com",
          customerPhone: pickupStore.phone || user?.phone || "+44 XXX XXX XXX"
        });
        setSuccessModal(true);
      } else {
        setError(data?.message || "Order submission failed on server side.");
      }

    } catch (err: any) {
      console.error("🚨 Network Error:", err);
      setError(err?.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    // Reset stores
    useOrderStore.getState().resetOrders();
    // useCustomOrderStore.getState().resetOrders();
    // Don't navigate here, let the modal handle it
  };

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Checking authentication...</p>
          </div>
        </div>
        <AuthModal isOpen={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        }} initialTab={""} />
      </>
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

      {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded border border-red-200">{error}</div>}

      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={() => router.back()}
          className="w-full md:w-auto py-2 px-6 rounded border hover:bg-gray-50"
        >
          ← Back
        </button>
      </div>

      {/* Global Auth Modal */}
      <AuthModal isOpen={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      }} initialTab={""} />

      {/* Enhanced Success Modal */}
      <OrderSuccessModal
        isOpen={successModal}
        onClose={handleCloseSuccessModal}
        orderData={orderData}
      />
    </div>
  );
}