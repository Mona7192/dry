"use client"

import { useState } from "react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { Button } from "@/components/ui/button"

const timeSlots = [
  "08:00 - 10:00 AM",
  "10:00 - 12:00 PM",
  "12:00 - 02:00 PM",
  "02:00 - 04:00 PM",
  "04:00 - 06:00 PM",
]

export function Step3SchedulePickup() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Schedule Pickup</h2>
      <p className="text-gray-500 mb-6">Choose a date and time slot for pickup.</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* تقویم */}
        <div>
          <h4 className="font-medium mb-2">Pickup Date</h4>
          <DayPicker mode="single" selected={date} onSelect={setDate} />
          {date && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {format(date, "PPP")}
            </p>
          )}
        </div>

        {/* بازه زمانی */}
        <div className="flex-1">
          <h4 className="font-medium mb-2">Time Slot</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlot === slot ? "default" : "outline"}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
