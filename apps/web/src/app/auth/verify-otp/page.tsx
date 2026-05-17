import AuthLayout from '../../../components/auth/auth-layout';
import OtpVerificationForm from '../../../components/auth/otp-verification-form';

export default function VerifyOtpPage() {
  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the 6-digit code sent to your phone to complete authentication."
      footerHint={<span>Security tip: Never share OTPs. Vyapari OS will never ask for your OTP over a call or WhatsApp.</span>}
    >
      <OtpVerificationForm />
    </AuthLayout>
  );
}

