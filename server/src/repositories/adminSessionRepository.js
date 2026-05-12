import { prisma } from '../prisma/client.js';

export const adminSessionRepository = {
  async create({ adminUserId, tokenHash, userAgent, ip, expiresAt }) {
    return prisma.adminSession.create({
      data: {
        adminUserId,
        tokenHash,
        userAgent: userAgent ?? null,
        ip: ip ?? null,
        expiresAt,
      },
    });
  },

  async findByTokenHash(tokenHash) {
    return prisma.adminSession.findUnique({ where: { tokenHash } });
  },

  async rotate({ sessionId, newTokenHash, newExpiresAt }) {
    return prisma.adminSession.update({
      where: { id: sessionId },
      data: {
        tokenHash: newTokenHash,
        expiresAt: newExpiresAt,
      },
    });
  },

  async revokeById(sessionId) {
    return prisma.adminSession.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });
  },
};

