import prisma from '../../config/db.js';
import type { User } from '@prisma/client';

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserByPhone(phone: string) {
  return prisma.user.findUnique({ where: { phone } });
}

export function createBusiness(data: { name: string; type: string; gstNumber?: string; panNumber?: string; address?: string; website?: string }) {
  return prisma.business.create({
    data: {
      name: data.name,
      type: data.type,
      gstNumber: data.gstNumber ?? '',
      panNumber: data.panNumber ?? '',
      address: data.address ?? '',
      website: data.website,
    },
  });
}

export function createUser(data: {
  email?: string | null;
  phone?: string | null;
  passwordHash: string;
  name?: string | null;
  businessId?: string | null;
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      phone: data.phone,
      passwordHash: data.passwordHash,
      name: data.name,
      businessId: data.businessId,
    },
  });
}

export function createRefreshToken(userId: string, tokenHash: string, expiresAt: Date) {
  return prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });
}

export function findActiveRefreshTokens(userId: string) {
  return prisma.refreshToken.findMany({
    where: {
      userId,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
  });
}

export function revokeRefreshTokenById(id: string) {
  return prisma.refreshToken.update({
    where: { id },
    data: { revokedAt: new Date() },
  });
}

export function revokeUserRefreshTokens(userId: string) {
  return prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
