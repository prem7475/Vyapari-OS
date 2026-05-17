import AuthLayout from '../../../components/auth/auth-layout';
import SignupForm from '../../../components/auth/signup-form';

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up your business profile now. OTP verification takes a few seconds."
      footerHint={<span>Your details stay private. You control what you share and can manage access from settings later.</span>}
    >
      <SignupForm />
    </AuthLayout>
  );
}

