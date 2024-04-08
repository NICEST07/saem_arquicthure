import { StepFlow } from '@src/modules/auth/components/step-flow'
import { AuthProvider } from '@src/modules/auth/context/auth-context'
import { TwoFactorForm } from '@src/modules/auth/views/2factor-form'
import { LoginForm } from '@src/modules/auth/views/login-form'

export default function LoginPage () {
  return (
    <AuthProvider>
      <StepFlow
        steps={[LoginForm, TwoFactorForm]}
      />
    </AuthProvider>
  )
}
