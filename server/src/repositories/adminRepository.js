import { prisma } from '../prisma/client.js';

export const adminRepository = {
  async findByEmail(email) {
    return prisma.adminUser.findFirst({ where: { email, deletedAt: null } });
  },

  async findById(id) {
    return prisma.adminUser.findFirst({ where: { id, deletedAt: null } });
  },

  async updateLastLogin(id) {
    return prisma.adminUser.update({ where: { id }, data: { lastLoginAt: new Date() } });
  },

  async create({ email, passwordHash, name, role }) {
    return prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        name,
        role,
      },
    });
  },
};

