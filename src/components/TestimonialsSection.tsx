'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { testimonials } from '@/data/testimonials'
import Image from 'next/image'

export default function TestimonialsSection() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
    },
  })

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-row flex-wrap mb-12 mx-auto">
          <h2 className="sm:basis-1/4 text-3xl font-bold mb-4 px-10">What <mark className="text-Secondary bg-white">Our Customers</mark> Say</h2>
          <p className="text-gray-600 sm:basis-3/4 max-w-2lg">
            Don’t just take our word for it — hear from happy customers who trust us with their laundry and bedding needs. From spotless duvets to perfectly folded shirts, we’re proud to deliver service that speaks for itself.
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="keen-slider__slide bg-white outline-2 outline-Secondary p-6 rounded-xl my-5">
              <p className="text-[#2B2B2B] mb-4 font-normal">{testimonial.text}</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
