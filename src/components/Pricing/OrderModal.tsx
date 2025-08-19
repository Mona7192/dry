'use client'

import { Dialog } from '@headlessui/react'

interface Props {
  item: {
    name: string
    price: string
  }
  onClose: () => void
}

export default function OrderModal({ item, onClose }: Props) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Order: {item.name}
          </Dialog.Title>
          <p className="mb-4">Price: {item.price}</p>
          {/* Simple form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Your Address"
              className="w-full border rounded px-4 py-2"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Confirm Order
            </button>
          </form>

          <button
            className="mt-4 text-sm text-gray-500 underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
