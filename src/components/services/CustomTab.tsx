"use client"

import { useState } from "react"
import { Input } from "@/components/Ui/input"
import { Textarea } from "@/components/Ui/textarea"
import { Button } from "@/components/Ui/button"
import { useCustomOrderStore } from "@/store/customOrderStore"
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"

export default function CustomServicesTab() {
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    customOrders,
    addCustomOrder,
    deleteCustomOrder,
    updateCustomOrder,
  } = useCustomOrderStore()

  const handleSubmit = () => {
    if (!subject.trim() || !description.trim()) return

    if (editingId) {
      updateCustomOrder(editingId, subject, description)
      setEditingId(null)
    } else {
      addCustomOrder(subject, description)
    }

    setSubject("")
    setDescription("")
  }

  const handleEdit = (id: string) => {
    const item = customOrders.find((c) => c.id === id)
    if (!item) return

    setSubject(item.subject)
    setDescription(item.description)
    setEditingId(item.id)
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        If you have a special request that doesn’t fit into other categories, please describe it below.
      </p>

      <div className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Subject</label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Fix zipper on jacket"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide additional details..."
            rows={4}
          />
        </div>

        <p className="text-xs text-gray-500">
          We’ll do our best to accommodate your request. Our team will review and confirm via phone or email.
        </p>

        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
          {editingId ? "Update Request" : "Add Custom Request"}
        </Button>
      </div>

      {customOrders.length > 0 && (
        <div className="pt-6 border-t">
          <h4 className="text-base font-semibold mb-4">Custom Services Summary</h4>
          <ul className="space-y-4">
            {customOrders.map((order) => (
              <li
                key={order.id}
                className="p-3 border rounded-md shadow-sm bg-white space-y-1"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{order.subject}</p>
                    <p className="text-sm text-gray-600">{order.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(order.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      <PencilIcon className="w-4 h-4 inline-block" /> Edit
                    </button>
                    <button
                      onClick={() => deleteCustomOrder(order.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      <TrashIcon className="w-4 h-4 inline-block" /> Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
