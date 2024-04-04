'use client'
import { useState } from 'react'

export interface StepProps {
  onNextStep: () => void
  onPrevStep: () => void
}

export function StepFlow ({ steps }: { steps: Array<React.ComponentType<StepProps>> }) {
  const [step, setStep] = useState(0)

  const onNextStep = () => {
    if (step >= steps.length - 1) return
    setStep(step + 1)
  }

  const onPrevStep = () => {
    if (step === 0) return
    setStep(step - 1)
  }

  const renderStep = () => {
    const StepComponent = steps[step]
    return (
      <StepComponent onNextStep={onNextStep} onPrevStep={onPrevStep} />
    )
  }

  return renderStep()
}
