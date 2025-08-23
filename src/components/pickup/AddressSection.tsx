"use client"

import { usePickupDeliveryStore } from "@/store/pickupDeliveryStore"

export default function PickupAddressForm() {
  const { name, familyName, phone, postalCode, fullAddress, setField } = usePickupDeliveryStore()

  return (
    <div className="space-y-4 bg-white border border-Gray-2 rounded-2xl p-5">
      <h2 className="font-bold text-[16px]">Pickup & Delivery Address</h2>
      <hr />
      <div className="flex">
         {/* نام */}
      <div className="basis-1/2 px-2">
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="e.g. Sina"
          className="mt-1 block w-full border rounded-2xl p-2"
        />
      </div>

      {/* نام خانوادگی */}
      <div className="basis-1/2 px-2">
        <label className="block text-sm font-medium">Family Name</label>
        <input
          type="text"
          value={familyName}
          onChange={(e) => setField("familyName", e.target.value)}
          placeholder="e.g. Diyanat"
          className="mt-1 block w-full border rounded-2xl p-2"
        />
      </div>
      </div>
     
      <div className="flex">
        {/* شماره تماس */}
      <div className="basis-1/2 px-2">
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setField("phone", e.target.value)}
          placeholder="e.g. 09123456789"
          className="mt-1 block w-full border rounded-2xl p-2"
        />
      </div>

      {/* کد پستی */}
      <div className="basis-1/2 px-2">
        <label className="block text-sm font-medium">Postal Code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setField("postalCode", e.target.value)}
          placeholder="e.g. 1234567890"
          className="mt-1 block w-full border rounded-2xl p-2 "
        />
      </div>
      </div>
      

      {/* آدرس کامل */}
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