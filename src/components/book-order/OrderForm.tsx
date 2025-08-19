"use client"

import { useState } from "react"
import { Step1SelectService } from "./steps/SelectServicesStep"
import  Step2SelectItems from "./steps/Step2SelectItems"
import { Step3SchedulePickup } from "./steps/Step3SchedulePickup"
import { Step4ConfirmPay } from "./steps/Step4ConfirmPay"
import { Button } from "@/components/ui/button"

export function OrderForm() {
  const [step, setStep] = useState(0)

  const next = () => setStep((prev) => Math.min(prev + 1, 3))
  const prev = () => setStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="space-y-8">
      {step === 0 && <Step1SelectService />}
      {step === 1 && <Step2SelectItems />}
      {step === 2 && <Step3SchedulePickup />}
      {step === 3 && <Step4ConfirmPay />}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prev}
          disabled={step === 0}
        >
          Back
        </Button>
        <Button onClick={next}>
          {step === 3 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  )
}
