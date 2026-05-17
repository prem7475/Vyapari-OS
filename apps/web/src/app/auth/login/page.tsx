import AuthLayout from '../../../components/auth/auth-layout';
import LoginForm from '../../../components/auth/login-form';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in"
      subtitle="Continue with your phone number. You'll receive a secure OTP to verify access."
      footerHint={
        <span>
          By continuing, you agree to our{' '}
          <a className="underline underline-offset-4" href="/terms">
            Terms
          </a>{' '}
          and{' '}
          <a className="underline underline-offset-4" href="/privacy">
            Privacy Policy
          </a>
          .
        </span>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

