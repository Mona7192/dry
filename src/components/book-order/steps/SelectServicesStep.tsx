"use client"

import LaundryTab from "@/components/services/LaundryTab"
import OrderSummary from "@/components/order/OrderSummary"

export default function SelectServicesStep() {
  return (
   <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="bg-blue-100 lg:col-span-2">
    <LaundryTab />
  </div>
  <div className="bg-green-100 lg:col-span-1">
    <OrderSummary nextHref="/book-order/pickup-delivery" />
  </div>
</div>
  )
}
