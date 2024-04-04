import { StepFlow } from '@src/modules/auth/components/step-flow'
import { TwoFactorForm } from '@src/modules/auth/views/2factor-form'
import { LoginForm } from '@src/modules/auth/views/login-form'

export default function LoginPage () {
  return (
    <StepFlow
      steps={[LoginForm, TwoFactorForm]}
    />
  )
}
