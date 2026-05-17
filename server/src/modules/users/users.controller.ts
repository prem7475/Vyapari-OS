import { Request, Response } from 'express';
import asyncHandler from '../../utils/async-handler.js';
import { getUserProfile, updateUserProfile } from './users.service.js';

export const getMeController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const user = await getUserProfile(userId);
  res.status(200).json({ data: user });
});

export const updateMeController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const payload = await updateUserProfile(userId, req.body);
  res.status(200).json({ data: payload });
});
