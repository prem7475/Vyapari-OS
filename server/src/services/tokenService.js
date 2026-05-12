import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

const ACCESS_TYP = 'access';

export function signAccessToken({ subject, role, audience }) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    typ: ACCESS_TYP,
    role,
  };

  return jwt.sign(payload, env.jwtAccessSecret, {
    subject,
    audience,
    issuer: env.appName,
    iat: nowSeconds,
    expiresIn: env.jwtAccessTtlSeconds,
  });
}

export function verifyAccessToken(token, { audience }) {
  try {
    const decoded = jwt.verify(token, env.jwtAccessSecret, {
      audience,
      issuer: env.appName,
    });

    if (!decoded || typeof decoded !== 'object' || decoded.typ !== ACCESS_TYP) {
      throw new ApiError(401, 'Invalid token', { code: 'UNAUTHORIZED' });
    }

    return decoded;
  } catch (e) {
    throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });
  }
}

export function generateRefreshToken() {
  return nanoid(64);
}

export function refreshExpiresAt() {
  const ms = env.refreshTokenTtlDays * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + ms);
}

