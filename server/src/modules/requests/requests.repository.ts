import prisma from '../../config/db.js';

export function findRequestsByUser(userId: string, filters: { status?: string; search?: string; skip?: number; take?: number }) {
  const where: any = { userId };

  if (filters.status && filters.status !== 'ALL') {
    where.status = filters.status;
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return prisma.serviceRequest.findMany({
    where,
    include: {
      service: true,
      business: true,
      uploadedDocuments: true,
      payments: true,
      notifications: true,
    },
    orderBy: { submittedAt: 'desc' },
    skip: filters.skip,
    take: filters.take,
  });
}

export function findRequestById(requestId: string, userId: string) {
  return prisma.serviceRequest.findFirst({
    where: { id: requestId, userId },
    include: {
      service: true,
      business: true,
      uploadedDocuments: true,
      payments: true,
      notifications: true,
    },
  });
}

export function createRequest(data: {
  userId: string;
  businessId: string;
  serviceId: string;
  title: string;
  description: string;
  amount: string;
  estimatedCompletion?: Date;
}) {
  return prisma.serviceRequest.create({
    data: {
      userId: data.userId,
      businessId: data.businessId,
      serviceId: data.serviceId,
      title: data.title,
      description: data.description,
      amount: data.amount,
      estimatedCompletion: data.estimatedCompletion,
    },
  });
}

export function updateRequestStatus(requestId: string, userId: string, payload: { status: string; progress?: number; estimatedCompletion?: Date }) {
  return prisma.serviceRequest.updateMany({
    where: { id: requestId, userId },
    data: {
      status: payload.status,
      progress: payload.progress,
      estimatedCompletion: payload.estimatedCompletion,
    },
  });
}
