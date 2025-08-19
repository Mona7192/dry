// components/OrderSteps.tsx
"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

const steps = [
  { id:"1", label: "Select Services", path: "/book-order" },
  { id:"2", label: "Pickup & Delivery", path: "/book-order/pickup-delivery" },
  { id:"3", label: "Book", path: "/book-order/book" },
];

const OrderSteps = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between gap-4 my-6">
      {steps.map((step, index) => {
        const isActive = pathname === step.path;

        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className={clsx(
                "px-4 py-2 rounded-xl text-sm font-medium transition",
                isActive
                  ? "bg-Secondary text-white"
                  : "bg-Gray-2 text-white"
              )}
            >
              {step.id}
              
            </div>
            <div
              className={clsx(
                "px-4 py-2 text-sm font-medium transition",
                isActive
                  ? " text-Secondary"
                  : " text-gray-700"
              )}
            >
            {step.label}
            </div>

            {index < steps.length - 1 && (
              <span className="text-Gray-2 font-stretch-100%">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderSteps;
