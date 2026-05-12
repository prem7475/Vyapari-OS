import { prisma } from '../prisma/client.js';

export const userSessionRepository = {
  async create({ userId, tokenHash, userAgent, ip, expiresAt }) {
    return prisma.userSession.create({
      data: {
        userId,
        tokenHash,
        userAgent: userAgent ?? null,
        ip: ip ?? null,
        expiresAt,
      },
    });
  },

  async findByTokenHash(tokenHash) {
    return prisma.userSession.findUnique({ where: { tokenHash } });
  },

  async rotate({ sessionId, newTokenHash, newExpiresAt }) {
    return prisma.userSession.update({
      where: { id: sessionId },
      data: {
        tokenHash: newTokenHash,
        expiresAt: newExpiresAt,
      },
    });
  },

  async revokeById(sessionId) {
    return prisma.userSession.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });
  },
};

