'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function WelcomeOfferSection() {
  const [copied, setCopied] = useState(false)
  const discountCode = 'WELCOME15'

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
        
        {/* Text Content */}
        <div className="col-span-2 flex flex-col gap-6 px-12">
          <h2 className="text-5xl max-w-[400] font-bold"><mark className="bg-light text-primary">Welcome Offer</mark> Just for You!</h2>
          <p className="text-gray-600 max-w-[700]">
            Get 15% off your first order. Use the promo code below at checkout and enjoy fresh, clean clothes with a special discount.
          </p>

          {/* Discount Box */}
          <div className="flex items-center justify-between gap-4 bg-white border border-Secondary rounded-lg px-4 py-3 w-full max-w-[700]">
            <span className="font-mono text-lg tracking-wider">{discountCode}</span>
            <button
              onClick={handleCopy}
              className="text-sm flex items-center gap-1 px-3 py-1.5 rounded-md bg-Secondary text-white hover:bg-primary transition"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  
                </>
              )}
            </button>
          </div>
        </div>
        {/* Image */}
        <div className="w-full">
          <Image
            src="/images/welcome-gift.png" 
            alt="Welcome Gift"
            width={580}
            height={400}
            className="w-[580] h-[400] rounded-xl shadow-md object-cover"
          />
        </div>

      </div>
    </section>
  )
}
