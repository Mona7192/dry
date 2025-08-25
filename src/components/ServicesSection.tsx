import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Laundry Service',
    description:
      'Let us take care of your daily laundry. From clothes to towels, we wash, dry, and neatly fold your items using eco-friendly detergents. Perfect for busy individuals, families, or anyone looking to save time.',
    image: '/images/service-drycleaning.png',
    slug: 'laundry-service',
  },
  {
    title: 'Duvet & Bedding Cleaning',
    description:
      'Enjoy a fresh, deep-cleaned duvet with our specialized bedding service. We clean duvets, pillows, and covers with care to remove dust, allergens, and odors — returning them soft, sanitized, and ready for a cozy sleep.',
    image: '/images/service-delivery.png',
    slug: 'duvet-bedding-cleaning',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-white px-6 md:px-32">
      <div className="container mx-auto">
        {/* Title & Intro */}
        <div className="flex flex-col md:flex-row md:items-start mb-12 gap-6">
          <h2 className="text-primary text-2xl md:text-3xl font-bold md:basis-1/4">
            Our Services
          </h2>
          <p className="text-gray-600 md:basis-3/4 text-sm md:text-base max-w-4xl">
            We specialize in premium laundry and duvet cleaning services tailored to fit your
            schedule. Whether it&apos;s your everyday clothes or heavy bedding, we ensure everything is
            washed, folded, and returned to you fresh and clean with free collection and delivery
            included.
          </p>
        </div>

        {/* Services List */}
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 items-center border border-Secondary rounded-xl p-6 md:p-10"
            >
              {/* Image */}
              <div className="relative w-full h-48 md:h-64 md:w-1/3 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col md:w-2/3">
                <h3 className="text-lg md:text-xl text-Secondary font-semibold mt-4 md:mt-0 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base py-2">{service.description}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-3 text-primary font-medium hover:text-Secondary transition"
                >
                  Book Now &gt;&gt;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}