// BookConfirm.tsx
import React from "react";

export default function BookConfirm({ finalOrderData }: { finalOrderData: any }) {
  const handleConfirm = async () => {
    try {
      console.log("Sending order data:", finalOrderData);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalOrderData),
      });

      if (!res.ok) {
        throw new Error("Failed to send order");
      }

      const result = await res.json();
      console.log("Order created successfully:", result);
      alert("سفارش با موفقیت ثبت شد!");
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("مشکلی در ثبت سفارش پیش آمد.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={handleConfirm}
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Confirm Order
      </button>
    </div>
  );
}
