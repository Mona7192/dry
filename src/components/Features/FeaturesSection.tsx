import FeatureCard from './FeatureCard'
import Image from 'next/image'
import { Truck, Clock, Users, Shield } from 'lucide-react';

const features = [
  { title: 'Free Collection & Delivery', icon: Truck },
  { title: '24-48 Hour Turnaround', icon: Clock },
  { title: 'Eco-Friendly Detergents', icon: Users },
  { title: 'Trusted by 1000+ Customers', icon: Shield },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-light">
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
           <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} icon={feature.icon} />
          ))}
             </div>
           </div>
          </div>
          
          
        </div>
      </div>
    </section>
  )
}






