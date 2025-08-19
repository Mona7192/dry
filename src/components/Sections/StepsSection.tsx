// components/Sections/StepsSection.tsx

import StepItem from "../StepItem";
import { Truck, WashingMachine, Package, CreditCard } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: 1,
    icon: <Truck className="w-6 h-6 text-white" />,
    title: "Schedule Pickup",
    description: "Choose a pickup time that works for you.",
  },
  {
    number: 2,
    icon: <WashingMachine className="w-6 h-6 text-white" />,
    title: "We Clean",
    description: "We clean and fold your laundry with care.",
  },
  {
    number: 3,
    icon: <Package className="w-6 h-6 text-white" />,
    title: "Deliver",
    description: "We deliver your clothes back, fresh and clean.",
  },
  {
    number: 4,
    icon: <CreditCard className="w-6 h-14 text-white" />,
    title: "Payment",
    description: "Pay easily online or by wallet.",
  },
];

export default function StepsSection() {
  return (
    <section className="py-20 bg-linear-to-r from-[#4BA3C3] to-[#75C085]">
      <div className="container mx-auto px-4">
        <div className="flex flex-row">
          <h2 className="basis-1/4 text-3xl font-bold text-center mb-12 text-white">Your Fresh Laundry Journey</h2>
          <div className="basis-3/4">
            <p className="text-white py-3 max-w-4xl">Getting your laundry or bedding cleaned has never been easier. Just follow these simple steps and enjoy hassle-free service with collection and delivery included.</p>
            <Link
            href="/order"
            className="bg-white text-primary px-6 py-3 rounded-md text-sm font-medium"
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
