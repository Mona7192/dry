"use client"

import { usePickupDeliveryStore } from "@/store/pickupDeliveryStore"

export default function PickupAddressForm() {
  const { postalCode, fullAddress, setField } = usePickupDeliveryStore()

  return (
    <div className="space-y-4 bg-white border border-Gray-2 rounded-2xl p-5">
      <h2 className="font-bold text-[16px]">Address</h2>
      <hr />
      <div>
        <label className="block text-sm font-medium">Postal Code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setField("postalCode", e.target.value)}
          placeholder="e.g. W1A 1AA"
          className="mt-1 block w-full border rounded-2xl p-2 "
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Full Address</label>
        <textarea
          value={fullAddress}
          onChange={(e) => setField("fullAddress", e.target.value)}
          rows={3}
          placeholder="Enter full address..."
          className="mt-1 block w-full border rounded-2xl p-2 resize-none"
        />
      </div>
    </div>
  )
}
