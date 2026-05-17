import { Response, Request } from 'express';
import { signupSchema, loginSchema } from './auth.validation.js';
import { cookieOptions } from '../../config/env.js';
import { login, refreshSession, revokeSession, signup } from './auth.service.js';
import asyncHandler from '../../utils/async-handler.js';

export const signupController = asyncHandler(async (req: Request, res: Response) => {
  const input = signupSchema.parse(req.body);
  const payload = await signup(input);

  res.cookie('refreshToken', payload.refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ user: payload.user, accessToken: payload.accessToken });
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body);
  const payload = await login(input);

  res.cookie('refreshToken', payload.refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ user: payload.user, accessToken: payload.accessToken });
});

export const refreshController = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  const payload = await refreshSession(token);
  res.cookie('refreshToken', payload.refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken: payload.accessToken });
});

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (token) {
    await revokeSession(token);
  }

  res.clearCookie('refreshToken', { path: '/' });
  res.status(200).json({ message: 'Logged out successfully' });
});
