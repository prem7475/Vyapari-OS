import { prisma } from '../prisma/client.js';

export const userRepository = {
  async findById(id) {
    return prisma.user.findFirst({ where: { id, deletedAt: null } });
  },

  async upsertFromFirebase({ phone, firebaseUid, email }) {
    const now = new Date();
    return prisma.user.upsert({
      where: { phone },
      update: {
        firebaseUid: firebaseUid ?? undefined,
        email: email ?? undefined,
        lastLoginAt: now,
      },
      create: {
        phone,
        firebaseUid: firebaseUid ?? null,
        email: email ?? null,
        lastLoginAt: now,
      },
    });
  },
};

