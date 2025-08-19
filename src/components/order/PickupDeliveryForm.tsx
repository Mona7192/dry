// src/components/order/PickupDeliveryForm.tsx
"use client"

import { Calendar } from "@/components/Ui/calendar"
import { ToggleGroup, ToggleGroupItem } from "@/components/Ui/toggle-group"
import { Textarea } from "@/components/Ui/textarea"
import { useState } from "react"
import { format } from "date-fns"

export default function PickupDeliveryForm() {
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined)
  const [pickupSlot, setPickupSlot] = useState<string>("")
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined)
  const [deliverySlot, setDeliverySlot] = useState<string>("")
  const [notes, setNotes] = useState("")

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log({
      pickupDate: pickupDate ? format(pickupDate, "yyyy-MM-dd") : null,
      pickupSlot,
      deliveryDate: deliveryDate ? format(deliveryDate, "yyyy-MM-dd") : null,
      deliverySlot,
      notes,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Pickup Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Pickup</h3>
        <Calendar
          mode="single"
          selected={pickupDate}
          onSelect={setPickupDate}
          className="rounded-md border"
        />
        <ToggleGroup
          type="single"
          value={pickupSlot}
          onValueChange={setPickupSlot}
          className="flex flex-wrap gap-2 mt-4"
        >
          {timeSlots.map((slot) => (
            <ToggleGroupItem
              key={slot}
              value={slot}
              className="px-4 py-2 text-sm border rounded-md"
            >
              {slot}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Delivery Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Delivery</h3>
        <Calendar
          mode="single"
          selected={deliveryDate}
          onSelect={setDeliveryDate}
          className="rounded-md border"
        />
        <ToggleGroup
          type="single"
          value={deliverySlot}
          onValueChange={setDeliverySlot}
          className="flex flex-wrap gap-2 mt-4"
        >
          {timeSlots.map((slot) => (
            <ToggleGroupItem
              key={slot}
              value={slot}
              className="px-4 py-2 text-sm border rounded-md"
            >
              {slot}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Notes for the driver (optional)
        </label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., Please ring the bell twice."
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
      >
        Save & Continue
      </button>
    </form>
  )
}
