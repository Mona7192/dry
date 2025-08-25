// components/OrderSteps.tsx
"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Check } from "lucide-react";

const steps = [
  { id: "1", label: "Select Services", path: "/book-order" },
  { id: "2", label: "Pickup & Delivery", path: "/book-order/pickup-delivery" },
  { id: "3", label: "Book", path: "/book-order/book" },
];

const OrderSteps = () => {
  const pathname = usePathname();

  const getCurrentStepIndex = () => {
    const currentIndex = steps.findIndex(step => step.path === pathname);
    return currentIndex >= 0 ? currentIndex : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="w-full py-8 px-4">
      <div className="flex items-center justify-center relative max-w-2xl mx-auto">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#B1B1B1] rounded-full">
          <div
            className="h-full bg-[#75C085] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step, index) => {
            const isActive = pathname === step.path;
            const isCompleted = index < currentStepIndex;
            const isUpcoming = index > currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-sm",
                    isCompleted && "bg-[#75C085] text-white scale-105",
                    isActive && "bg-[#4BA3C3] text-white scale-110 shadow-lg shadow-[#4BA3C3]/25",
                    isUpcoming && "bg-white text-[#B1B1B1] border-2 border-[#B1B1B1]"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <div
                    className={clsx(
                      "font-medium text-sm transition-colors duration-300",
                      isActive && "text-[#4BA3C3]",
                      isCompleted && "text-[#75C085]",
                      isUpcoming && "text-[#B1B1B1]"
                    )}
                  >
                    {step.label}
                  </div>
                  {isActive && (
                    <div className="mt-1 w-12 h-0.5 bg-[#4BA3C3] rounded-full mx-auto"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderSteps;