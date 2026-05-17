import prisma from '../../config/db.js';

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { business: true },
  });
}

export async function updateUserProfile(userId: string, data: { name?: string; email?: string; phone?: string }) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
    include: { business: true },
  });
}
