import type { AuthFlowMode, AuthSession, AuthUser, PhoneOtpChallenge, SignupInput } from '../types/auth.types';
import { normalizeIndiaPhoneToE164 } from '../validations/auth.schema';

const LS_USERS = 'vy_web_users_v1';
const LS_SESSION = 'vy_web_session_v1';
const SS_SESSION = 'vy_web_session_session_v1';
const LS_CHALLENGE = 'vy_web_otp_challenge_v1';

const now = () => Date.now();
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function randomId(prefix: string) {
  const part = Math.random().toString(16).slice(2);
  return `${prefix}_${part}_${Date.now().toString(16)}`;
}

function safeJsonParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeReadLocal<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  return safeJsonParse<T>(raw);
}

function safeWriteLocal(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function safeRemoveLocal(key: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

function safeReadSession<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const raw = window.sessionStorage.getItem(key);
  if (!raw) return null;
  return safeJsonParse<T>(raw);
}

function safeWriteSession(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

function safeRemoveSession(key: string) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(key);
}

function readUsers(): AuthUser[] {
  return safeReadLocal<AuthUser[]>(LS_USERS) ?? [];
}

function writeUsers(users: AuthUser[]) {
  safeWriteLocal(LS_USERS, users);
}

function readSession(): AuthSession | null {
  return safeReadSession<AuthSession>(SS_SESSION) ?? safeReadLocal<AuthSession>(LS_SESSION);
}

function writeSession(session: AuthSession | null, rememberMe: boolean) {
  if (!session) {
    safeRemoveLocal(LS_SESSION);
    safeRemoveSession(SS_SESSION);
    return;
  }
  if (rememberMe) {
    safeWriteLocal(LS_SESSION, session);
    safeRemoveSession(SS_SESSION);
  } else {
    safeWriteSession(SS_SESSION, session);
    safeRemoveLocal(LS_SESSION);
  }
}

function readChallenge(): { challenge: PhoneOtpChallenge; otp: string } | null {
  const v = safeReadLocal<{ challenge: PhoneOtpChallenge; otp: string }>(LS_CHALLENGE);
  if (!v) return null;
  if (v.challenge.expiresAt <= now()) return null;
  return v;
}

function writeChallenge(challenge: PhoneOtpChallenge | null, otp: string | null) {
  if (!challenge || !otp) {
    safeRemoveLocal(LS_CHALLENGE);
    return;
  }
  safeWriteLocal(LS_CHALLENGE, { challenge, otp });
}

function generateOtp(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return String(n);
}

export const mockAuth = {
  getSession(): AuthSession | null {
    return readSession();
  },

  logout(): void {
    writeSession(null, true);
  },

  getChallenge(): PhoneOtpChallenge | null {
    const existing = readChallenge();
    return existing?.challenge ?? null;
  },

  async requestOtp(input: { phone: string; mode: AuthFlowMode }): Promise<PhoneOtpChallenge> {
    const phoneE164 = normalizeIndiaPhoneToE164(input.phone);

    const existing = readChallenge();
    if (existing && existing.challenge.phoneE164 === phoneE164 && existing.challenge.cooldownEndsAt > now()) {
      return existing.challenge;
    }

    await sleep(500);

    const otp = generateOtp();
    const challenge: PhoneOtpChallenge = {
      challengeId: randomId('ch'),
      phoneE164,
      expiresAt: now() + 5 * 60 * 1000,
      cooldownEndsAt: now() + 30 * 1000,
    };

    writeChallenge(challenge, otp);
    return challenge;
  },

  async verifyOtp(input: {
    challengeId: string;
    otp: string;
    mode: AuthFlowMode;
  }): Promise<{ ok: true } | { ok: false; message: string }> {
    await sleep(650);
    const stored = readChallenge();
    if (!stored) return { ok: false, message: 'OTP session expired. Please resend.' };
    if (stored.challenge.challengeId !== input.challengeId) return { ok: false, message: 'OTP session mismatch. Please resend.' };
    if (stored.challenge.expiresAt <= now()) return { ok: false, message: 'OTP expired. Please resend.' };
    if (stored.otp !== input.otp) return { ok: false, message: 'Incorrect OTP. Please try again.' };
    return { ok: true };
  },

  async ensureUserForLogin(phone: string): Promise<AuthUser> {
    const phoneE164 = normalizeIndiaPhoneToE164(phone);
    const users = readUsers();
    const existing = users.find((u) => u.phoneE164 === phoneE164);
    if (existing) return existing;

    const created: AuthUser = {
      userId: randomId('u'),
      phoneE164,
      fullName: 'Vyapari User',
      businessRole: 'Owner',
      businessName: 'Vyapari Business',
      businessCategory: 'Retail Shop',
      city: 'Mumbai',
      state: 'Maharashtra',
      createdAt: now(),
    };
    writeUsers([created, ...users]);
    return created;
  },

  async createUserForSignup(payload: SignupInput): Promise<AuthUser> {
    const phoneE164 = normalizeIndiaPhoneToE164(payload.phone);
    const users = readUsers();
    const existing = users.find((u) => u.phoneE164 === phoneE164);
    if (existing) return existing;

    const created: AuthUser = {
      userId: randomId('u'),
      phoneE164,
      fullName: payload.fullName,
      businessRole: payload.businessRole,
      businessName: payload.businessName,
      businessCategory: payload.businessCategory,
      city: payload.city,
      state: payload.state,
      gstNumber: payload.gstNumber,
      createdAt: now(),
    };
    writeUsers([created, ...users]);
    return created;
  },

  async createSessionForUser(user: AuthUser, rememberMe: boolean): Promise<AuthSession> {
    await sleep(300);
    const session: AuthSession = {
      sessionId: randomId('s'),
      userId: user.userId,
      phoneE164: user.phoneE164,
      fullName: user.fullName,
      businessName: user.businessName,
      businessCategory: user.businessCategory,
      city: user.city,
      state: user.state,
      createdAt: user.createdAt,
    };
    writeSession(session, rememberMe);
    return session;
  },
};
