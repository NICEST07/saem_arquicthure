'use client'
import { useState } from 'react'

export interface StepProps {
  onNextStep: () => void
  onPrevStep: () => void
  onGoStep: (newStep: number) => void
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

  const onGoStep = (newStep: number) => {
    if (newStep >= steps.length - 1 || step <= 0) return
    setStep(newStep)
  }

  const renderStep = () => {
    const StepComponent = steps[step]
    return (
      <StepComponent onNextStep={onNextStep} onPrevStep={onPrevStep} onGoStep={onGoStep} />
    )
  }

  return renderStep()
}
