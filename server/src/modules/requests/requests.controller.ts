import { Request, Response } from 'express';
import { z } from 'zod';
import asyncHandler from '../../utils/async-handler.js';
import { createNewRequest, getRequestDetail, listRequests, updateRequest } from './requests.service.js';

const requestSchema = z.object({
  serviceId: z.string().cuid(),
  title: z.string().min(6),
  description: z.string().min(12),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
  estimatedCompletion: z.string().optional(),
});

const updateSchema = z.object({
  status: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  estimatedCompletion: z.string().optional(),
});

export const listRequestsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const queries = {
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 12,
  };
  const data = await listRequests(userId, queries);
  res.status(200).json({ data });
});

export const getRequestController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const detail = await getRequestDetail(userId, req.params.id);
  if (!detail) {
    return res.status(404).json({ message: 'Request not found' });
  }
  res.status(200).json({ data: detail });
});

export const createRequestController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const body = requestSchema.parse(req.body);
  const businessId = (req as any).user?.businessId;
  const payload = await createNewRequest(userId, businessId, {
    ...body,
    estimatedCompletion: body.estimatedCompletion ? new Date(body.estimatedCompletion) : undefined,
  });
  res.status(201).json({ data: payload });
});

export const updateRequestController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const body = updateSchema.parse(req.body);
  const updated = await updateRequest(userId, req.params.id, {
    status: body.status,
    progress: body.progress,
    estimatedCompletion: body.estimatedCompletion ? new Date(body.estimatedCompletion) : undefined,
  });
  res.status(200).json({ data: updated });
});
