"use client"

import { usePickupDeliveryStore } from "@/store/pickupDeliveryStore"

export default function DriverNote() {
  const { driverNote, setField } = usePickupDeliveryStore()

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold">Note for Driver (optional)</label>
      <textarea
        value={driverNote}
        onChange={(e) => setField("driverNote", e.target.value)}
        rows={4}
        placeholder="e.g. Please call when you arrive."
        className="mt-1 block w-full border border-Gray-2 rounded-2xl p-2 resize-none bg-white"
      />
    </div>
  )
}
