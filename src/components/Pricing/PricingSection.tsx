'use client'

import { useState } from 'react'
import { services } from '@/data/services'
import PricingCard from './PricingTable'
import OrderModal from './OrderModal'
import Link from 'next/link'

export default function PricingSection() {
  const [selectedItem, setSelectedItem] = useState<any>(null)

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Transparent Pricing for Every Service</h2>
        <p className="text-primary mb-10 mx-auto">
          Our pricing is simple and upfront — no hidden fees, just fresh and clean laundry delivered right to your door.
        </p>
        <div className="my-8">
           <Link
            href="/book-order"
            className="bg-primary hover:bg-Secondary text-white px-6 py-3 mx-2.5 rounded-md text-sm font-medium"
          >
            Book Now
          </Link>
           <Link
            href="/pricing"
            className="bg-Secondary hover:bg-primary text-white px-6 py-3 mx-2.5 rounded-md text-sm font-medium"
          >
            Pricing Section
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <PricingCard
              key={service.key}
              service={service}
              onOrderClick={setSelectedItem}
            />
          ))}
        </div>

        {selectedItem && (
          <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </div>
    </section>
  )
}
