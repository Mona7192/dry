// app/pricing/page.tsx
'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import PricingCard from '@/components/Pricing/PricingTable';
import OrderModal from '@/components/Pricing/OrderModal';



export default function PricingPage() {

  const [selectedItem, setSelectedItem] = useState<any>(null)

  return (
    <main className="space-y-16 px-4 md:px-12 lg:px-24 py-16 bg-light">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl font-bold max-w-[400]">Our Laundry & Dry Cleaning <mark className="bg-transparent text-primary">Prices</mark></h1>
          <p className="text-muted-foreground">
            Transparent pricing. No hidden fees.
          </p>
          <p className="text-muted-foreground max-w-xl">
            View our prices below and start your booking in just a few clicks.
          </p>
           <Link
            href="/book-order"
            className="bg-primary hover:bg-Secondary text-white px-6 py-3 mx-2.5 rounded-md text-sm font-medium"
          >
            Book Now
          </Link>
        </div>

        {/* Image */}
        <div className="flex-1">
          <Image
            src="/images/pricing.png"
            alt="Pricing"
            width={500}
            height={500}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Pricing Tables */}
      <section>
        {/* <PricingSection /> */}
        
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
      </section>
    </main>
  )
}
