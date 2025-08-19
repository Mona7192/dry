"use client"

import { useOrderStore } from "@/store/orderStore"

export default function OrderSummary() {
  const { orderItems } = useOrderStore()

  const items = Object.values(orderItems)
  const totalPrice = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="border p-4 rounded-lg text-gray-500">
        No items have been selected yet.
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-4 bg-gray-50">
      <h2 className="text-lg font-bold">Order Summary</h2>
      <ul className="flex flex-col gap-2">
        {items.map(({ item, quantity }) => (
          <li key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} × {quantity}
            </span>
            <span>{(item.price * quantity).toLocaleString()} £</span>
          </li>
        ))}
      </ul>
      <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
        <span>Total sum:</span>
        <span>{totalPrice.toLocaleString()} £</span>
      </div>
    </div>
  )
}
