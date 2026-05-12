import { env } from '../../config/env.js';
import { verifyFirebaseIdToken } from '../../config/firebase.js';
import { userRepository } from '../../repositories/userRepository.js';
import { userSessionRepository } from '../../repositories/userSessionRepository.js';
import { ApiError } from '../../utils/apiError.js';
import { sha256Hex } from '../../utils/crypto.js';
import { generateRefreshToken, refreshExpiresAt, signAccessToken } from '../../services/tokenService.js';

function refreshHash(refreshToken) {
  return sha256Hex(`${refreshToken}.${env.refreshTokenPepper}`);
}

export const authService = {
  async loginWithFirebase({ idToken, userAgent, ip }) {
    const decoded = await verifyFirebaseIdToken(idToken);
    const phone = decoded.phone_number;
    if (!phone) {
      throw new ApiError(400, 'Firebase token missing phone number', { code: 'INVALID_ID_TOKEN' });
    }

    const user = await userRepository.upsertFromFirebase({
      phone,
      firebaseUid: decoded.uid,
      email: decoded.email ?? null,
    });

    if (user.deletedAt) throw new ApiError(403, 'Account disabled', { code: 'ACCOUNT_DISABLED' });
    if (user.status !== 'ACTIVE') throw new ApiError(403, 'Account blocked', { code: 'ACCOUNT_BLOCKED' });

    const accessToken = signAccessToken({ subject: user.id, role: user.role, audience: 'user' });

    const refreshToken = generateRefreshToken();
    const tokenHash = refreshHash(refreshToken);
    const expiresAt = refreshExpiresAt();

    await userSessionRepository.create({
      userId: user.id,
      tokenHash,
      userAgent,
      ip,
      expiresAt,
    });

    return {
      user: { id: user.id, phone: user.phone, email: user.email, name: user.name, role: user.role },
      tokens: { accessToken, refreshToken, expiresAt: expiresAt.toISOString() },
    };
  },

  async refresh({ refreshToken }) {
    const tokenHash = refreshHash(refreshToken);
    const session = await userSessionRepository.findByTokenHash(tokenHash);
    if (!session || session.revokedAt) throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });
    if (session.expiresAt.getTime() <= Date.now()) throw new ApiError(401, 'Session expired', { code: 'SESSION_EXPIRED' });

    const user = await userRepository.findById(session.userId);
    if (!user || user.deletedAt) throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });
    if (user.status !== 'ACTIVE') throw new ApiError(403, 'Account blocked', { code: 'ACCOUNT_BLOCKED' });

    const accessToken = signAccessToken({ subject: user.id, role: user.role, audience: 'user' });
    const nextRefresh = generateRefreshToken();
    const nextHash = refreshHash(nextRefresh);
    const nextExpiresAt = refreshExpiresAt();

    await userSessionRepository.rotate({ sessionId: session.id, newTokenHash: nextHash, newExpiresAt: nextExpiresAt });

    return {
      tokens: { accessToken, refreshToken: nextRefresh, expiresAt: nextExpiresAt.toISOString() },
    };
  },

  async logout({ refreshToken }) {
    const tokenHash = refreshHash(refreshToken);
    const session = await userSessionRepository.findByTokenHash(tokenHash);
    if (!session) return { revoked: false };
    if (session.revokedAt) return { revoked: false };
    await userSessionRepository.revokeById(session.id);
    return { revoked: true };
  },

  async me({ userId }) {
    const user = await userRepository.findById(userId);
    if (!user || user.deletedAt) throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });
    return { id: user.id, phone: user.phone, email: user.email, name: user.name, role: user.role };
  },
};

