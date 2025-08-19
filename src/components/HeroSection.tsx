// components/HeroSection.tsx


import Link from "next/link";
import HeroSlider from './HeroSlider';

export default function HeroSection() {
  return (
    <section className="bg-white w-full py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Text Content */}
        <h1 className="text-4xl md:text-4xl font-bold text-gray-800 leading-tight mb-6 max-w-3xl">
          Premium <mark className="text-primary bg-white">Laundry & Duvet Cleaning</mark> with Free <mark className="text-Secondary bg-white">Collection & Delivery</mark>
        </h1>
        <p className="text-gray-600 text-lg mb-8 ">
          Enjoy the ultimate convenience we collect, clean, and deliver straight to your door.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          <Link
            href="/order"
            className="bg-primary hover:bg-Secondary text-white px-6 py-3 rounded-md text-sm font-medium"
          >
            Book Now
          </Link>
          <Link
            href="/pricing"
            className="text-white hover:bg-primary bg-Secondary px-6 py-3 rounded-md text-sm font-medium"
          >
            Pricing Section
          </Link>
        </div>

        {/* Grid of Images (simulating slider) */}
       <HeroSlider />
      </div>
    </section>
  );
}
