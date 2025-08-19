import FeatureCard from './FeatureCard'
import { features } from '@/data/features'
import Image from 'next/image'

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left - Image */}
          <div className="w-full">
            <Image
              src="/images/happy-customer.png" // مسیر تصویر
              alt="Happy Customer"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
          </div> 
          <div>
            <p className="text-primary font-bold text-2xl py-8">Why Customers Love Us</p>
            {/* Right - Features in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
          </div>
          
          
        </div>
      </div>
    </section>
  )
}
