import bcrypt from 'bcryptjs';
import { env } from '../../config/env.js';
import { adminRepository } from '../../repositories/adminRepository.js';
import { adminSessionRepository } from '../../repositories/adminSessionRepository.js';
import { ApiError } from '../../utils/apiError.js';
import { sha256Hex } from '../../utils/crypto.js';
import { generateRefreshToken, refreshExpiresAt, signAccessToken } from '../../services/tokenService.js';

function refreshHash(refreshToken) {
  return sha256Hex(`${refreshToken}.${env.refreshTokenPepper}`);
}

export const adminAuthService = {
  async login({ email, password, userAgent, ip }) {
    const admin = await adminRepository.findByEmail(email);
    if (!admin || admin.deletedAt) throw new ApiError(401, 'Invalid credentials', { code: 'INVALID_CREDENTIALS' });
    if (admin.status !== 'ACTIVE') throw new ApiError(403, 'Admin disabled', { code: 'ADMIN_DISABLED' });

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) throw new ApiError(401, 'Invalid credentials', { code: 'INVALID_CREDENTIALS' });

    await adminRepository.updateLastLogin(admin.id);

    const accessToken = signAccessToken({ subject: admin.id, role: admin.role, audience: 'admin' });
    const refreshToken = generateRefreshToken();
    const tokenHash = refreshHash(refreshToken);
    const expiresAt = refreshExpiresAt();

    await adminSessionRepository.create({
      adminUserId: admin.id,
      tokenHash,
      userAgent,
      ip,
      expiresAt,
    });

    return {
      admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
      tokens: { accessToken, refreshToken, expiresAt: expiresAt.toISOString() },
    };
  },

  async refresh({ refreshToken }) {
    const tokenHash = refreshHash(refreshToken);
    const session = await adminSessionRepository.findByTokenHash(tokenHash);
    if (!session || session.revokedAt) throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });
    if (session.expiresAt.getTime() <= Date.now()) throw new ApiError(401, 'Session expired', { code: 'SESSION_EXPIRED' });

    const admin = await adminRepository.findById(session.adminUserId);
    if (!admin || admin.deletedAt) throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });
    if (admin.status !== 'ACTIVE') throw new ApiError(403, 'Admin disabled', { code: 'ADMIN_DISABLED' });

    const accessToken = signAccessToken({ subject: admin.id, role: admin.role, audience: 'admin' });
    const nextRefresh = generateRefreshToken();
    const nextHash = refreshHash(nextRefresh);
    const nextExpiresAt = refreshExpiresAt();

    await adminSessionRepository.rotate({ sessionId: session.id, newTokenHash: nextHash, newExpiresAt: nextExpiresAt });

    return {
      tokens: { accessToken, refreshToken: nextRefresh, expiresAt: nextExpiresAt.toISOString() },
    };
  },

  async logout({ refreshToken }) {
    const tokenHash = refreshHash(refreshToken);
    const session = await adminSessionRepository.findByTokenHash(tokenHash);
    if (!session) return { revoked: false };
    if (session.revokedAt) return { revoked: false };
    await adminSessionRepository.revokeById(session.id);
    return { revoked: true };
  },

  async me({ adminUserId }) {
    const admin = await adminRepository.findById(adminUserId);
    if (!admin || admin.deletedAt) throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });
    if (admin.status !== 'ACTIVE') throw new ApiError(403, 'Admin disabled', { code: 'ADMIN_DISABLED' });
    return { id: admin.id, email: admin.email, name: admin.name, role: admin.role };
  },
};

