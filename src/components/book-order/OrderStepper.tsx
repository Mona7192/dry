// components/book-order/OrderStepper.tsx
type Step = {
  title: string
}

const steps: Step[] = [
  { title: "Select Service" },
  { title: "Select Items" },
  { title: "Schedule Pickup" },
  { title: "Confirm & Pay" },
]

interface Props {
  currentStep: number
}

export function OrderStepper({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isCompleted = index < currentStep

        return (
          <div key={index} className="flex-1 flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full 
              ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'border-2 border-green-500 text-green-600' : 'bg-gray-300 text-gray-600'}`}>
              {isCompleted ? "✓" : index + 1}
            </div>
            <span className="ml-2 text-sm">{step.title}</span>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 
                ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
