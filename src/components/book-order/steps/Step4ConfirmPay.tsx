'use client'

import { useState } from 'react'
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"


type Props = {
  form: {
    note: string
  }
  setForm: (data: any) => void
}

export function Step4ConfirmPay({ form, setForm }: Props) {
  const [selected, setSelected] = useState<Date>()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, note: e.target.value })
  }

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Choose a date</label>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(date) => {
            setSelected(date)
            setForm({ ...form, date }) // ذخیره تاریخ انتخابی
          }}
        />
      </div>

      {/* Textarea */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Additional notes (optional)</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Anything we should know?"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  )
}
