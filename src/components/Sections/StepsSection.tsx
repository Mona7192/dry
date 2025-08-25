// components/Sections/StepsSection.tsx

import StepItem from "../StepItem";
import { Truck, WashingMachine, ShoppingBasket, CircleCheckBig } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: 1,
    icon: <ShoppingBasket className="w-10 h-10 text-white" />,
    title: "Choose Your Service",
    description: "Select the laundry or duvet service that suits your needs — wash, fold, bed linens, or more",
  },
  {
    number: 2,
    icon: <CircleCheckBig className="w-10 h-10 text-white" />,
    title: "Schedule Pickup",
    description: "Pick a convenient time and date for us to collect your laundry from your home or office.",
  },
  {
    number: 3,
    icon: <WashingMachine className="w-10 h-10 text-white" />,
    title: "We Clean With Care",
    description: "We wash, dry, iron, and fold your items using eco-friendly products and professional equipment.",
  },
  {
    number: 4,
    icon: <Truck className="w-10 h-10 text-white" />,
    title: "Delivery to Your Door",
    description: "Your items are delivered fresh, folded, and ready to use — usually within 24–48 hours. easily online or by wallet.",
  },
];

export default function StepsSection() {
  return (
    <section className="py-20 bg-linear-to-r from-[#4BA3C3] to-[#75C085]">
      <div className="container mx-auto px-4">
        <div className="flex flex-row flex-wrap">
          <h2 className="sm:basis-1/4 text-3xl font-bold text-center mb-12 text-white">Your Fresh Laundry Journey</h2>
          <div className="sm:basis-3/4 mb-5">
            <p className="text-white py-3 max-w-4xl">Getting your laundry or bedding cleaned has never been easier. Just follow these simple steps and enjoy hassle-free service with collection and delivery included.</p>
            <Link
            href="/order"
            className="bg-white text-primary px-6 py-3 rounded-md text-sm font-medium text-center block *:sm:inline"
          >
            Book Now
          </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <StepItem key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
