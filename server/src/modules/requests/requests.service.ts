import { RequestStatus } from '@prisma/client';
import { createRequest, findRequestById, findRequestsByUser, updateRequestStatus } from './requests.repository.js';

const statusSteps = [
  { status: RequestStatus.SUBMITTED, title: 'Application submitted', note: 'The request has been recorded and is pending review.' },
  { status: RequestStatus.UNDER_REVIEW, title: 'Under review', note: 'Our operations team is validating the submission.' },
  { status: RequestStatus.DOCUMENTS_PENDING, title: 'Documents pending', note: 'Please upload or verify outstanding paperwork.' },
  { status: RequestStatus.PROCESSING, title: 'Processing', note: 'The request is in active workflow with regulators.' },
  { status: RequestStatus.APPROVED, title: 'Approved', note: 'The submission has been approved for the next stage.' },
  { status: RequestStatus.COMPLETED, title: 'Completed', note: 'Work has finished and final delivery is ready.' },
  { status: RequestStatus.REJECTED, title: 'Rejected', note: 'The request was rejected pending resolution of issues.' },
];

function buildTimeline(current: RequestStatus, submittedAt: Date, updatedAt: Date) {
  return statusSteps
    .slice(0, statusSteps.findIndex((item) => item.status === current) + 1)
    .map((step, index) => ({
      id: `${step.status}-${index}`,
      title: step.title,
      date: index === 0 ? submittedAt.toISOString().slice(0, 10) : updatedAt.toISOString().slice(0, 10),
      status: step.status,
      note: step.note,
    }));
}

export async function listRequests(userId: string, params: { status?: string; search?: string; page?: number; limit?: number }) {
  const skip = ((params.page ?? 1) - 1) * (params.limit ?? 12);
  const requests = await findRequestsByUser(userId, {
    status: params.status,
    search: params.search,
    skip,
    take: params.limit ?? 12,
  });

  return requests.map((request) => ({
    ...request,
    progress: request.progress,
    amount: request.amount.toString(),
  }));
}

export async function getRequestDetail(userId: string, requestId: string) {
  const request = await findRequestById(requestId, userId);
  if (!request) return null;

  return {
    ...request,
    amount: request.amount.toString(),
    timeline: buildTimeline(request.status, request.submittedAt, request.updatedAt),
    adminNotes: request.notifications.map((notification) => notification.message),
  };
}

export async function createNewRequest(userId: string, businessId: string, input: { serviceId: string; title: string; description: string; amount: string; estimatedCompletion?: Date }) {
  const request = await createRequest({
    userId,
    businessId,
    serviceId: input.serviceId,
    title: input.title,
    description: input.description,
    amount: input.amount,
    estimatedCompletion: input.estimatedCompletion,
  });

  return { ...request, amount: request.amount.toString() };
}

export async function updateRequest(userId: string, requestId: string, input: { status?: string; progress?: number; estimatedCompletion?: Date }) {
  await updateRequestStatus(requestId, userId, input);
  return getRequestDetail(userId, requestId);
}
