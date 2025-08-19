'use client';

import { usePickupDeliveryStore } from '@/store/pickupDeliveryStore';

const timeSlots = [
  '08:00', '09:00', '10:00',
  '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00',
  '17:00', '18:00',
];

export default function PickupDeliveryTime() {
  const {
    pickupDate,
    pickupTime,
    deliveryDate,
    deliveryTime,
    setField
  } = usePickupDeliveryStore();

  return (
    <div className="space-y-6">

      {/* Pickup Section */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-Gray-2">
        <h3 className="text-lg font-semibold mb-4">Pickup Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setField('pickupDate', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Pickup Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Time
            </label>
            <select
              value={pickupTime}
              onChange={(e) => setField('pickupTime', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Delivery Section */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-Gray-2">
        <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Date
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setField('deliveryDate', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Delivery Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Time
            </label>
            <select
              value={deliveryTime}
              onChange={(e) => setField('deliveryTime', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
