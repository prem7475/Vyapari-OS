export type BusinessCategory =
  | 'Restaurant'
  | 'Retail Shop'
  | 'Manufacturer'
  | 'Agency'
  | 'Freelancer'
  | 'Ecommerce Seller'
  | 'Distributor';

export type BusinessRole = 'Owner' | 'Operator' | 'Accountant';

export type AuthFlowMode = 'login' | 'signup';

export type PhoneOtpChallenge = {
  challengeId: string;
  phoneE164: string;
  expiresAt: number;
  cooldownEndsAt: number;
};

export type AuthUser = {
  userId: string;
  phoneE164: string;
  fullName: string;
  businessRole: BusinessRole;
  businessName: string;
  businessCategory: BusinessCategory;
  city: string;
  state: string;
  gstNumber?: string;
  createdAt: number;
};

export type AuthSession = {
  sessionId: string;
  userId: string;
  phoneE164: string;
  fullName: string;
  businessName: string;
  businessCategory: BusinessCategory;
  city: string;
  state: string;
  createdAt: number;
};

export type LoginInput = {
  phone: string;
  rememberMe: boolean;
};

export type SignupInput = {
  fullName: string;
  phone: string;
  businessRole: BusinessRole;
  businessName: string;
  businessCategory: BusinessCategory;
  city: string;
  state: string;
  gstNumber?: string;
};

export type VerifyOtpInput = {
  challengeId: string;
  otp: string;
  mode: AuthFlowMode;
};

export type DemoCompanySize = '1-5' | '6-20' | '21-50' | '51-200' | '200+';
export type PreferredCallTime = 'Morning' | 'Afternoon' | 'Evening';

export type DemoBookingInput = {
  name: string;
  phone: string;
  businessType: BusinessCategory;
  companySize: DemoCompanySize;
  preferredCallTime: PreferredCallTime;
  notes?: string;
};

export type ContactTopic = 'Sales' | 'Support' | 'Partnerships' | 'Media';

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  topic: ContactTopic;
  message: string;
};
