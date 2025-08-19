// components/ServicesSection.tsx

import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Laundry Service',
    description:
      'Let us take care of your daily laundry. From clothes to towels, we wash, dry, and neatly fold your items using eco-friendly detergents. Perfect for busy individuals, families, or anyone looking to save time.',
    image: '/images/service-drycleaning.png',
  },
  {
    title: 'Duvet & Bedding Cleaning',
    description:
      'Enjoy a fresh, deep-cleaned duvet with our specialized bedding service. We clean duvets, pillows, and covers with care to remove dust, allergens, and odors — returning them soft, sanitized, and ready for a cozy sleep.',
    image: '/images/service-delivery.png',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white px-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-row">
          <h2 className="basis-1/4 text-primary text-3xl font-bold mb-4">Our Services</h2>
        <p className="basis-3/4 text-gray-600 mb-12 max-w-4xl">
          We specialize in premium laundry and duvet cleaning services tailored to fit your schedule. Whether it's your everyday clothes or heavy bedding, we ensure everything is washed, folded, and returned to you fresh and clean with free collection and delivery included.

        </p>
        </div>
        

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <div key={index} className="flex flex-row gap-8 items-center border-solid border-2 border-Secondary rounded-xl p-10">
              <div className="basis-1/3 relative w-full h-56 md:h-64 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="basis-2/3">
                <h3 className="text-xl text-Secondary font-semibold mt-6 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm max-w-sm py-3.5">{service.description}</p>
              <Link
                href={`/services/${service.slug}`}
                className="inline-block mt-auto py-2 text-primary rounded-full hover:text-Secondary transition"
              >
                Book Now >>
              </Link>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
