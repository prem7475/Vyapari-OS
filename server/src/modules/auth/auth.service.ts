import bcrypt from 'bcryptjs';
import { customAlphabet } from 'nanoid';
import { env, cookieOptions } from '../../config/env.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import {
  createBusiness,
  createUser,
  createRefreshToken,
  findActiveRefreshTokens,
  findUserByEmail,
  findUserByPhone,
  revokeRefreshTokenById,
  revokeUserRefreshTokens,
} from './auth.repository.js';

const invitationId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

function sanitizeString(value: string | undefined) {
  return value?.trim() || undefined;
}

export async function signup(input: {
  email?: string;
  phone?: string;
  password: string;
  name: string;
  businessName: string;
  gstNumber?: string;
  panNumber?: string;
  address?: string;
  website?: string;
}) {
  const email = sanitizeString(input.email);
  const phone = sanitizeString(input.phone);

  if (email && (await findUserByEmail(email))) {
    throw new Error('Email already registered');
  }

  if (phone && (await findUserByPhone(phone))) {
    throw new Error('Phone number already registered');
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const business = await createBusiness({
    name: input.businessName,
    type: 'Business',
    gstNumber: input.gstNumber,
    panNumber: input.panNumber,
    address: input.address,
    website: input.website,
  });

  const user = await createUser({
    email,
    phone,
    passwordHash,
    name: sanitizeString(input.name),
    businessId: business.id,
  });

  const accessToken = generateAccessToken({ sub: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ sub: user.id });
  const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await createRefreshToken(user.id, refreshTokenHash, expiresAt);

  return { user: { id: user.id, email: user.email, phone: user.phone, name: user.name, role: user.role }, accessToken, refreshToken, expiresAt };
}

export async function login(input: { identifier: string; password: string }) {
  const identifier = sanitizeString(input.identifier) || '';
  const user = identifier.includes('@') ? await findUserByEmail(identifier) : await findUserByPhone(identifier);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  await revokeUserRefreshTokens(user.id);

  const accessToken = generateAccessToken({ sub: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ sub: user.id });
  const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await createRefreshToken(user.id, refreshTokenHash, expiresAt);

  return { user: { id: user.id, email: user.email, phone: user.phone, name: user.name, role: user.role }, accessToken, refreshToken, expiresAt };
}

export async function refreshSession(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  const tokens = await findActiveRefreshTokens(payload.sub);
  const match = await Promise.all(tokens.map(async (token) => ({ token, valid: await bcrypt.compare(refreshToken, token.tokenHash) }))).then((results) => results.find((entry) => entry.valid));

  if (!match) {
    throw new Error('Refresh token expired or invalid');
  }

  await revokeRefreshTokenById(match.token.id);
  const accessToken = generateAccessToken({ sub: payload.sub, role: payload.role });
  const newRefreshToken = generateRefreshToken({ sub: payload.sub });
  const refreshTokenHash = await bcrypt.hash(newRefreshToken, 12);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await createRefreshToken(payload.sub, refreshTokenHash, expiresAt);

  return { accessToken, refreshToken: newRefreshToken, expiresAt, userId: payload.sub };
}

export async function revokeSession(refreshToken: string) {
  const tokens = await findActiveRefreshTokens('');
  const match = await Promise.all(tokens.map(async (token) => ({ token, valid: await bcrypt.compare(refreshToken, token.tokenHash) }))).then((results) => results.find((entry) => entry.valid));
  if (match) {
    await revokeRefreshTokenById(match.token.id);
  }
}
